import { City, JobTitle } from '../types'

// City-specific information for unique FAQs
const CITY_INFO: Record<string, {
  country: string,
  currency: string,
  visaProcess: string,
  livingCost: string,
  transport: string,
  culture: string,
  workingHours: string,
  accommodation: string
}> = {
  // UAE Cities
  'Dubai': {
    country: 'UAE',
    currency: 'AED',
    visaProcess: 'Employment visa sponsored by employer, medical test required',
    livingCost: 'High cost of living, especially housing in prime areas',
    transport: 'Excellent metro system, buses, and ride-sharing services',
    culture: 'Multicultural environment, English widely spoken',
    workingHours: '8 hours per day, 6 days per week standard',
    accommodation: 'Company accommodation or housing allowance typically provided'
  },
  'Abu Dhabi': {
    country: 'UAE',
    currency: 'AED',
    visaProcess: 'Work permit through employer sponsorship with medical examination',
    livingCost: 'Moderate to high cost of living, more affordable than Dubai',
    transport: 'Public buses and taxis, developing metro system',
    culture: 'More traditional than Dubai, respectful workplace environment',
    workingHours: '8 hours per day, Friday-Saturday weekend',
    accommodation: 'Employer often provides accommodation or allowance'
  },
  'Sharjah': {
    country: 'UAE',
    currency: 'AED',
    visaProcess: 'Employment visa with NOC from sponsor required',
    livingCost: 'More affordable than Dubai and Abu Dhabi',
    transport: 'Bus services and taxis, many commute to Dubai for work',
    culture: 'Cultural capital of UAE, more conservative environment',
    workingHours: 'Standard 48-hour work week',
    accommodation: 'Generally company-provided accommodation available'
  },
  
  // Qatar Cities
  'Doha': {
    country: 'Qatar',
    currency: 'QAR',
    visaProcess: 'Work visa through Kafala system, medical and police clearance',
    livingCost: 'High cost of living, especially imported goods',
    transport: 'Modern metro system, buses, and abundant taxis',
    culture: 'Traditional Islamic culture, rapidly modernizing',
    workingHours: '8 hours per day, outdoor work restricted in summer',
    accommodation: 'Employer typically provides accommodation'
  },
  'Al Rayyan': {
    country: 'Qatar',
    currency: 'QAR',
    visaProcess: 'Employment visa sponsored by Qatar employer',
    livingCost: 'Moderate cost of living, more affordable than central Doha',
    transport: 'Well-connected by metro and bus to Doha city center',
    culture: 'Family-friendly suburban environment',
    workingHours: 'Standard working hours with summer outdoor work restrictions',
    accommodation: 'Company accommodation common in industrial areas'
  },
  
  // Saudi Arabia Cities
  'Riyadh': {
    country: 'Saudi Arabia',
    currency: 'SAR',
    visaProcess: 'Work visa through Saudi sponsor, Iqama residence permit required',
    livingCost: 'Moderate cost of living, subsidized utilities',
    transport: 'Riyadh Metro, buses, and ride-sharing apps available',
    culture: 'Conservative Islamic environment, dress code important',
    workingHours: '8 hours per day, Friday-Saturday weekend',
    accommodation: 'Employer accommodation or allowance standard'
  },
  'Jeddah': {
    country: 'Saudi Arabia',
    currency: 'SAR',
    visaProcess: 'Work permit with sponsor letter and medical examination',
    livingCost: 'Reasonable cost of living, coastal city premium',
    transport: 'Bus rapid transit system and taxis',
    culture: 'More liberal than Riyadh, gateway to Mecca',
    workingHours: 'Standard work week, modified during Hajj season',
    accommodation: 'Company housing typically provided'
  },
  
  // Oman Cities
  'Muscat': {
    country: 'Oman',
    currency: 'OMR',
    visaProcess: 'Work visa through Ministry of Manpower approval',
    livingCost: 'Moderate cost of living, reasonable housing costs',
    transport: 'Public buses and taxis, limited but developing',
    culture: 'Peaceful and tolerant society, blend of traditional and modern',
    workingHours: '8 hours per day, Saturday-Wednesday work week',
    accommodation: 'Housing allowance or company accommodation common'
  },
  'Salalah': {
    country: 'Oman',
    currency: 'OMR',
    visaProcess: 'Employment visa with local sponsor registration',
    livingCost: 'Lower cost of living, especially housing',
    transport: 'Limited public transport, mostly taxis and private vehicles',
    culture: 'Slower pace of life, close-knit community',
    workingHours: 'Standard hours with monsoon season considerations',
    accommodation: 'Employer-provided accommodation very common'
  },
  
  // Kuwait Cities
  'Kuwait City': {
    country: 'Kuwait',
    currency: 'KWD',
    visaProcess: 'Work permit through Kuwait sponsor, civil ID required',
    livingCost: 'High cost of living, expensive housing market',
    transport: 'Public buses and taxis, traffic congestion common',
    culture: 'Oil-rich society, traditional values with modern outlook',
    workingHours: '8 hours per day, summer hours may be reduced',
    accommodation: 'Company accommodation or generous housing allowance'
  },
  'Hawalli': {
    country: 'Kuwait',
    currency: 'KWD',
    visaProcess: 'Employment visa with sponsor guarantee letter',
    livingCost: 'Moderate cost compared to Kuwait City center',
    transport: 'Bus services and taxis available',
    culture: 'Residential area with diverse expatriate community',
    workingHours: 'Standard working hours with flexible arrangements',
    accommodation: 'Shared accommodation common for blue-collar workers'
  },
  
  // Bahrain Cities
  'Manama': {
    country: 'Bahrain',
    currency: 'BHD',
    visaProcess: 'Work permit through LMRA (Labour Market Regulatory Authority)',
    livingCost: 'Moderate cost of living, more affordable than other Gulf capitals',
    transport: 'Public buses and taxis, connected to Saudi via causeway',
    culture: 'Liberal and cosmopolitan, strong banking sector',
    workingHours: '8 hours per day, 6-day work week common',
    accommodation: 'Company accommodation or allowance provided'
  },
  'Riffa': {
    country: 'Bahrain',
    currency: 'BHD',
    visaProcess: 'Employment visa through Bahraini sponsor',
    livingCost: 'Affordable suburban living, family-friendly',
    transport: 'Regular bus services to Manama and other areas',
    culture: 'Quiet residential area, mix of locals and expatriates',
    workingHours: 'Standard work schedule, shorter commute times',
    accommodation: 'Family accommodation common for long-term workers'
  }
}

// Job-specific FAQ content
const JOB_SPECIFIC_FAQS: Partial<Record<JobTitle, {
  requirements: string,
  benefits: string,
  growth: string,
  challenges: string
}>> = {
  'Driver': {
    requirements: 'Valid driving license, clean driving record, knowledge of local roads',
    benefits: 'Company vehicle, fuel allowance, overtime opportunities',
    growth: 'Supervisor roles, fleet management, specialized vehicle operation',
    challenges: 'Traffic congestion, long hours, vehicle maintenance responsibility'
  },
  'Maid': {
    requirements: 'Experience in housekeeping, attention to detail, trustworthiness',
    benefits: 'Accommodation provided, meals included, family visa possible',
    growth: 'Supervisor roles, specialized cleaning, household management',
    challenges: 'Physical demands, irregular hours, cultural adaptation'
  },
  'Electrician': {
    requirements: 'Electrical certification, experience with Gulf electrical systems',
    benefits: 'High demand, good salary, project-based bonuses',
    growth: 'Site supervisor, electrical contractor, specialized systems',
    challenges: 'Safety hazards, working in heat, staying updated with codes'
  },
  'Security Guard': {
    requirements: 'Security training, clean background check, physical fitness',
    benefits: 'Stable employment, shift allowances, insurance coverage',
    growth: 'Security supervisor, specialized security, training roles',
    challenges: 'Night shifts, standing for long periods, responsibility pressure'
  },
  'Cook': {
    requirements: 'Culinary skills, food safety knowledge, menu planning ability',
    benefits: 'Creative work environment, meals provided, cultural exchange',
    growth: 'Head chef, restaurant management, catering business',
    challenges: 'Hot kitchen environment, peak hour pressure, dietary restrictions'
  },
  'Plumber': {
    requirements: 'Plumbing certification, knowledge of local building codes',
    benefits: 'High demand, emergency call bonuses, skill transferability',
    growth: 'Master plumber, contracting business, specialized systems',
    challenges: 'Emergency calls, physical demands, complex problem-solving'
  },
  'Cleaner': {
    requirements: 'Attention to detail, physical stamina, hygiene standards',
    benefits: 'Entry-level friendly, flexible schedules, multiple job opportunities',
    growth: 'Cleaning supervisor, specialized cleaning, facility management',
    challenges: 'Physical demands, chemical exposure, repetitive tasks'
  },
  'Carpenter': {
    requirements: 'Woodworking skills, tool knowledge, blueprint reading',
    benefits: 'Creative work, good wages, project variety',
    growth: 'Master carpenter, contracting, furniture design',
    challenges: 'Physical demands, tool maintenance, material costs'
  },
  'Painter': {
    requirements: 'Painting techniques, color knowledge, surface preparation skills',
    benefits: 'Creative expression, steady demand, seasonal work availability',
    growth: 'Painting contractor, decorative specialist, project manager',
    challenges: 'Chemical exposure, physical demands, weather dependency'
  },
  'Gardener': {
    requirements: 'Plant knowledge, irrigation systems, landscape maintenance',
    benefits: 'Outdoor work, seasonal variety, environmentally friendly',
    growth: 'Landscape supervisor, garden design, nursery management',
    challenges: 'Weather exposure, physical demands, pest management'
  },
  'Mechanic': {
    requirements: 'Automotive knowledge, diagnostic skills, tool proficiency',
    benefits: 'High demand, technical challenges, good earning potential',
    growth: 'Shop supervisor, specialized mechanic, automotive trainer',
    challenges: 'Complex repairs, tool investment, staying current with technology'
  },
  'Construction Worker': {
    requirements: 'Physical strength, safety awareness, teamwork skills',
    benefits: 'High demand, project bonuses, skill development',
    growth: 'Site supervisor, specialized trades, contracting',
    challenges: 'Physical demands, safety risks, weather exposure'
  },
  'Delivery Driver': {
    requirements: 'Driving license, route knowledge, customer service skills',
    benefits: 'Flexible schedules, tips, vehicle provided',
    growth: 'Delivery supervisor, logistics coordinator, fleet manager',
    challenges: 'Traffic stress, time pressure, vehicle maintenance'
  },
  'Warehouse Worker': {
    requirements: 'Physical strength, inventory knowledge, forklift operation',
    benefits: 'Stable hours, overtime opportunities, skill development',
    growth: 'Warehouse supervisor, inventory manager, logistics coordinator',
    challenges: 'Physical demands, repetitive work, accuracy pressure'
  },
  'Office Boy': {
    requirements: 'Basic education, communication skills, reliability',
    benefits: 'Office environment, learning opportunities, career growth',
    growth: 'Administrative roles, office management, specialized support',
    challenges: 'Varied responsibilities, multitasking, protocol adherence'
  },
  'AC Technician': {
    requirements: 'HVAC certification, electrical knowledge, troubleshooting skills',
    benefits: 'High demand in Gulf climate, good wages, technical challenges',
    growth: 'HVAC supervisor, specialized systems, contracting business',
    challenges: 'Hot working conditions, complex systems, emergency calls'
  },
  'Welder': {
    requirements: 'Welding certification, safety training, precision skills',
    benefits: 'High wages, project work, skill transferability',
    growth: 'Welding supervisor, specialized welding, quality inspector',
    challenges: 'Safety hazards, physical demands, precision requirements'
  },
  'Mason': {
    requirements: 'Masonry skills, blueprint reading, material knowledge',
    benefits: 'Creative work, good wages, project variety',
    growth: 'Master mason, contracting, architectural stonework',
    challenges: 'Physical demands, weather exposure, precision requirements'
  },
  'Tile Setter': {
    requirements: 'Tiling skills, pattern knowledge, precision cutting',
    benefits: 'Creative work, good demand, residential and commercial projects',
    growth: 'Tiling supervisor, decorative specialist, contracting',
    challenges: 'Physical demands, precision requirements, material waste'
  },
  'Roofer': {
    requirements: 'Height tolerance, safety training, roofing material knowledge',
    benefits: 'Good wages, project work, skill demand',
    growth: 'Roofing supervisor, specialized systems, contracting',
    challenges: 'Height risks, weather exposure, physical demands'
  },
  'Glazier': {
    requirements: 'Glass handling skills, measurement precision, safety awareness',
    benefits: 'Specialized skill, good wages, commercial projects',
    growth: 'Glazing supervisor, architectural glass, specialized installations',
    challenges: 'Material fragility, precision requirements, safety risks'
  },
  'Heavy Equipment Operator': {
    requirements: 'Equipment certification, safety training, operational skills',
    benefits: 'High wages, project work, skill transferability',
    growth: 'Equipment supervisor, trainer, fleet manager',
    challenges: 'Safety responsibility, equipment maintenance, weather conditions'
  },
  'Crane Operator': {
    requirements: 'Crane certification, safety training, spatial awareness',
    benefits: 'High wages, specialized skill, project bonuses',
    growth: 'Crane supervisor, specialized cranes, safety inspector',
    challenges: 'High responsibility, safety pressure, weather conditions'
  },
  'Forklift Operator': {
    requirements: 'Forklift license, warehouse experience, safety awareness',
    benefits: 'Stable employment, overtime opportunities, skill development',
    growth: 'Warehouse supervisor, equipment trainer, inventory manager',
    challenges: 'Safety responsibility, repetitive work, accuracy requirements'
  },
  'Steel Fixer': {
    requirements: 'Reinforcement skills, blueprint reading, safety training',
    benefits: 'Good wages, project work, skill demand',
    growth: 'Steel supervisor, quality inspector, contracting',
    challenges: 'Physical demands, precision requirements, safety risks'
  },
  'Pipe Fitter': {
    requirements: 'Piping knowledge, welding skills, blueprint reading',
    benefits: 'High wages, specialized skill, industrial projects',
    growth: 'Pipe supervisor, specialized systems, quality inspector',
    challenges: 'Complex systems, precision requirements, safety considerations'
  },
  'HVAC Technician': {
    requirements: 'HVAC certification, electrical knowledge, system diagnosis',
    benefits: 'High demand, good wages, technical challenges',
    growth: 'HVAC supervisor, specialized systems, contracting',
    challenges: 'Complex systems, emergency calls, working conditions'
  },
  'Concrete Mixer': {
    requirements: 'Concrete knowledge, equipment operation, quality control',
    benefits: 'Steady work, project bonuses, skill development',
    growth: 'Concrete supervisor, quality inspector, batch plant operator',
    challenges: 'Physical demands, quality pressure, weather conditions'
  },
  'Excavator Operator': {
    requirements: 'Equipment certification, safety training, operational precision',
    benefits: 'Good wages, project work, skill transferability',
    growth: 'Equipment supervisor, trainer, site manager',
    challenges: 'Safety responsibility, precision requirements, equipment maintenance'
  },
  'Road Worker': {
    requirements: 'Physical fitness, safety awareness, teamwork skills',
    benefits: 'Infrastructure projects, overtime opportunities, job security',
    growth: 'Road supervisor, specialized equipment, project coordination',
    challenges: 'Traffic hazards, weather exposure, physical demands'
  },
  'Building Maintenance': {
    requirements: 'Multi-trade skills, troubleshooting ability, reliability',
    benefits: 'Varied work, skill development, stable employment',
    growth: 'Maintenance supervisor, facility manager, specialized trades',
    challenges: 'Emergency calls, diverse skills required, responsibility pressure'
  },
  'Pool Cleaner': {
    requirements: 'Swimming ability, chemical knowledge, equipment operation',
    benefits: 'Outdoor work, seasonal demand, specialized skill',
    growth: 'Pool supervisor, maintenance contractor, aquatic facility manager',
    challenges: 'Chemical exposure, weather conditions, equipment maintenance'
  },
  'Landscaper': {
    requirements: 'Plant knowledge, design sense, irrigation systems',
    benefits: 'Creative work, outdoor environment, project variety',
    growth: 'Landscape supervisor, garden designer, nursery manager',
    challenges: 'Weather exposure, seasonal work, physical demands'
  },
  'Window Cleaner': {
    requirements: 'Height tolerance, safety awareness, attention to detail',
    benefits: 'Specialized skill, regular clients, flexible schedules',
    growth: 'Cleaning supervisor, commercial contracts, equipment specialist',
    challenges: 'Height risks, weather dependency, physical demands'
  },
  'Pest Control Worker': {
    requirements: 'Pest knowledge, chemical certification, safety training',
    benefits: 'Specialized skill, good demand, problem-solving work',
    growth: 'Pest control supervisor, business owner, technical specialist',
    challenges: 'Chemical exposure, irregular schedules, customer education'
  },
  'Laundry Worker': {
    requirements: 'Fabric knowledge, equipment operation, attention to detail',
    benefits: 'Indoor work, stable hours, skill development',
    growth: 'Laundry supervisor, dry cleaning specialist, equipment technician',
    challenges: 'Chemical exposure, physical demands, quality pressure'
  },
  'Dishwasher': {
    requirements: 'Physical stamina, hygiene awareness, teamwork',
    benefits: 'Entry-level position, meal benefits, shift flexibility',
    growth: 'Kitchen assistant, food prep worker, kitchen supervisor',
    challenges: 'Hot environment, repetitive work, fast pace'
  },
  'Food Preparation Worker': {
    requirements: 'Food safety knowledge, knife skills, hygiene awareness',
    benefits: 'Culinary learning, meal benefits, skill development',
    growth: 'Cook, kitchen supervisor, food service manager',
    challenges: 'Fast pace, repetitive tasks, hygiene pressure'
  },
  'Kitchen Helper': {
    requirements: 'Physical fitness, hygiene awareness, teamwork',
    benefits: 'Entry-level position, learning opportunities, meal benefits',
    growth: 'Food prep worker, cook, kitchen supervisor',
    challenges: 'Fast pace, physical demands, multi-tasking'
  },
  'Waiter': {
    requirements: 'Customer service skills, menu knowledge, multitasking ability',
    benefits: 'Tips, social interaction, hospitality experience',
    growth: 'Head waiter, restaurant supervisor, hospitality manager',
    challenges: 'Customer pressure, long hours, physical demands'
  },
  'Barista': {
    requirements: 'Coffee knowledge, customer service, machine operation',
    benefits: 'Creative work, customer interaction, skill development',
    growth: 'Head barista, café supervisor, coffee shop manager',
    challenges: 'Fast pace, customer pressure, equipment maintenance'
  },
  'Cashier': {
    requirements: 'Math skills, customer service, accuracy attention',
    benefits: 'Customer interaction, skill development, stable hours',
    growth: 'Head cashier, retail supervisor, store manager',
    challenges: 'Accuracy pressure, customer issues, repetitive work'
  },
  'Shop Assistant': {
    requirements: 'Customer service, product knowledge, sales skills',
    benefits: 'Social interaction, product learning, sales bonuses',
    growth: 'Shop supervisor, sales specialist, store manager',
    challenges: 'Standing long hours, customer pressure, sales targets'
  },
  'Inventory Clerk': {
    requirements: 'Organizational skills, computer literacy, attention to detail',
    benefits: 'Data skills, inventory knowledge, stable work',
    growth: 'Inventory supervisor, warehouse manager, logistics coordinator',
    challenges: 'Accuracy pressure, repetitive work, data entry demands'
  },
  'Packer': {
    requirements: 'Physical fitness, attention to detail, speed',
    benefits: 'Entry-level position, overtime opportunities, skill development',
    growth: 'Packing supervisor, quality controller, warehouse supervisor',
    challenges: 'Repetitive work, speed pressure, physical demands'
  },
  'Loading Worker': {
    requirements: 'Physical strength, safety awareness, teamwork',
    benefits: 'Physical activity, overtime opportunities, skill development',
    growth: 'Loading supervisor, warehouse coordinator, logistics specialist',
    challenges: 'Physical demands, safety risks, time pressure'
  },
  'Moving Helper': {
    requirements: 'Physical strength, customer service, care handling',
    benefits: 'Varied locations, customer tips, physical activity',
    growth: 'Moving supervisor, specialized moving, business owner',
    challenges: 'Physical demands, customer pressure, item responsibility'
  },
  'Cleaning Supervisor': {
    requirements: 'Leadership skills, cleaning expertise, team management',
    benefits: 'Management role, team leadership, good salary',
    growth: 'Facility manager, cleaning contractor, area manager',
    challenges: 'Team management, quality control, client expectations'
  },
  'Maintenance Supervisor': {
    requirements: 'Technical expertise, leadership skills, multi-trade knowledge',
    benefits: 'Management role, technical challenges, good salary',
    growth: 'Facility manager, operations manager, technical director',
    challenges: 'Technical responsibility, team management, emergency response'
  }
}

export function generateCityJobFAQs(city: string, jobTitle: JobTitle): Array<{question: string, answer: string}> {
  // Format city name for lookup
  const formattedCity = city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  // Handle special city name cases
  const cityMap: Record<string, string> = {
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Kuwait City': 'Kuwait City'
  }
  
  const cityName = cityMap[formattedCity] || formattedCity
  const cityInfo = CITY_INFO[cityName] || CITY_INFO['Dubai'] // fallback
  const jobInfo = JOB_SPECIFIC_FAQS[jobTitle] || {
    requirements: 'Relevant experience, good work ethic, and professional attitude',
    benefits: 'Competitive salary, accommodation, transportation, medical insurance',
    growth: 'Team lead, supervisor, specialist roles',
    challenges: 'Adapting to local work culture, language communication, professional development'
  }
  
  const faqs = [
    {
      question: `How much does it cost to hire a ${jobTitle.toLowerCase()} in ${cityName}?`,
      answer: `The average salary for ${jobTitle.toLowerCase()}s in ${cityName} varies based on experience and qualifications. ${cityInfo.livingCost}. Most employers also provide ${cityInfo.accommodation}.`
    },
    {
      question: `What are the visa requirements for ${jobTitle.toLowerCase()}s in ${cityName}?`,
      answer: `${cityInfo.visaProcess}. For ${jobTitle.toLowerCase()} positions, specific requirements include: ${jobInfo.requirements}. The process typically takes 2-4 weeks.`
    },
    {
      question: `What benefits do ${jobTitle.toLowerCase()}s receive in ${cityName}?`,
      answer: `${jobTitle} workers in ${cityName} typically receive: ${jobInfo.benefits}. Additional benefits often include medical insurance, annual leave, and end-of-service gratuity as per ${cityInfo.country} labor law.`
    },
    {
      question: `What are the working conditions for ${jobTitle.toLowerCase()}s in ${cityName}?`,
      answer: `${cityInfo.workingHours}. ${jobTitle}s work in ${cityInfo.culture.toLowerCase()} environment. Transportation: ${cityInfo.transport}. Main challenges include: ${jobInfo.challenges}.`
    },
    {
      question: `How quickly can I hire a ${jobTitle.toLowerCase()} in ${cityName}?`,
      answer: `Most employers connect with suitable ${jobTitle.toLowerCase()} candidates within 24-48 hours. The complete hiring process, including visa processing and arrival, typically takes 2-6 weeks depending on the candidate's location and visa requirements.`
    },
    {
      question: `What career growth opportunities exist for ${jobTitle.toLowerCase()}s in ${cityName}?`,
      answer: `${cityName} offers excellent growth opportunities for ${jobTitle.toLowerCase()}s. Career progression includes: ${jobInfo.growth}. The ${cityInfo.country} market provides strong demand for skilled workers.`
    },
    {
      question: `Are all ${jobTitle.toLowerCase()} profiles verified in ${cityName}?`,
      answer: `Yes, all ${jobTitle.toLowerCase()} profiles on our platform are thoroughly verified with proper documentation, background checks, and skill assessments. We ensure compliance with ${cityInfo.country} regulations and employer requirements.`
    },
    {
      question: `What if I'm not satisfied with the ${jobTitle.toLowerCase()} I hired in ${cityName}?`,
      answer: `We provide full support throughout the hiring process. If you're not satisfied, we offer replacement candidates at no extra cost within the first 90 days. Our local support team in ${cityName} assists with any workplace integration issues.`
    }
  ]
  
  return faqs
}

export function getBasicCityInfo(city: string): {currency: string, country: string} {
  const formattedCity = city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const cityMap: Record<string, string> = {
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Kuwait City': 'Kuwait City'
  }
  
  const cityName = cityMap[formattedCity] || formattedCity
  const cityInfo = CITY_INFO[cityName] || CITY_INFO['Dubai']
  
  return {
    currency: cityInfo.currency,
    country: cityInfo.country
  }
}
