import { Pool } from 'pg'

// Database connection pool
let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }
  return pool
}

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const pool = getPool()
  const start = Date.now()
  
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// User-related database functions
export const db = {
  // Create a new user
  async createUser(userData: {
    email: string
    phone: string
    fullName: string
    userType: 'worker' | 'employer'
    passwordHash?: string
  }) {
    const { email, phone, fullName, userType, passwordHash } = userData
    const result = await query(
      `INSERT INTO users (email, phone, full_name, user_type, password_hash) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [email, phone, fullName, userType, passwordHash]
    )
    return result.rows[0]
  },

  // Get user by email
  async getUserByEmail(email: string) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    )
    return result.rows[0]
  },

  // Get user by phone number
  async getUserByPhone(phone: string) {
    const result = await query(
      'SELECT * FROM users WHERE phone = $1 AND is_active = true',
      [phone]
    )
    return result.rows[0]
  },

  // Get user by ID
  async getUserById(id: string) {
    const result = await query(
      'SELECT * FROM users WHERE id = $1 AND is_active = true',
      [id]
    )
    return result.rows[0]
  },

  // Create worker profile
  async createWorkerProfile(profileData: {
    userId: string
    jobCategory: string
    jobTitle: string
    customJobTitle?: string
    jobProfile?: string
    yearsExperience: number
    city: string
    country: string
    expectedSalary: number
    visaStatus: string
    languagesSpoken: string[]
    aboutMe?: string
    profilePictureUrl?: string
  }) {
    const {
      userId, jobCategory, jobTitle, customJobTitle, jobProfile,
      yearsExperience, city, country, expectedSalary, visaStatus,
      languagesSpoken, aboutMe, profilePictureUrl
    } = profileData

    const result = await query(
      `INSERT INTO worker_profiles 
       (user_id, job_category, job_title, custom_job_title, job_profile, 
        years_experience, city, country, expected_salary, visa_status, 
        languages_spoken, about_me, profile_picture_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [userId, jobCategory, jobTitle, customJobTitle, jobProfile,
       yearsExperience, city, country, expectedSalary, visaStatus,
       languagesSpoken, aboutMe, profilePictureUrl]
    )
    return result.rows[0]
  },

  // Get worker profile by user ID
  async getWorkerProfileByUserId(userId: string) {
    const result = await query(
      `SELECT wp.*, u.email, u.phone, u.full_name 
       FROM worker_profiles wp 
       JOIN users u ON wp.user_id = u.id 
       WHERE wp.user_id = $1`,
      [userId]
    )
    return result.rows[0]
  },

  // Get all worker profiles (active users only)
  async getAllWorkerProfiles() {
    const result = await query(
      `SELECT wp.*, u.email, u.phone, u.full_name, u.is_active
       FROM worker_profiles wp
       JOIN users u ON wp.user_id = u.id
       WHERE u.is_active = true
       ORDER BY wp.created_at DESC`
    )
    return result.rows
  },

  // Get ALL worker profiles including inactive users (for diagnostics)
  async getAllWorkerProfilesIncludingInactive() {
    const result = await query(
      `SELECT wp.*, u.email, u.phone, u.full_name, u.is_active
       FROM worker_profiles wp
       LEFT JOIN users u ON wp.user_id = u.id
       ORDER BY wp.created_at DESC`
    )
    return result.rows
  },

  // Update worker profile
  async updateWorkerProfile(userId: string, updates: any) {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')
    
    const values = [userId, ...Object.values(updates)]
    
    const result = await query(
      `UPDATE worker_profiles 
       SET ${setClause}, updated_at = NOW() 
       WHERE user_id = $1 
       RETURNING *`,
      values
    )
    return result.rows[0]
  },

  // Create employer profile
  async createEmployerProfile(profileData: {
    userId: string
    companyName: string
    industry?: string
    companySize?: string
    contactPerson?: string
    companyDescription?: string
  }) {
    const { userId, companyName, industry, companySize, contactPerson, companyDescription } = profileData
    
    const result = await query(
      `INSERT INTO employer_profiles 
       (user_id, company_name, industry, company_size, contact_person, company_description) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, companyName, industry, companySize, contactPerson, companyDescription]
    )
    return result.rows[0]
  },

  // Create session
  async createSession(userId: string, sessionToken: string, expiresAt: Date) {
    const result = await query(
      'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3) RETURNING *',
      [userId, sessionToken, expiresAt]
    )
    return result.rows[0]
  },

  // Get session
  async getSession(sessionToken: string) {
    const result = await query(
      `SELECT s.*, u.* FROM user_sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.session_token = $1 AND s.expires_at > NOW()`,
      [sessionToken]
    )
    return result.rows[0]
  },

  // Delete session
  async deleteSession(sessionToken: string) {
    await query('DELETE FROM user_sessions WHERE session_token = $1', [sessionToken])
  },

  // Update user password
  async updateUserPassword(userId: string, hashedPassword: string) {
    const result = await query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [hashedPassword, userId]
    )
    return result.rows[0]
  }
}

export default db
