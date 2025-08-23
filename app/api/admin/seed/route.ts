import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Simple admin authentication
function isAdmin(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token')
  return adminToken === 'admin-secret-token'
}

// Generate comprehensive sample profiles for the database (80 categories x cities)
function generateSampleProfiles() {
  // Complete list of 80+ job categories from the browse page
  const sampleJobs = [
    // Domestic & Personal Care Workers
    'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
    'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',

    // Construction & Infrastructure
    'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
    'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
    'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',

    // Automotive & Technical
    'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
    'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',

    // Manufacturing & Industrial
    'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
    'Production Supervisor', 'Fabricator', 'Loader/Unloader',

    // Transport & Logistics
    'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
    'Dispatch Coordinator', 'Heavy Vehicle Driver',

    // Cleaning & Sanitation
    'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner',

    // Hospitality & Food
    'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista', 'Food Delivery Rider',

    // Security & Safety
    'Security Guard', 'Watchman', 'Lifeguard',

    // General Services
    'Maintenance Helper', 'General Helper', 'Tailor', 'Ironing Staff', 'Textile Factory Worker',

    // Agriculture & Livestock
    'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',

    // Other Services
    'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
  ]
  
  const sampleCities = [
    // UAE
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain',
    // Saudi Arabia
    'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Tabuk', 'Abha',
    // Qatar
    'Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal', 'Al Daayen',
    // Kuwait
    'Kuwait City', 'Hawalli', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mubarak Al-Kabeer',
    // Oman
    'Muscat', 'Salalah', 'Nizwa', 'Sur', 'Sohar', 'Rustaq', 'Barka', 'Ibri',
    // Bahrain
    'Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'
  ]
  
  const firstNames = [
    'Ahmed', 'Mohammed', 'Ali', 'Omar', 'Hassan', 'Khalid', 'Abdullah', 'Ibrahim',
    'Priya', 'Ravi', 'Anjali', 'Suresh', 'Deepak', 'Kavya', 'Rajesh', 'Sunita',
    'Maria', 'Anna', 'Elena', 'Rosa', 'Carmen', 'Sofia', 'Isabella', 'Lucia',
    'James', 'John', 'Michael', 'David', 'Robert', 'William', 'Richard', 'Joseph'
  ]
  
  const lastNames = [
    'Ahmed', 'Hassan', 'Ali', 'Khan', 'Kumar', 'Sharma', 'Patel', 'Singh',
    'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez', 'Wilson', 'Johnson',
    'Smith', 'Brown', 'Davis', 'Miller', 'Jones', 'Williams', 'Taylor'
  ]

  const countries = ['UAE', 'Qatar', 'Kuwait', 'Saudi Arabia', 'Oman', 'Bahrain']
  const visaStatuses = ['Work Visa', 'Residence Visa', 'Visit Visa']
  const languages = [
    ['English', 'Arabic'], ['English', 'Hindi'], ['English', 'Urdu'], 
    ['Arabic', 'French'], ['English', 'Spanish'], ['English', 'Filipino'],
    ['English', 'Hindi', 'Arabic'], ['English', 'Bengali'], ['English', 'Tamil'],
    ['Arabic', 'English', 'French']
  ]

  // Helper function to get job category
  const getJobCategory = (jobTitle: string): string => {
    const categoryMap: Record<string, string> = {
      'Cook': 'Hospitality & Food',
      'Waiter/Waitress': 'Hospitality & Food',
      'Housemaid': 'Domestic & Personal Care Workers',
      'Cleaner': 'Domestic & Personal Care Workers',
      'Housekeeper (Residential)': 'Domestic & Personal Care Workers',
      'Nanny (Childcare Worker)': 'Domestic & Personal Care Workers',
      'Driver': 'Transport & Logistics',
      'Delivery Driver': 'Transport & Logistics',
      'Logistics Assistant': 'Transport & Logistics',
      'Electrician': 'Construction & Infrastructure',
      'Construction Laborer': 'Construction & Infrastructure',
      'Plumber': 'Construction & Infrastructure',
      'Painter': 'Construction & Infrastructure',
      'Carpenter': 'Construction & Infrastructure',
      'Welder': 'Construction & Infrastructure',
      'Mason (Bricklayer)': 'Construction & Infrastructure',
      'HVAC Technician': 'Construction & Infrastructure',
      'Security Guard': 'Security & Safety',
      'Gardener (Landscaper)': 'Agriculture & Landscaping',
      'Mechanic': 'Automotive & Technical',
      'Factory Worker': 'Manufacturing & Industrial',
      'Warehouse Worker': 'Manufacturing & Industrial',
      'Maintenance Worker': 'General Services'
    }
    return categoryMap[jobTitle] || 'Other'
  }

  // Predefined profile picture URLs
  const profilePictures = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face'
  ]

  // Generate profiles: 2-3 profiles per job category distributed across cities
  const profiles = []

  sampleJobs.forEach((jobTitle, jobIndex) => {
    // Create 2-3 profiles per job category
    const profilesPerJob = Math.floor(Math.random() * 2) + 2 // 2-3 profiles

    for (let i = 0; i < profilesPerJob; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      // Distribute across different cities
      const cityIndex = (jobIndex * profilesPerJob + i) % sampleCities.length
      const city = sampleCities[cityIndex]

      // Assign country based on city
      let country = 'UAE'
      if (['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Tabuk', 'Abha'].includes(city)) {
        country = 'Saudi Arabia'
      } else if (['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal', 'Al Daayen'].includes(city)) {
        country = 'Qatar'
      } else if (['Kuwait City', 'Hawalli', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mubarak Al-Kabeer'].includes(city)) {
        country = 'Kuwait'
      } else if (['Muscat', 'Salalah', 'Nizwa', 'Sur', 'Sohar', 'Rustaq', 'Barka', 'Ibri'].includes(city)) {
        country = 'Oman'
      } else if (['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'].includes(city)) {
        country = 'Bahrain'
      }

      const experience = Math.floor(Math.random() * 15) + 1
      const salary = Math.floor(Math.random() * 4000) + 1500

      // Create unique email and phone for each profile
      const profileIndex = profiles.length

      profiles.push({
        fullName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${profileIndex}.sample@gogethires.com`,
        phone: `+971${Math.floor(Math.random() * 90000000) + 10000000}`,
        jobCategory: getJobCategory(jobTitle),
        jobTitle,
        customJobTitle: undefined,
        jobProfile: `Experienced ${jobTitle.toLowerCase()} with ${experience} years of professional experience in the Gulf region.`,
        yearsExperience: experience,
        city,
        country,
        expectedSalary: salary,
        visaStatus: visaStatuses[Math.floor(Math.random() * visaStatuses.length)],
        languagesSpoken: languages[Math.floor(Math.random() * languages.length)],
        aboutMe: `Professional ${jobTitle.toLowerCase()} with ${experience} years of experience. Dedicated, reliable, and hardworking individual seeking new opportunities in ${city}.`,
        profilePictureUrl: profilePictures[profileIndex % profilePictures.length]
      })
    }
  })

  console.log(`📊 Generated ${profiles.length} profiles across ${sampleJobs.length} job categories and ${sampleCities.length} cities`)
  return profiles
}

// POST - Seed database with sample data
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    console.log('🌱 Starting comprehensive database seeding with 80+ job categories across all Gulf cities...')

    const sampleProfiles = generateSampleProfiles()
    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (const profileData of sampleProfiles) {
      try {
        // Create user first
        const userData = {
          email: profileData.email,
          phone: profileData.phone,
          fullName: profileData.fullName,
          userType: 'worker' as const
        }

        // Check if user already exists
        let user = await db.getUserByEmail(userData.email)
        
        if (!user) {
          user = await db.createUser(userData)
          console.log(`✅ Created user: ${user.full_name}`)
        } else {
          console.log(`👤 User already exists: ${user.full_name}`)
          continue // Skip if user already exists
        }

        // Create worker profile
        const workerProfileData = {
          userId: user.id,
          jobCategory: profileData.jobCategory,
          jobTitle: profileData.jobTitle,
          customJobTitle: profileData.customJobTitle,
          jobProfile: profileData.jobProfile,
          yearsExperience: profileData.yearsExperience,
          city: profileData.city,
          country: profileData.country,
          expectedSalary: profileData.expectedSalary,
          visaStatus: profileData.visaStatus,
          languagesSpoken: profileData.languagesSpoken,
          aboutMe: profileData.aboutMe,
          profilePictureUrl: profileData.profilePictureUrl
        }

        await db.createWorkerProfile(workerProfileData)
        console.log(`✅ Created worker profile for: ${user.full_name}`)
        
        results.successful++

      } catch (error) {
        console.error(`❌ Failed to create profile for ${profileData.fullName}:`, error)
        results.failed++
        results.errors.push(`${profileData.fullName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    console.log(`🎉 Database seeding completed: ${results.successful} successful, ${results.failed} failed`)

    return NextResponse.json({
      success: true,
      message: `Database seeded successfully with ${results.successful} comprehensive sample profiles across 80+ job categories`,
      results,
      details: {
        totalProfiles: results.successful,
        jobCategories: 80,
        cities: 40,
        coverage: 'All Gulf countries with 2-3 profiles per job category'
      }
    })

  } catch (error) {
    console.error('Database seeding error:', error)
    return NextResponse.json(
      { error: 'Internal server error during seeding' },
      { status: 500 }
    )
  }
}

// GET - Check seeding status
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Get all profiles to check seeding status
    const profiles = await db.getAllWorkerProfiles()
    const sampleProfiles = profiles.filter(p => p.email && p.email.includes('.sample@gogethires.com'))
    
    return NextResponse.json({
      success: true,
      totalProfiles: profiles.length,
      sampleProfiles: sampleProfiles.length,
      realProfiles: profiles.length - sampleProfiles.length,
      needsSeeding: sampleProfiles.length < 160, // Expecting 160+ comprehensive profiles
      expectedProfiles: '160-240 profiles (2-3 per job category)',
      coverage: {
        jobCategories: 80,
        cities: 40,
        countries: 6
      }
    })

  } catch (error) {
    console.error('Check seeding status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
