'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  CheckBadgeIcon,
  EyeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City, Country } from '../../../types'
import { generateDummyWorkers, getCurrencyDisplayForCity, GULF_REGIONS } from '../../../utils/dummyData'

// Helper function to get country for city
function getCountryForCity(city: City): Country {
  for (const [country, data] of Object.entries(GULF_REGIONS)) {
    if (data.cities.includes(city)) {
      return country as Country
    }
  }
  return 'UAE' // fallback
}
import { generateCityJobFAQs } from '../../../utils/faqData'

// Ultra-fast worker generation for specific city and job category
const generateCategoryWorkers = (city: string, jobTitle: JobTitle): Worker[] => {
  const workers: Worker[] = []
  const categoryJobs = getJobsInSameCategory(jobTitle)

  // Expanded name pool for better variety
  const quickNames = [
    'Ahmed Hassan', 'Mohammed Ali', 'Omar Al-Rashid', 'Hassan Abdullah', 'Fatima Al-Zahra',
    'Aisha Abdullah', 'Zainab Hassan', 'Priya Sharma', 'Sunita Devi', 'Rajesh Kumar',
    'Maria Santos', 'Jose Reyes', 'Grace Wanjiku', 'Samuel Mwangi', 'David Kimani',
    'Anita Singh', 'Carlos Santos', 'Anna Dela Cruz', 'Michael Otieno', 'Sarah Wanjiru',
    'Tariq Al-Mahmoud', 'Geeta Sharma', 'Roberto Silva', 'Joyce Wangari', 'Khalid Al-Otaibi'
  ]

  const quickPictures = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  ]

  let workerCount = 0

  // Ensure the searched job gets priority and more workers
  const prioritizedJobs = [jobTitle, ...categoryJobs.filter(job => job !== jobTitle)]

  prioritizedJobs.forEach((categoryJob, jobIndex) => {
    // Give the searched job more workers (6-8), others get fewer (3-4)
    const isSearchedJob = categoryJob === jobTitle
    const workersPerJob = isSearchedJob ? Math.min(8, Math.max(6, 25 - workerCount)) : Math.min(4, Math.max(2, 35 - workerCount))

    for (let i = 0; i < workersPerJob && workerCount < 35; i++) {
      const nameIndex = (jobIndex * 10 + i) % quickNames.length
      const pictureIndex = (jobIndex * 5 + i) % quickPictures.length

      // Job-specific salary ranges
      const getSalaryRange = (job: JobTitle) => {
        if (job.includes('Supervisor') || job.includes('Manager')) return { min: 3500, max: 6000 }
        if (job.includes('Technician') || job.includes('Mechanic')) return { min: 2800, max: 5000 }
        if (job.includes('Driver') || job.includes('Operator')) return { min: 2200, max: 4000 }
        if (job.includes('Cook') || job.includes('Chef')) return { min: 2000, max: 4000 }
        if (job.includes('Cleaner') || job.includes('Helper')) return { min: 1500, max: 2800 }
        return { min: 1800, max: 3500 } // Default range
      }

      const salaryRange = getSalaryRange(categoryJob)
      const salary = Math.floor(Math.random() * (salaryRange.max - salaryRange.min)) + salaryRange.min

      workers.push({
        id: `fast_${workerCount + 1}`,
        fullName: quickNames[nameIndex],
        profilePicture: quickPictures[pictureIndex],
        jobTitle: categoryJob,
        yearsExperience: Math.floor(Math.random() * 8) + 1,
        city: city as City,
        country: getCountryForCity(city as City) as Country,
        languagesSpoken: ['English', 'Arabic'],
        expectedSalary: salary,
        visaStatus: Math.random() > 0.3 ? 'Work Visa' : 'Visit Visa',
        availability: true,
        aboutMe: `Experienced ${categoryJob.toLowerCase()} with excellent skills and reliability.`,
        phoneNumber: `+971${50000000 + workerCount}`,
        email: `${quickNames[nameIndex].toLowerCase().replace(' ', '.')}@email.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      workerCount++
    }
  })

  return workers
}

// Super-fast worker loading for specific city and job category
const loadWorkersForCityJob = (city: string, jobTitle: JobTitle): Worker[] => {
  try {
    const workers: Worker[] = []

    // Quickly check localStorage without heavy processing
    if (typeof window !== 'undefined') {
      try {
        const userProfile = localStorage.getItem('userProfile')
        if (userProfile) {
          const profile = JSON.parse(userProfile)
          const categoryJobs = getJobsInSameCategory(jobTitle)
          if (profile.city === city && categoryJobs.includes(profile.jobTitle)) {
            workers.push(profile)
          }
        }
      } catch (e) {
        // Ignore localStorage errors to prevent blocking
      }
    }

    // Add fast generated category workers (this is the main source)
    const categoryWorkers = generateCategoryWorkers(city, jobTitle)
    workers.push(...categoryWorkers)

    return workers
  } catch (error) {
    console.error('Error loading workers:', error)
    // Return minimal fallback data
    return generateCategoryWorkers(city, jobTitle)
  }
}

// Helper functions to convert URL slugs to display names
function citySlugToDisplayName(slug: string): City {
  const formatted = slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

  // Handle special cases
  const cityMap: Record<string, City> = {
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Umm Salal': 'Umm Salal',
    'Al Khor': 'Al Khor',
    'Al Daayen': 'Al Daayen',
    'Abu Dhabi': 'Abu Dhabi',
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Ain': 'Al Ain',
    'Kuwait City': 'Kuwait City',
    'Hamad Town': 'Hamad Town',
    'Isa Town': 'Isa Town'
  }

  return (cityMap[formatted] as City) || (formatted as City)
}

function jobSlugToDisplayName(slug: string): JobTitle {
  const formatted = slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

  // Handle special job title mappings for legacy compatibility
  const jobMap: Record<string, JobTitle> = {
    'Maid': 'Housemaid',
    'Driver': 'Light Vehicle Driver',
    'Gardener': 'Landscaper',
    'Mechanic': 'Auto Mechanic',
    'Construction Worker': 'Construction Laborer',
    'Warehouse Worker': 'Warehouse Associate',
    'Nanny Childcare Worker': 'Nanny (Childcare Worker)',
    'Cook Home Based': 'Cook (Home-based)',
    'Governess Live In Tutor Nanny': 'Governess (Live-in Tutor/Nanny)',
    'Housekeeper Residential': 'Housekeeper (Residential)',
    'Live In Maid': 'Live-in Maid',
    'Hvac Technician': 'HVAC Technician',
    'Ac Technician': 'AC Technician',
    'Cnc Machine Operator': 'CNC Machine Operator'
  }

  return (jobMap[formatted] as JobTitle) || (formatted as JobTitle)
}

const validCities: City[] = [
  // UAE
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
  // Qatar
  'Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen',
  // Saudi Arabia
  'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif',
  // Oman
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi',
  // Kuwait
  'Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya',
  // Bahrain
  'Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'
]


// Job categories for showing related workers
const JOB_CATEGORIES: Record<string, JobTitle[]> = {
  'Domestic & Personal Care Workers': [
    'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
    'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',
    'Maid' // Legacy
  ],
  'Construction & Infrastructure': [
    'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
    'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
    'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',
    'Construction Worker' // Legacy
  ],
  'Mechanical & Technical': [
    'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
    'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',
    'Mechanic' // Legacy
  ],
  'Manufacturing & Factory': [
    'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
    'Production Supervisor', 'Fabricator', 'Loader/Unloader',
    'Warehouse Worker' // Legacy
  ],
  'Transport & Logistics': [
    'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
    'Dispatch Coordinator', 'Heavy Vehicle Driver',
    'Driver' // Legacy
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
    'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',
    'Gardener' // Legacy
  ],
  'Other Common Jobs': [
    'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
  ]
}

// Flatten all jobs for validation
const validJobs: JobTitle[] = Object.values(JOB_CATEGORIES).flat()

// Function to get all jobs in the same category
function getJobsInSameCategory(jobTitle: JobTitle): JobTitle[] {
  for (const [category, jobs] of Object.entries(JOB_CATEGORIES)) {
    if (jobs.includes(jobTitle)) {
      return jobs
    }
  }
  return [jobTitle] // Fallback to just the single job
}

// Function to get category name for a job
function getCategoryForJob(jobTitle: JobTitle): string {
  for (const [category, jobs] of Object.entries(JOB_CATEGORIES)) {
    if (jobs.includes(jobTitle)) {
      return category
    }
  }
  return 'Other Jobs'
}

// Function to get job-specific images
function getJobImages(jobTitle: JobTitle): { hero: string; employment: string; future: string } {
  const jobCategory = getCategoryForJob(jobTitle)

  const imageMap: Record<string, { hero: string; employment: string; future: string }> = {
    'Domestic & Personal Care Workers': {
      hero: 'photo-1581578731548-c64695cc6952', // household/domestic work
      employment: 'photo-1554224155-6726b3ff858f', // handshake/agreement
      future: 'photo-1560472354-b33ff0c44a43' // modern home/technology
    },
    'Construction & Infrastructure': {
      hero: 'photo-1504307651254-35680f356dfd', // construction workers
      employment: 'photo-1507003211169-0a1dd7228f2d', // construction site
      future: 'photo-1541976844346-f18aeac57b06' // modern construction
    },
    'Mechanical & Technical': {
      hero: 'photo-1504917595217-d4dc5ebe6122', // mechanic working
      employment: 'photo-1581093458791-9d42e1e7bd46', // technical tools
      future: 'photo-1559827260-dc66d52bef19' // modern machinery
    },
    'Manufacturing & Factory': {
      hero: 'photo-1565793298595-6a879b1d9492', // factory worker
      employment: 'photo-1586528116311-ad8dd3c8310d', // factory environment
      future: 'photo-1518709268805-4e9042af2176' // automated manufacturing
    },
    'Transport & Logistics': {
      hero: 'photo-1566576912321-d58ddd7a6088', // truck driver
      employment: 'photo-1565043589221-1a6fd9ae45c7', // logistics warehouse
      future: 'photo-1597149496124-c29bcb0d8d04' // modern transport
    },
    'Cleaning & Maintenance': {
      hero: 'photo-1558618047-b8c9c8e3a46c', // cleaning service
      employment: 'photo-1527515637462-cff94eecc1ac', // cleaning supplies
      future: 'photo-1586281380614-d8c7d8b80051' // modern cleaning tech
    },
    'Hospitality & Food': {
      hero: 'photo-1556909075-f3dc2e5e2ca8', // chef cooking
      employment: 'photo-1414235077428-338989a2e8c0', // restaurant kitchen
      future: 'photo-1566554273541-37a9ca77b91b' // modern kitchen tech
    },
    'Security & General Services': {
      hero: 'photo-1571019613454-1cb2f99b2d8b', // security guard
      employment: 'photo-1593113598332-cd288d649433', // security equipment
      future: 'photo-1558618047-3c8c76ca7836' // modern security tech
    },
    'Garments & Tailoring': {
      hero: 'photo-1558947530-cbcf6e9aeeae', // tailor working
      employment: 'photo-1544967882-7a3fe45fbe72', // sewing machine
      future: 'photo-1559827260-dc66d52bef19' // modern textile tech
    },
    'Agriculture & Farming': {
      hero: 'photo-1500382017468-9049fed747ef', // farm worker
      employment: 'photo-1474181487882-5abf3f0ba6c2', // agricultural work
      future: 'photo-1530836369250-ef72a3f5cda8' // modern farming tech
    },
    'Other Common Jobs': {
      hero: 'photo-1507003211169-0a1dd7228f2d', // general worker
      employment: 'photo-1554224155-6726b3ff858f', // professional handshake
      future: 'photo-1450101499163-c8848c66ca85' // modern workplace
    }
  }

  return imageMap[jobCategory] || imageMap['Other Common Jobs']
}

// Function to get city-specific insights
function getCitySpecificContent(city: City, country: Country): { marketInsight: string; localTips: string[] } {
  const cityInsights: Record<string, { marketInsight: string; localTips: string[] }> = {
    // UAE Cities
    'Dubai': {
      marketInsight: "Dubai's cosmopolitan environment and luxury lifestyle create high demand for premium service providers. The city's international business hub status means professionals here work with diverse, high-expectation clientele from around the world.",
      localTips: [
        '• Understand luxury service standards expected in premium Dubai communities',
        '• Be prepared to work with multiple nationalities and cultural preferences',
        '• Maintain professional appearance suitable for upscale environments',
        '• Learn basic Arabic phrases alongside English for better communication',
        '• Stay updated with Dubai\'s rapid lifestyle and technology changes'
      ]
    },
    'Abu Dhabi': {
      marketInsight: "As the UAE's capital, Abu Dhabi attracts government officials, diplomats, and business leaders who value reliability and discretion. The city's cultural significance means workers should be especially respectful of local traditions and customs.",
      localTips: [
        '• Respect local Emirati customs and traditions more strictly than other UAE cities',
        '• Understand protocol when working with government and diplomatic families',
        '• Maintain highest levels of discretion and professionalism',
        '• Be familiar with both modern amenities and traditional household management',
        '• Develop cultural sensitivity for international diplomatic community'
      ]
    },
    'Sharjah': {
      marketInsight: "Sharjah's reputation as the cultural capital of the UAE attracts families who value education and tradition. Workers here often serve households that appreciate cultural awareness and educational support for children.",
      localTips: [
        '• Appreciate Sharjah\'s focus on education and cultural preservation',
        '• Be prepared to support children\'s educational activities and cultural learning',
        '• Understand the balance between modern living and traditional values',
        '• Respect the emirate\'s emphasis on family-oriented lifestyle',
        '• Learn about local cultural sites and educational institutions'
      ]
    },
    // Qatar Cities
    'Doha': {
      marketInsight: "Doha's rapid modernization combined with strong cultural heritage creates unique opportunities for workers who can bridge traditional and contemporary service expectations. The city's growing expat community values multicultural understanding.",
      localTips: [
        '• Balance respect for Qatari traditions with modern international lifestyle needs',
        '• Understand the unique blend of traditional and ultra-modern living in Doha',
        '• Be prepared for the seasonal weather patterns affecting daily routines',
        '• Learn about Qatar\'s rapid development and changing neighborhood dynamics',
        '• Develop skills for both traditional Qatari and international household management'
      ]
    },
    // Saudi Arabia Cities
    'Riyadh': {
      marketInsight: "As Saudi Arabia's capital and largest city, Riyadh offers diverse opportunities with families ranging from traditional Saudi households to international business families. The city's Vision 2030 development creates demand for adaptable, skilled workers.",
      localTips: [
        '• Understand Saudi cultural norms and family structures deeply',
        '• Be prepared for strict adherence to local customs and religious practices',
        '• Develop skills suitable for both traditional and modernizing Saudi households',
        '• Learn basic Arabic as it\'s more essential here than in other Gulf cities',
        '• Stay informed about Saudi Arabia\'s rapid social and economic changes'
      ]
    },
    'Jeddah': {
      marketInsight: "Jeddah's role as a commercial hub and gateway to Mecca creates a unique environment where business professionals and religious pilgrims converge. Workers here serve diverse clientele with varying cultural and religious backgrounds.",
      localTips: [
        '• Understand Jeddah\'s unique position as gateway to holy cities',
        '• Be prepared to work with families hosting religious pilgrims during Hajj season',
        '• Develop cultural sensitivity for the diverse Muslim communities visiting the city',
        '• Learn about the city\'s commercial importance and business culture',
        '• Respect the heightened religious significance of the region'
      ]
    },
    // Kuwait
    'Kuwait City': {
      marketInsight: "Kuwait City's oil wealth and small size create an intimate job market where reputation and word-of-mouth referrals are crucial. Families often prefer long-term relationships with trusted workers who understand Kuwaiti lifestyle preferences.",
      localTips: [
        '• Build strong reputation as word-of-mouth referrals are very important in Kuwait',
        '• Understand Kuwaiti family dynamics and social hierarchies',
        '• Be prepared for the extreme summer heat affecting daily schedules',
        '• Learn about Kuwait\'s unique dialect and cultural expressions',
        '• Develop relationships within the close-knit expat and local communities'
      ]
    },
    // Bahrain
    'Manama': {
      marketInsight: "Manama's role as a regional financial center attracts banking professionals and business executives who value efficiency and reliability. The city's liberal atmosphere creates opportunities for workers comfortable with diverse cultural environments.",
      localTips: [
        '• Understand Bahrain\'s more liberal social atmosphere compared to neighboring countries',
        '• Be prepared to work with international banking and finance professionals',
        '• Develop efficiency and time-management skills valued by busy business families',
        '• Learn about the island\'s unique cultural blend of traditions',
        '• Appreciate the importance of maintaining work-life balance for busy professionals'
      ]
    },
    // Oman
    'Muscat': {
      marketInsight: "Muscat's emphasis on preserving Omani culture while embracing modernity creates opportunities for workers who can respect traditions while adapting to contemporary needs. The city's natural beauty influences lifestyle preferences.",
      localTips: [
        '• Appreciate Oman\'s strong emphasis on preserving local culture and traditions',
        '• Understand the importance of environmental consciousness in daily practices',
        '• Be prepared for outdoor lifestyle preferences influenced by natural beauty',
        '• Learn about Omani hospitality traditions and their application in household management',
        '• Develop skills for both urban and nature-oriented lifestyle support'
      ]
    }
  }

  // Fallback for cities not specifically defined
  const fallback = {
    marketInsight: `${city}'s position in ${country} creates a unique environment where international professionals and local families seek reliable, culturally-aware workers who can adapt to diverse household needs and maintain high service standards.`,
    localTips: [
      '• Develop cultural sensitivity for diverse international and local families',
      '• Maintain professional standards expected in Gulf region households',
      '• Learn basic Arabic phrases to improve communication with local families',
      '• Understand local customs and religious practices to show respect',
      '• Stay adaptable to different household management styles and preferences'
    ]
  }

  return cityInsights[city] || fallback
}

// Function to get job-specific service descriptions
function getJobSpecificServices(jobTitle: JobTitle): string[] {
  const serviceMap: Record<string, string[]> = {
    'Housemaid': [
      'Daily house cleaning and maintenance of all living areas',
      'Laundry services including washing, ironing, and wardrobe organization',
      'Kitchen cleaning and basic meal preparation assistance',
      'Bathroom sanitization and deep cleaning services',
      'Bedroom organization and bed making services'
    ],
    'Cook (Home-based)': [
      'Preparation of daily meals according to family preferences',
      'Menu planning and grocery shopping assistance',
      'Kitchen organization and equipment maintenance',
      'Special dietary requirement accommodation',
      'Food storage and hygiene management'
    ],
    'Nanny (Childcare Worker)': [
      'Full-time childcare and supervision for children of all ages',
      'Educational activities and homework assistance',
      'Transportation to school and extracurricular activities',
      'Meal preparation and feeding for children',
      'Bedtime routines and sleep schedule management'
    ],
    'Light Vehicle Driver': [
      'Daily transportation for family members and errands',
      'School pickup and drop-off services',
      'Shopping trips and appointment transportation',
      'Vehicle maintenance and cleanliness',
      'Emergency transportation services'
    ],
    'Auto Mechanic': [
      'Vehicle diagnostics and repair services',
      'Regular maintenance and servicing',
      'Emergency breakdown assistance',
      'Parts replacement and system upgrades',
      'Vehicle inspection and safety checks'
    ],
    'Construction Laborer': [
      'General construction and building maintenance',
      'Material handling and site preparation',
      'Basic carpentry and repair work',
      'Safety protocol adherence and site cleanup',
      'Assistance with renovation and improvement projects'
    ],
    'Electrician': [
      'Electrical installation and repair services',
      'Wiring and circuit troubleshooting',
      'Appliance installation and maintenance',
      'Safety inspection and compliance checking',
      'Emergency electrical services'
    ],
    'Plumber': [
      'Plumbing installation and repair services',
      'Pipe and fixture maintenance',
      'Water system troubleshooting',
      'Bathroom and kitchen plumbing services',
      'Emergency plumbing assistance'
    ],
    'Security Guard': [
      'Property security and surveillance',
      'Access control and visitor management',
      'Emergency response and reporting',
      'Patrol services and safety checks',
      'Security system monitoring'
    ],
    'Cleaner': [
      'Commercial and residential cleaning services',
      'Deep cleaning and sanitization',
      'Floor care and maintenance',
      'Window and surface cleaning',
      'Waste management and disposal'
    ]
  }

  // Default services for jobs not specifically mapped
  const defaultServices = [
    `Professional ${jobTitle.toLowerCase()} services tailored to your specific needs`,
    'Reliable and experienced service delivery',
    'Flexible scheduling to accommodate your requirements',
    'Quality assurance and professional standards',
    'Ongoing support and communication'
  ]

  return serviceMap[jobTitle] || defaultServices
}

// Function to get job-specific hiring challenges
function getJobSpecificChallenges(jobTitle: JobTitle): { challenge: string; solution: string }[] {
  const challengeMap: Record<string, { challenge: string; solution: string }[]> = {
    'Housemaid': [
      {
        challenge: 'Finding someone who understands your specific cleaning standards and household preferences.',
        solution: 'Provide a detailed orientation during the first week, including preferred cleaning products, schedules, and specific areas of focus. Create a written guide for reference.'
      },
      {
        challenge: 'Ensuring trust and security when allowing access to personal spaces and belongings.',
        solution: 'Start with supervised work periods and gradually increase independence. Verify all references and consider using a probationary period with clear expectations.'
      }
    ],
    'Cook (Home-based)': [
      {
        challenge: 'Finding a cook who can prepare meals according to your family\'s dietary preferences and restrictions.',
        solution: 'Conduct a cooking trial during the interview process. Discuss all dietary needs, allergies, and preferred cuisines upfront. Provide recipe books or cooking guidelines.'
      },
      {
        challenge: 'Managing food costs and grocery shopping efficiently.',
        solution: 'Establish a clear budget and shopping list system. Train the cook on preferred brands, stores, and cost-effective shopping practices specific to your area.'
      }
    ],
    'Nanny (Childcare Worker)': [
      {
        challenge: 'Ensuring the nanny understands your parenting style and child-rearing preferences.',
        solution: 'Have detailed discussions about discipline, educational activities, screen time, and daily routines. Provide written guidelines and observe interactions during the trial period.'
      },
      {
        challenge: 'Building trust for the safety and well-being of your children.',
        solution: 'Conduct thorough background checks, verify all references from previous families, and consider starting with supervised interactions before allowing independent childcare.'
      }
    ],
    'Light Vehicle Driver': [
      {
        challenge: 'Ensuring the driver has proper licensing and insurance for your area.',
        solution: 'Verify all driving licenses, insurance coverage, and clean driving record. Ensure they understand local traffic laws and your preferred routes and destinations.'
      },
      {
        challenge: 'Finding someone reliable for school runs and important appointments.',
        solution: 'Establish clear schedules, backup plans, and communication protocols. Test punctuality during trial period and discuss emergency procedures.'
      }
    ],
    'Auto Mechanic': [
      {
        challenge: 'Verifying technical skills and experience with your specific vehicle types.',
        solution: 'Request certifications, conduct practical skill tests, and check references from previous employers. Start with simple maintenance tasks before complex repairs.'
      },
      {
        challenge: 'Ensuring honest pricing and quality parts usage.',
        solution: 'Establish clear agreements about parts sourcing, labor costs, and approval processes for major repairs. Request detailed estimates before work begins.'
      }
    ]
  }

  // Default challenges for jobs not specifically mapped
  const defaultChallenges = [
    {
      challenge: `Finding a ${jobTitle.toLowerCase()} with the right experience and skills for your specific requirements.`,
      solution: 'Clearly define your expectations, conduct thorough interviews, and request practical demonstrations of key skills during the selection process.'
    },
    {
      challenge: `Ensuring reliable and consistent service quality from your ${jobTitle.toLowerCase()}.`,
      solution: 'Establish clear performance standards, provide regular feedback, and maintain open communication about expectations and any concerns.'
    }
  ]

  return challengeMap[jobTitle] || defaultChallenges
}

// Function to get city and job specific salary insights
function getSalaryInsights(city: City, jobTitle: JobTitle, country: Country): { range: string; factors: string[] } {
  // Base salary ranges by job category
  const jobSalaryMap: Record<string, { min: number; max: number }> = {
    'Housemaid': { min: 1200, max: 2500 },
    'Cook (Home-based)': { min: 1500, max: 3000 },
    'Nanny (Childcare Worker)': { min: 1800, max: 3500 },
    'Light Vehicle Driver': { min: 1600, max: 2800 },
    'Auto Mechanic': { min: 2000, max: 4000 },
    'Construction Laborer': { min: 1400, max: 2600 },
    'Electrician': { min: 2200, max: 4500 },
    'Plumber': { min: 2000, max: 4200 },
    'Security Guard': { min: 1300, max: 2400 },
    'Cleaner': { min: 1000, max: 2000 }
  }

  // City multipliers based on cost of living and demand
  const cityMultipliers: Record<string, number> = {
    'Dubai': 1.3,
    'Abu Dhabi': 1.25,
    'Sharjah': 1.1,
    'Doha': 1.2,
    'Riyadh': 1.15,
    'Jeddah': 1.1,
    'Kuwait City': 1.25,
    'Manama': 1.2,
    'Muscat': 1.05
  }

  const baseSalary = jobSalaryMap[jobTitle] || { min: 1500, max: 3000 }
  const multiplier = cityMultipliers[city] || 1.0

  const adjustedMin = Math.round(baseSalary.min * multiplier)
  const adjustedMax = Math.round(baseSalary.max * multiplier)

  const currency = country === 'UAE' ? 'AED' :
                  country === 'Qatar' ? 'QAR' :
                  country === 'Saudi Arabia' ? 'SAR' :
                  country === 'Kuwait' ? 'KWD' :
                  country === 'Bahrain' ? 'BHD' :
                  country === 'Oman' ? 'OMR' : 'AED'

  // City-specific factors affecting salary
  const cityFactors: Record<string, string[]> = {
    'Dubai': [
      'Premium service expectations in luxury communities',
      'High cost of living and accommodation',
      'Diverse international clientele requiring specialized skills',
      'Competitive market with high demand for quality workers'
    ],
    'Abu Dhabi': [
      'Government and diplomatic families offering stable employment',
      'Cultural capital status requiring higher professional standards',
      'Emphasis on discretion and protocol awareness',
      'Long-term employment opportunities with career growth'
    ],
    'Doha': [
      'Rapid development creating high demand for skilled workers',
      'World Cup legacy infrastructure requiring specialized skills',
      'Growing expat community with diverse service needs',
      'Investment in education and development programs'
    ],
    'Riyadh': [
      'Vision 2030 initiatives creating new opportunities',
      'Large metropolitan area with diverse employment sectors',
      'Traditional Saudi families alongside international businesses',
      'Growing demand for culturally-aware professional services'
    ]
  }

  const factors = cityFactors[city] || [
    `${city}'s economic growth and development opportunities`,
    'Diverse international and local family requirements',
    'Competitive job market rewarding skilled professionals',
    'Growing demand for reliable and trustworthy workers'
  ]

  return {
    range: `${currency} ${adjustedMin.toLocaleString()} - ${adjustedMax.toLocaleString()}`,
    factors
  }
}


interface PageProps {
  params: {
    city: string
    job: string
  }
}

// Metadata will be handled by layout or parent component

export default function CityJobPage({ params }: PageProps) {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  // Convert URL parameters to display names
  const cityDisplay = citySlugToDisplayName(params.city)
  const jobDisplay = jobSlugToDisplayName(params.job)
  const country = getCountryForCity(cityDisplay as City)

  // Validate URL parameters
  useEffect(() => {
    if (!validCities.includes(cityDisplay as City) ||
        !Object.values(JOB_CATEGORIES).flat().includes(jobDisplay as JobTitle)) {
      router.push('/browse')
    }
  }, [params.city, params.job, router, cityDisplay, jobDisplay])
  const localCurrency = getCurrencyDisplayForCity(params.city)

  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true)
        // Instant loading with fast generated workers
        const workers = loadWorkersForCityJob(cityDisplay, jobDisplay as JobTitle)
        setWorkers(workers)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading workers:', error)
        setWorkers([])
        setIsLoading(false)
      }
    }

    // Small delay to allow page to render first
    const timeoutId = setTimeout(loadData, 50)
    return () => clearTimeout(timeoutId)
  }, [cityDisplay, jobDisplay])

  // Show all workers from the same category (not just the specific job)
  const categoryJobs = getJobsInSameCategory(jobDisplay)
  const filteredWorkers = workers.filter(worker => {
    try {
      return worker.city === cityDisplay && categoryJobs.includes(worker.jobTitle)
    } catch (error) {
      console.error('Error filtering worker:', error)
      return false
    }
  })

  const categoryName = getCategoryForJob(jobDisplay)
  const specificJobWorkers = filteredWorkers.filter(w => w.jobTitle === jobDisplay).length

  const averageSalary = filteredWorkers.length > 0
    ? Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.expectedSalary, 0) / filteredWorkers.length)
    : 0

  // Generate unique FAQs for this city and job combination
  let faqs = []
  try {
    faqs = generateCityJobFAQs(params.city, jobDisplay)
  } catch (error) {
    console.error('Error generating FAQs:', error)
    // Fallback FAQ data
    faqs = [
      {
        question: `How much does it cost to hire a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `The average salary for ${jobDisplay.toLowerCase()}s in ${cityDisplay} varies based on experience and qualifications. Most employers also provide accommodation and transportation.`
      },
      {
        question: `How quickly can I hire a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Most employers connect with suitable ${jobDisplay.toLowerCase()} candidates within 24-48 hours. The complete hiring process typically takes 2-6 weeks.`
      }
    ]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {jobDisplay}s in {cityDisplay}...</p>
        </div>
      </div>
    )
  }

  // Error boundary wrapper
  if (!validCities.includes(cityDisplay as City) || !Object.values(JOB_CATEGORIES).flat().includes(jobDisplay as JobTitle)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-4">The job or city you're looking for doesn't exist.</p>
          <Link href="/browse" className="btn-primary">
            Find All Workers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire Verified {jobDisplay}s in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
              Connect with skilled and experienced {jobDisplay.toLowerCase()}s in {cityDisplay}.
              All profiles are verified and ready to work.
            </p>
            <div className="bg-white/10 rounded-lg p-3 mb-8 inline-block">
              <p className="text-sm text-gray-200">
                Showing workers from <span className="font-semibold text-gold-400">{categoryName}</span> category
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{specificJobWorkers}</div>
                <div className="text-gray-200 text-sm">{jobDisplay}s</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{filteredWorkers.length}</div>
                <div className="text-gray-200 text-sm">Category Total</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{localCurrency} {averageSalary}</div>
                <div className="text-gray-200 text-sm">Average Salary</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">24h</div>
                <div className="text-gray-200 text-sm">Average Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/browse" className="text-gray-500 hover:text-primary-600">Find Workers</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{cityDisplay} {jobDisplay}s</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredWorkers.length > 0 ? (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="card hover:shadow-lg transition-shadow">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={worker.profilePicture}
                      alt={worker.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy-900">{worker.fullName}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
                        {worker.jobTitle === jobDisplay && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            Exact Match
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {worker.city}, {worker.country}
                      </div>
                    </div>
                    {(worker.visaStatus === 'Work Visa' || worker.visaStatus === 'Freelance Visa') && (
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" title={worker.visaStatus} />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.yearsExperience}</div>
                      <div className="text-gray-600 text-sm">Years Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.expectedSalary}</div>
                      <div className="text-gray-600 text-sm">{localCurrency}/Month</div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-700 mb-2">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {worker.languagesSpoken.slice(0, 3).map((lang) => (
                        <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About Me Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {worker.aboutMe}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      Unlock Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600 text-white rounded-lg p-8 text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Hire?</h3>
              <p className="text-lg mb-6 text-gray-200">
                Subscribe now to unlock contact details and connect with {jobDisplay.toLowerCase()}s directly
              </p>
              <Link href="/pricing" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block">
                View Pricing Plans
              </Link>
            </div>
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <BriefcaseIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {jobDisplay}s found in {cityDisplay}
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new profiles. Check back soon or browse other locations.
            </p>
            <Link href="/browse" className="btn-primary">
              Find All Workers
            </Link>
          </div>
        )}

        {/* Comprehensive Content Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-6 text-center">
              Complete Guide to Hiring {jobDisplay}s in {cityDisplay}
            </h2>

            {/* Hero Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={`https://images.unsplash.com/${getJobImages(jobDisplay).hero}?w=800&h=400&fit=crop&crop=center`}
                alt={`Professional ${jobDisplay.toLowerCase()} working in ${cityDisplay}`}
                className="w-full h-64 sm:h-80 object-cover"
                loading="lazy"
              />
              <div className="bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">
                  Experienced {jobDisplay.toLowerCase()}s ready to work in {cityDisplay}, {country}
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Finding a reliable and trustworthy {jobDisplay.toLowerCase()} in {cityDisplay} can be challenging, but with the right approach and knowledge, you can secure the perfect candidate for your needs. Whether you're a busy professional, a growing family, or someone in need of specialized assistance, hiring a qualified {jobDisplay.toLowerCase()} in {cityDisplay} offers numerous benefits that can significantly improve your quality of life.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {cityDisplay}, being one of {country}'s major cities, attracts skilled workers from around the world, creating a diverse pool of experienced {jobDisplay.toLowerCase()}s. This comprehensive guide will walk you through everything you need to know about hiring {jobDisplay.toLowerCase()}s in {cityDisplay}, from understanding local regulations to finding the right match for your household or business needs.
              </p>
            </div>

            {/* Why Choose Professional Workers */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Why Choose Professional {jobDisplay}s in {cityDisplay}?
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">🏆 Quality & Experience</h4>
                  <p className="text-gray-700">
                    Professional {jobDisplay.toLowerCase()}s in {cityDisplay} bring years of experience and training to ensure high-quality service. They understand local standards and cultural preferences, making them ideal for families and businesses in the area.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">⏰ Time-Saving Solution</h4>
                  <p className="text-gray-700">
                    Hiring a qualified {jobDisplay.toLowerCase()} frees up valuable time for you to focus on work, family, and personal activities. This is especially beneficial for busy professionals and growing families in {cityDisplay}.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">🔒 Peace of Mind</h4>
                  <p className="text-gray-700">
                    Verified {jobDisplay.toLowerCase()}s undergo background checks and reference verification, giving you confidence in your hiring decision. Safety and trust are paramount when inviting someone into your home or workplace.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">💰 Cost-Effective</h4>
                  <p className="text-gray-700">
                    When you consider the value of your time and the quality of service provided, hiring a professional {jobDisplay.toLowerCase()} in {cityDisplay} offers excellent return on investment for your household or business needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Services and Specializations */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Services Offered by {jobDisplay}s in {cityDisplay}
              </h3>

              <div className="mb-6">
                <img
                  src={`https://images.unsplash.com/${getJobImages(jobDisplay).hero}?w=600&h=300&fit=crop&crop=center`}
                  alt={`${jobDisplay} services available in ${cityDisplay}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {jobDisplay}s in {cityDisplay} offer a wide range of services tailored to meet diverse household and business needs. Understanding these services helps you make an informed decision when hiring.
              </p>

              <ul className="space-y-3 text-gray-700">
                {getJobSpecificServices(jobDisplay).map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hiring Process and Tips */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                How to Hire the Right {jobDisplay} in {cityDisplay}
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The hiring process for {jobDisplay.toLowerCase()}s in {cityDisplay} requires careful consideration and planning. Follow these essential steps to ensure you find the perfect match for your needs.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary-600 pl-6">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">1. Define Your Requirements</h4>
                  <p className="text-gray-700">
                    Clearly outline your expectations, working hours, specific tasks, and any special requirements. Consider factors like language preferences, experience level, and cultural compatibility.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-6">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">2. Verify Credentials and Experience</h4>
                  <p className="text-gray-700">
                    Check references, work permits, and previous employment history. Ensure candidates have the necessary legal documentation to work in {cityDisplay}, {country}.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-6">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">3. Conduct Thorough Interviews</h4>
                  <p className="text-gray-700">
                    Meet candidates in person or via video call to assess communication skills, professionalism, and cultural fit. Discuss expectations clearly and answer any questions they may have.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-6">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">4. Trial Period and Training</h4>
                  <p className="text-gray-700">
                    Consider starting with a trial period to evaluate performance and compatibility. Provide necessary training on your specific requirements and household preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* Salary and Employment Terms */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Salary Expectations and Employment Terms for {jobDisplay}s in {cityDisplay}
              </h3>

              <div className="mb-6">
                <img
                  src={`https://images.unsplash.com/${getJobImages(jobDisplay).employment}?w=600&h=300&fit=crop&crop=center`}
                  alt={`Employment opportunities for ${jobDisplay.toLowerCase()}s in ${cityDisplay}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding fair compensation and employment terms is crucial when hiring {jobDisplay.toLowerCase()}s in {cityDisplay}. Competitive salaries not only attract the best candidates but also ensure long-term satisfaction and quality service.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">💰 Salary Considerations</h4>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-navy-900 mb-2">
                      {getSalaryInsights(cityDisplay, jobDisplay, country).range}
                    </div>
                    <div className="text-sm text-gray-600">Typical monthly salary range for {jobDisplay.toLowerCase()}s in {cityDisplay}</div>
                  </div>
                  <p className="text-gray-700 mb-3">Salary factors specific to {cityDisplay}:</p>
                  <ul className="space-y-2 text-gray-700">
                    {getSalaryInsights(cityDisplay, jobDisplay, country).factors.map((factor, index) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">📋 Employment Benefits</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Accommodation arrangements</li>
                    <li>• Health insurance coverage</li>
                    <li>• Annual leave and holidays</li>
                    <li>• Transportation allowances</li>
                    <li>• Professional development opportunities</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Fair and transparent employment terms create a positive working relationship that benefits both employers and {jobDisplay.toLowerCase()}s in {cityDisplay}. This approach leads to better service quality and longer employment relationships.
              </p>
            </div>

            {/* Local Insights */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Local Insights: Working with {jobDisplay}s in {cityDisplay}
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-navy-900 mb-3">Understanding {cityDisplay}'s Market</h4>
                <p className="text-gray-700">
                  {getCitySpecificContent(cityDisplay, country).marketInsight}
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                When hiring {jobDisplay.toLowerCase()}s in {cityDisplay}, understanding the local employment landscape is crucial for success. The city's unique character and cultural considerations create specific expectations and opportunities for both employers and workers.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                {jobDisplay}s working in {cityDisplay} benefit from understanding the local lifestyle preferences, cultural norms, and household management expectations that are specific to {country}. This cultural awareness leads to better service quality and stronger employer-worker relationships.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-navy-900 mb-3">🌟 Success Tips for Working in {cityDisplay}</h4>
                <ul className="space-y-2 text-gray-700">
                  {getCitySpecificContent(cityDisplay, country).localTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety and Legal Considerations */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Safety and Legal Considerations in {cityDisplay}
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Ensuring legal compliance and safety standards when hiring {jobDisplay.toLowerCase()}s in {cityDisplay} protects both employers and employees. Understanding local regulations and requirements is essential for a successful working relationship.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">📋 Legal Requirements</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Valid work permits and visas</li>
                    <li>• Employment contract documentation</li>
                    <li>• Insurance and liability coverage</li>
                    <li>• Compliance with labor laws</li>
                    <li>• Proper tax and social security arrangements</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-3">🔒 Safety Measures</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Background verification and references</li>
                    <li>• Health and safety training</li>
                    <li>• Emergency contact information</li>
                    <li>• Clear safety protocols and procedures</li>
                    <li>• Regular safety assessments and updates</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Challenges and Solutions */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Common Challenges When Hiring {jobDisplay}s in {cityDisplay} and How to Overcome Them
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                While hiring {jobDisplay.toLowerCase()}s in {cityDisplay} offers many benefits, employers may face certain challenges. Understanding these common issues and their solutions helps ensure a smooth hiring process and successful long-term employment relationships.
              </p>

              <div className="space-y-6">
                {getJobSpecificChallenges(jobDisplay).map((item, index) => {
                  const borderColors = ['border-orange-500 bg-orange-50', 'border-blue-500 bg-blue-50', 'border-green-500 bg-green-50', 'border-purple-500 bg-purple-50']
                  const colorClass = borderColors[index % borderColors.length]

                  return (
                    <div key={index} className={`border-l-4 pl-6 p-4 rounded-r-lg ${colorClass}`}>
                      <h4 className="text-lg font-semibold text-navy-900 mb-2">Challenge #{index + 1}</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Challenge:</strong> {item.challenge}
                      </p>
                      <p className="text-gray-700">
                        <strong>Solution:</strong> {item.solution}
                      </p>
                    </div>
                  )
                })}

                {/* Always include this general challenge as well */}
                <div className="border-l-4 border-indigo-500 pl-6 bg-indigo-50 p-4 rounded-r-lg">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">Language and Cultural Adaptation</h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Challenge:</strong> Finding {jobDisplay.toLowerCase()}s who can communicate effectively and adapt to your cultural preferences in {cityDisplay}.
                  </p>
                  <p className="text-gray-700">
                    <strong>Solution:</strong> Our platform allows you to filter by language skills and cultural background. Many {jobDisplay.toLowerCase()}s in {cityDisplay} are multilingual and experienced with diverse cultural requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Trends and Opportunities */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                Future Trends in Hiring {jobDisplay}s in {cityDisplay}
              </h3>

              <div className="mb-6">
                <img
                  src={`https://images.unsplash.com/${getJobImages(jobDisplay).future}?w=600&h=300&fit=crop&crop=center`}
                  alt={`Future trends for ${jobDisplay.toLowerCase()}s in ${cityDisplay}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The {getCategoryForJob(jobDisplay).toLowerCase()} industry in {cityDisplay} continues to evolve with {country}'s Vision initiatives and technological advancements. Understanding these trends helps both employers and {jobDisplay.toLowerCase()}s prepare for the future of professional services in the Gulf region.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">📱 Digital Integration</h4>
                  <p className="text-gray-700 text-sm">
                    Increased use of apps and digital tools for scheduling, communication, and service management.
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">🎓 Skill Development</h4>
                  <p className="text-gray-700 text-sm">
                    Growing emphasis on specialized training and certification programs for {jobDisplay.toLowerCase()}s.
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">🌱 Sustainability Focus</h4>
                  <p className="text-gray-700 text-sm">
                    Increasing demand for eco-friendly practices and sustainable household management approaches.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Staying informed about these trends helps ensure you choose {jobDisplay.toLowerCase()}s in {cityDisplay} who are prepared for the evolving needs of modern households and can adapt to new technologies and methodologies.
              </p>
            </div>

            {/* Conclusion and CTA */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Start Your Search for the Perfect {jobDisplay} in {cityDisplay} Today</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Finding the right {jobDisplay.toLowerCase()} in {cityDisplay} doesn't have to be complicated or time-consuming. With our comprehensive database of verified professionals, you can browse detailed profiles, compare qualifications, and connect directly with candidates who meet your specific requirements and preferences.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform simplifies the entire process - from initial search to final hiring - ensuring you find a reliable, professional {jobDisplay.toLowerCase()} who understands your needs and can contribute positively to your household or business in {cityDisplay}.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Take the first step towards finding your ideal {jobDisplay.toLowerCase()} in {cityDisplay} today. Join thousands of satisfied employers who have successfully hired through our trusted platform and experience the peace of mind that comes with professional household assistance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Frequently Asked Questions About {jobDisplay}s in {cityDisplay}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-navy-900 mb-3 leading-tight">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Note: Removed generateStaticParams to prevent SSG issues with client-side data loading
