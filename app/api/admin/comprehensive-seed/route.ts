import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Comprehensive sample data generator for all cities and job categories
const generateComprehensiveSampleData = () => {
  const jobCategories = {
    'Domestic & Personal Care Workers': [
      'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
      'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid'
    ],
    'Construction & Infrastructure': [
      'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
      'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
      'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker'
    ],
    'Mechanical & Technical': [
      'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
      'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator'
    ],
    'Manufacturing & Factory': [
      'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
      'Production Supervisor', 'Fabricator', 'Loader/Unloader'
    ],
    'Transport & Logistics': [
      'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
      'Dispatch Coordinator', 'Heavy Vehicle Driver'
    ],
    'Cleaning & Maintenance': [
      'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner'
    ],
    'Hospitality & Food': [
      'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista', 'Food Delivery Rider'
    ],
    'Security & General Services': [
      'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper'
    ],
    'Garments & Tailoring': [
      'Tailor', 'Ironing Staff', 'Textile Factory Worker'
    ],
    'Agriculture & Farming': [
      'Farm Worker', 'Livestock Handler', 'Greenhouse Worker'
    ],
    'Other Common Jobs': [
      'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
    ]
  }

  const citiesByCountry = {
    'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'],
    'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif'],
    'Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi'],
    'Kuwait': ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya'],
    'Bahrain': ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
  }

  const firstNames = [
    // Arabic names
    'Ahmed', 'Mohammed', 'Ali', 'Omar', 'Hassan', 'Khalid', 'Abdullah', 'Ibrahim', 'Mustafa', 'Youssef',
    'Fatima', 'Aisha', 'Khadija', 'Zainab', 'Mariam', 'Layla', 'Nour', 'Sara', 'Amina', 'Yasmin',
    // Indian names
    'Ravi', 'Suresh', 'Deepak', 'Rajesh', 'Amit', 'Vikash', 'Pradeep', 'Santosh', 'Ramesh', 'Anil',
    'Priya', 'Anjali', 'Kavya', 'Sunita', 'Rekha', 'Geeta', 'Meera', 'Radha', 'Sita', 'Lata',
    // Filipino names
    'Jose', 'Juan', 'Maria', 'Anna', 'Rosa', 'Carmen', 'Luis', 'Pedro', 'Miguel', 'Carlos',
    'Elena', 'Sofia', 'Isabella', 'Lucia', 'Teresa', 'Gloria', 'Patricia', 'Ana', 'Grace', 'Liza',
    // Pakistani names
    'Asif', 'Tariq', 'Shahid', 'Imran', 'Salman', 'Wasim', 'Nadeem', 'Rashid', 'Naveed', 'Zahid',
    'Ayesha', 'Rubina', 'Shaista', 'Nasreen', 'Farzana', 'Shabana', 'Samina', 'Farah', 'Saima', 'Nadia',
    // Bengali names
    'Rahim', 'Karim', 'Matin', 'Rony', 'Habib', 'Nasir', 'Shakil', 'Masud', 'Ripon', 'Jewel',
    'Rashida', 'Salma', 'Rehana', 'Nasreen', 'Shapla', 'Ruma', 'Shireen', 'Roksana', 'Lovely', 'Beauty',
    // Western names
    'James', 'John', 'Michael', 'David', 'Robert', 'William', 'Richard', 'Joseph', 'Thomas', 'Paul',
    'Sarah', 'Emma', 'Lisa', 'Jennifer', 'Nicole', 'Amanda', 'Michelle', 'Rebecca', 'Laura', 'Jessica'
  ]

  const lastNames = [
    // Arabic surnames
    'Ahmed', 'Hassan', 'Ali', 'Khan', 'Al-Rashid', 'Al-Mahmoud', 'Al-Ahmad', 'Al-Hassan', 'Al-Ali', 'Al-Omar',
    // Indian surnames
    'Kumar', 'Sharma', 'Patel', 'Singh', 'Gupta', 'Jain', 'Agarwal', 'Verma', 'Yadav', 'Mishra',
    // Filipino surnames
    'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez', 'Reyes', 'Cruz', 'Santos', 'Ramos', 'Mendoza',
    // Pakistani surnames
    'Sheikh', 'Malik', 'Butt', 'Chaudhry', 'Awan', 'Rajput', 'Siddiqui', 'Qureshi', 'Shah', 'Hussain',
    // Bengali surnames
    'Rahman', 'Islam', 'Hasan', 'Uddin', 'Alam', 'Miah', 'Chowdhury', 'Begum', 'Khatun', 'Bibi',
    // Western surnames
    'Wilson', 'Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Jones', 'Williams', 'Taylor', 'Anderson'
  ]

  const languages = [
    ['English', 'Arabic'], ['English', 'Hindi'], ['English', 'Urdu'], ['English', 'Bengali'],
    ['English', 'Tamil'], ['English', 'Malayalam'], ['English', 'Telugu'], ['English', 'Punjabi'],
    ['English', 'Filipino'], ['English', 'Spanish'], ['Arabic', 'French'], ['English', 'Nepali'],
    ['English', 'Sinhalese'], ['English', 'Thai'], ['English', 'Indonesian'], ['Arabic', 'English', 'Hindi'],
    ['English', 'Hindi', 'Arabic'], ['English', 'Bengali', 'Arabic'], ['English', 'Tamil', 'Arabic'],
    ['English', 'Filipino', 'Arabic'], ['English', 'Urdu', 'Arabic'], ['Arabic', 'French', 'English']
  ]

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
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1611695434369-a8f5d76cda08?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop&crop=face'
  ]

  const visaStatuses = ['Work Visa', 'Visit Visa', 'Freelance Visa']
  
  // Generate comprehensive sample data
  const profiles = []
  let profileId = 1

  // Get all cities from all countries
  const allCities = Object.entries(citiesByCountry)
  
  // Get all job titles from all categories
  const allJobTitles = Object.values(jobCategories).flat()

  // Create 2-3 profiles for each job title in major cities
  allJobTitles.forEach((jobTitle, jobIndex) => {
    const jobCategory = Object.keys(jobCategories).find(cat => 
      jobCategories[cat].includes(jobTitle)
    ) || 'Other'

    // Create 2-3 profiles per job title
    for (let i = 0; i < 3; i++) {
      // Rotate through countries and cities
      const countryIndex = (jobIndex + i) % allCities.length
      const [country, cities] = allCities[countryIndex]
      const city = cities[(jobIndex + i) % cities.length]

      const firstName = firstNames[(profileId + i) % firstNames.length]
      const lastName = lastNames[(profileId + i) % lastNames.length]
      const experience = Math.floor(Math.random() * 12) + 1
      const baseSalary = {
        'UAE': 2500, 'Qatar': 2800, 'Saudi Arabia': 2200, 
        'Kuwait': 2400, 'Oman': 2000, 'Bahrain': 2300
      }[country] || 2500
      const salary = baseSalary + Math.floor(Math.random() * 2000)

      // Generate unique email
      const emailPrefix = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${profileId}`
      const emailDomain = '@sample.gogethires.com'

      profiles.push({
        // User data
        email: emailPrefix + emailDomain,
        phone: `+${{'UAE': '971', 'Qatar': '974', 'Saudi Arabia': '966', 'Kuwait': '965', 'Oman': '968', 'Bahrain': '973'}[country]}${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
        fullName: `${firstName} ${lastName}`,
        userType: 'worker',
        
        // Worker profile data
        jobCategory,
        jobTitle,
        customJobTitle: undefined,
        jobProfile: `Experienced ${jobTitle.toLowerCase()} with ${experience} years of professional experience in ${country}.`,
        yearsExperience: experience,
        city,
        country,
        expectedSalary: salary,
        visaStatus: visaStatuses[Math.floor(Math.random() * visaStatuses.length)],
        languagesSpoken: languages[Math.floor(Math.random() * languages.length)],
        aboutMe: `Professional ${jobTitle.toLowerCase()} with ${experience} years of experience in the Gulf region. Dedicated, reliable, and hardworking individual seeking new opportunities in ${city}. Fluent in multiple languages and committed to providing excellent service.`,
        profilePictureUrl: profilePictures[profileId % profilePictures.length]
      })

      profileId++
    }
  })

  console.log(`📊 Generated ${profiles.length} comprehensive sample profiles`)
  return profiles
}

// POST - Create comprehensive sample data
export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken !== 'admin-secret-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🌱 Starting comprehensive database seeding...')

    // Generate comprehensive sample data
    const profiles = generateComprehensiveSampleData()
    
    let successful = 0
    let failed = 0
    const errors = []

    console.log(`📝 Processing ${profiles.length} sample profiles...`)

    // Process profiles in batches to avoid overwhelming the database
    const batchSize = 10
    for (let i = 0; i < profiles.length; i += batchSize) {
      const batch = profiles.slice(i, i + batchSize)
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(profiles.length / batchSize)} (${batch.length} profiles)`)

      for (const profile of batch) {
        try {
          // Check if user already exists
          const existingUser = await db.getUserByEmail(profile.email)
          let userId

          if (existingUser) {
            userId = existingUser.id
            console.log(`👤 User already exists: ${profile.fullName}`)
          } else {
            // Create user
            const user = await db.createUser({
              email: profile.email,
              phone: profile.phone,
              fullName: profile.fullName,
              userType: profile.userType
            })
            userId = user.id
            console.log(`✅ Created user: ${profile.fullName}`)
          }

          // Check if worker profile already exists
          const existingProfile = await db.getWorkerProfileByUserId(userId)
          if (!existingProfile) {
            // Create worker profile
            await db.createWorkerProfile({
              userId,
              jobCategory: profile.jobCategory,
              jobTitle: profile.jobTitle,
              customJobTitle: profile.customJobTitle,
              jobProfile: profile.jobProfile,
              yearsExperience: profile.yearsExperience,
              city: profile.city,
              country: profile.country,
              expectedSalary: profile.expectedSalary,
              visaStatus: profile.visaStatus,
              languagesSpoken: profile.languagesSpoken,
              aboutMe: profile.aboutMe,
              profilePictureUrl: profile.profilePictureUrl
            })
            console.log(`✅ Created worker profile: ${profile.fullName} (${profile.jobTitle}, ${profile.city})`)
          } else {
            console.log(`⚠️ Worker profile already exists: ${profile.fullName}`)
          }

          successful++
        } catch (error) {
          console.error(`❌ Failed to create profile for ${profile.fullName}:`, error)
          errors.push(`${profile.fullName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
          failed++
        }
      }

      // Small delay between batches to be gentle on the database
      if (i + batchSize < profiles.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    console.log(`🎉 Comprehensive seeding completed: ${successful} successful, ${failed} failed`)

    return NextResponse.json({
      success: true,
      message: `Comprehensive database seeded successfully`,
      results: {
        totalGenerated: profiles.length,
        successful,
        failed,
        errors: errors.slice(0, 10) // Return only first 10 errors
      }
    })

  } catch (error) {
    console.error('Comprehensive seeding failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET - Check comprehensive seeding status
export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken !== 'admin-secret-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current database stats
    const allProfiles = await db.getAllWorkerProfiles()
    const sampleProfiles = allProfiles.filter(p => p.email && p.email.includes('@sample.gogethires.com'))
    const realProfiles = allProfiles.filter(p => p.email && !p.email.includes('@sample.gogethires.com'))

    // Get unique job categories and cities in database
    const uniqueJobTitles = Array.from(new Set(allProfiles.map(p => p.job_title))).length
    const uniqueCities = Array.from(new Set(allProfiles.map(p => p.city))).length
    const uniqueCountries = Array.from(new Set(allProfiles.map(p => p.country))).length

    const expectedProfiles = 240 // Approximately 80 job titles × 3 profiles each

    return NextResponse.json({
      success: true,
      totalProfiles: allProfiles.length,
      sampleProfiles: sampleProfiles.length,
      realProfiles: realProfiles.length,
      needsSeeding: sampleProfiles.length < 200, // Need at least 200 comprehensive samples
      expectedProfiles,
      coverage: {
        jobCategories: uniqueJobTitles,
        cities: uniqueCities,
        countries: uniqueCountries
      }
    })

  } catch (error) {
    console.error('Failed to check seeding status:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
