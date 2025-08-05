import { Worker, JobTitle, City, Country } from '../types'

// Gulf region countries and their cities
const GULF_REGIONS = {
  UAE: {
    currency: 'AED',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'] as City[]
  },
  Qatar: {
    currency: 'QAR', 
    cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen'] as City[]
  },
  'Saudi Arabia': {
    currency: 'SAR',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif'] as City[]
  },
  Oman: {
    currency: 'OMR',
    cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi'] as City[]
  },
  Kuwait: {
    currency: 'KWD',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya'] as City[]
  },
  Bahrain: {
    currency: 'BHD',
    cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'] as City[]
  }
}

// Currency exchange rates to AED (approximate)
const CURRENCY_RATES = {
  AED: 1,
  QAR: 1.02,
  SAR: 0.98,
  OMR: 9.5,
  KWD: 12.1,
  BHD: 9.8
}

// Diverse profile picture URLs using different services for uniqueness
const PROFILE_PICTURES = {
  male: [
    // Unsplash diverse male portraits
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=150&h=150&fit=crop&crop=face'
  ],
  female: [
    // Unsplash diverse female portraits
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1616766003956-3c9e2e8e3c25?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
  ]
}

// Diverse names representing Gulf region workforce
const WORKER_NAMES = {
  male: [
    // Arabic names
    'Ahmed Hassan', 'Mohammed Ali', 'Omar Al-Rashid', 'Hassan Abdullah', 'Abdul Rahman',
    'Fahad Al-Mansouri', 'Ali Al-Zahra', 'Salem Al-Rashid', 'Khalid Al-Otaibi', 'Anwar Sheikh',
    'Tariq Al-Mahmoud', 'Faisal Al-Harbi', 'Abdullah Al-Rashid', 'Yaseen Al-Zaabi', 'Mustafa Al-Hashemi',
    'Saeed Al-Mansoori', 'Hamad Al-Thani', 'Nasser Al-Kuwari', 'Khalifa Al-Marri', 'Sultan Al-Rashid',
    // South Asian names
    'Rajesh Kumar', 'Amit Singh', 'Sanjay Patel', 'Ravi Sharma', 'Deepak Kumar', 'Prakash Reddy',
    'Manish Gupta', 'Sunil Kumar', 'Vikram Singh', 'Naveen Kumar', 'Rohit Sharma', 'Rajesh Gupta',
    'Arun Kumar', 'Vinod Sharma', 'Mukesh Patel', 'Ashok Kumar', 'Manoj Singh', 'Ramesh Yadav',
    // Southeast Asian names
    'Jose Reyes', 'Carlos Santos', 'Juan Dela Cruz', 'Antonio Garcia', 'Miguel Rodriguez',
    'Francisco Martinez', 'Roberto Silva', 'Eduardo Fernandez', 'Ricardo Morales', 'Pedro Gonzalez',
    // African names
    'Emmanuel Okafor', 'Joseph Mensah', 'Michael Otieno', 'Samuel Mwangi', 'David Kimani',
    'James Ochieng', 'Peter Wanjiku', 'Francis Mutua', 'Daniel Kiprotich', 'Paul Njoroge'
  ],
  female: [
    // Arabic names
    'Fatima Al-Zahra', 'Aisha Abdullah', 'Zainab Hassan', 'Mariam Al-Rashid', 'Khadija Ahmed',
    'Sara Al-Mansouri', 'Noor Al-Hashemi', 'Lila Al-Otaibi', 'Huda Al-Mahmoud', 'Mona Al-Zaabi',
    'Amira Al-Rashid', 'Layla Al-Mansouri', 'Yasmin Al-Hashemi', 'Rania Al-Kuwari', 'Noura Al-Thani',
    // South Asian names
    'Priya Sharma', 'Sunita Devi', 'Divya Patel', 'Anita Singh', 'Rekha Kumari', 'Meena Gupta',
    'Geeta Sharma', 'Sita Patel', 'Asha Singh', 'Vandana Kumar', 'Kavita Yadav', 'Pooja Reddy',
    'Shanti Devi', 'Urmila Sharma', 'Radha Patel', 'Lata Singh', 'Manju Gupta', 'Savita Kumar',
    // Southeast Asian names
    'Maria Santos', 'Rose Garcia', 'Jennifer Lopez', 'Catherine David', 'Grace Emmanuel',
    'Christina Reyes', 'Anna Dela Cruz', 'Luz Rodriguez', 'Carmen Martinez', 'Elena Fernandez',
    'Gloria Morales', 'Rosario Gonzalez', 'Teresa Silva', 'Esperanza Torres', 'Dolores Ramos',
    // African names
    'Grace Wanjiku', 'Mary Njeri', 'Jane Muthoni', 'Alice Wambui', 'Ruth Nyokabi',
    'Sarah Wanjiru', 'Elizabeth Nyambura', 'Margaret Wairimu', 'Joyce Wangari', 'Agnes Njambi'
  ]
}

// Job-specific descriptions and salary ranges
const JOB_DETAILS: Record<JobTitle, {
  descriptions: string[],
  salaryRange: { min: number, max: number },
  languages: string[][],
  experience: { min: number, max: number }
}> = {
  'Driver': {
    descriptions: [
      'Professional driver with clean driving record and excellent navigation skills.',
      'Experienced driver specializing in VIP transportation and executive services.',
      'Reliable driver with extensive knowledge of local roads and traffic patterns.',
      'Licensed driver with experience in both personal and commercial driving.',
      'Courteous driver with excellent customer service and punctuality.',
      'Expert driver with defensive driving certification and safety focus.'
    ],
    salaryRange: { min: 2500, max: 4500 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Urdu', 'Arabic'],
      ['Arabic', 'English'],
      ['English', 'Hindi', 'Tamil'],
      ['English', 'Arabic', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Maid': {
    descriptions: [
      'Dedicated housekeeping professional with attention to detail and reliability.',
      'Experienced domestic helper skilled in all aspects of home maintenance.',
      'Professional housekeeper with expertise in deep cleaning and organization.',
      'Trustworthy domestic worker with excellent references and work ethic.',
      'Skilled home care assistant with experience in family households.',
      'Reliable cleaning professional with knowledge of modern cleaning techniques.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Tagalog', 'Arabic'],
      ['English', 'Hindi', 'Arabic'],
      ['Arabic', 'English'],
      ['English', 'Sinhala'],
      ['English', 'Bengali', 'Arabic']
    ],
    experience: { min: 1, max: 12 }
  },
  'Electrician': {
    descriptions: [
      'Certified electrician with extensive experience in residential and commercial projects.',
      'Licensed electrical technician specializing in installation and maintenance.',
      'Expert electrician with knowledge of modern electrical systems and safety codes.',
      'Professional electrician skilled in troubleshooting and repair work.',
      'Experienced electrical contractor with project management capabilities.',
      'Qualified electrician with expertise in industrial electrical systems.'
    ],
    salaryRange: { min: 3000, max: 6000 },
    languages: [
      ['English', 'Hindi', 'Tamil'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Hindi']
    ],
    experience: { min: 3, max: 20 }
  },
  'Plumber': {
    descriptions: [
      'Skilled plumber with expertise in pipe installation and water system maintenance.',
      'Professional plumbing technician specializing in residential and commercial work.',
      'Experienced plumber with knowledge of modern plumbing systems and regulations.',
      'Licensed plumber skilled in emergency repairs and routine maintenance.',
      'Expert plumbing contractor with project planning and execution skills.',
      'Certified plumber with specialization in bathroom and kitchen installations.'
    ],
    salaryRange: { min: 2800, max: 5500 },
    languages: [
      ['English', 'Hindi', 'Punjabi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English']
    ],
    experience: { min: 2, max: 18 }
  },
  'Cleaner': {
    descriptions: [
      'Professional cleaner with experience in office and residential cleaning.',
      'Dedicated cleaning specialist with knowledge of hygiene standards.',
      'Reliable cleaner skilled in deep cleaning and maintenance procedures.',
      'Experienced cleaning professional with attention to detail.',
      'Certified cleaner with expertise in sanitization and disinfection.',
      'Thorough cleaning technician with equipment operation skills.'
    ],
    salaryRange: { min: 1500, max: 3000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 10 }
  },
  'Carpenter': {
    descriptions: [
      'Skilled carpenter with expertise in furniture making and wood construction.',
      'Professional carpenter specializing in custom woodwork and installations.',
      'Experienced carpenter with knowledge of traditional and modern techniques.',
      'Master carpenter skilled in precision work and finishing.',
      'Expert woodworker with project management and design capabilities.',
      'Certified carpenter with specialization in residential and commercial projects.'
    ],
    salaryRange: { min: 2500, max: 5000 },
    languages: [
      ['English', 'Hindi', 'Punjabi'],
      ['English', 'Arabic'],
      ['English', 'Tamil', 'Hindi'],
      ['Arabic', 'English', 'Urdu']
    ],
    experience: { min: 2, max: 16 }
  },
  'Painter': {
    descriptions: [
      'Professional painter with expertise in interior and exterior painting.',
      'Skilled painting contractor with knowledge of modern techniques and materials.',
      'Experienced painter specializing in decorative and protective coatings.',
      'Expert painter with attention to detail and quality finishing.',
      'Certified painting technician with spray and brush application skills.',
      'Master painter with color consultation and surface preparation expertise.'
    ],
    salaryRange: { min: 2200, max: 4500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali', 'Hindi']
    ],
    experience: { min: 1, max: 14 }
  },
  'Security Guard': {
    descriptions: [
      'Professional security guard with military background and excellent vigilance skills.',
      'Licensed security officer with training in surveillance and emergency response.',
      'Experienced security personnel with strong observation and communication skills.',
      'Certified security guard with expertise in access control and monitoring.',
      'Dedicated security professional with crisis management capabilities.',
      'Trained security officer with customer service and safety protocols.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['Arabic', 'English'],
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Urdu'],
      ['Arabic', 'English', 'Hindi'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 12 }
  },
  'Cook': {
    descriptions: [
      'Professional chef with expertise in Middle Eastern and international cuisine.',
      'Experienced cook specializing in family meals and dietary requirements.',
      'Skilled chef with knowledge of food safety and kitchen management.',
      'Expert cook with experience in both home and commercial kitchens.',
      'Certified chef with specialization in healthy and nutritious cooking.',
      'Master cook with creativity in menu planning and food presentation.'
    ],
    salaryRange: { min: 2000, max: 4500 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Tagalog'],
      ['Arabic', 'English'],
      ['English', 'Tamil', 'Hindi'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Gardener': {
    descriptions: [
      'Professional landscaper with expertise in garden design and plant care.',
      'Experienced gardener skilled in irrigation systems and lawn maintenance.',
      'Expert horticulturist with knowledge of local plants and growing conditions.',
      'Certified landscaping professional with tree care and pruning skills.',
      'Skilled gardener with experience in both residential and commercial properties.',
      'Master gardener with pest control and soil management expertise.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali', 'Hindi']
    ],
    experience: { min: 1, max: 12 }
  },
  'Mechanic': {
    descriptions: [
      'Certified automotive mechanic with expertise in engine repair and maintenance.',
      'Professional mechanic specializing in European and Japanese vehicles.',
      'Experienced automotive technician with diagnostic and repair skills.',
      'Expert mechanic with knowledge of modern automotive systems.',
      'Licensed mechanic with specialization in preventive maintenance.',
      'Master automotive technician with electrical and mechanical expertise.'
    ],
    salaryRange: { min: 3000, max: 6500 },
    languages: [
      ['English', 'Hindi', 'Punjabi'],
      ['English', 'Arabic'],
      ['English', 'Tamil', 'Hindi'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 20 }
  },
  'Construction Worker': {
    descriptions: [
      'Experienced construction worker with skills in multiple building trades.',
      'Professional construction laborer with safety certification and equipment operation.',
      'Skilled construction worker with expertise in concrete and steel work.',
      'Dedicated construction professional with project completion focus.',
      'Certified construction worker with knowledge of building codes and standards.',
      'Expert construction laborer with teamwork and leadership capabilities.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil', 'Hindi']
    ],
    experience: { min: 1, max: 15 }
  },
  'Delivery Driver': {
    descriptions: [
      'Professional delivery driver with excellent route planning and time management.',
      'Experienced courier with knowledge of local areas and efficient delivery systems.',
      'Reliable delivery professional with customer service and package handling skills.',
      'Certified delivery driver with clean driving record and punctuality.',
      'Expert delivery specialist with GPS navigation and tracking system knowledge.',
      'Dedicated delivery professional with multi-drop and express delivery experience.'
    ],
    salaryRange: { min: 2200, max: 3800 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali'],
      ['English', 'Hindi', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  },
  'Warehouse Worker': {
    descriptions: [
      'Experienced warehouse operative with inventory management and logistics skills.',
      'Professional warehouse worker with forklift operation and safety certification.',
      'Skilled warehouse specialist with order fulfillment and stock control experience.',
      'Dedicated warehouse professional with shipping and receiving expertise.',
      'Certified warehouse operator with quality control and documentation skills.',
      'Expert warehouse worker with team coordination and supervisory capabilities.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Office Boy': {
    descriptions: [
      'Professional office assistant with administrative support and clerical skills.',
      'Experienced office helper with document management and communication abilities.',
      'Reliable office support staff with customer service and organizational skills.',
      'Dedicated office assistant with multitasking and time management capabilities.',
      'Skilled office worker with filing, copying, and basic computer knowledge.',
      'Professional office support with mail handling and appointment scheduling skills.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Arabic'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 8 }
  },
  'AC Technician': {
    descriptions: [
      'Certified AC technician with expertise in installation and repair of cooling systems.',
      'Professional HVAC specialist with knowledge of modern air conditioning technology.',
      'Experienced AC mechanic with troubleshooting and preventive maintenance skills.',
      'Expert cooling system technician with refrigeration and electrical knowledge.',
      'Licensed AC professional with energy efficiency and system optimization expertise.',
      'Master HVAC technician with commercial and residential system experience.'
    ],
    salaryRange: { min: 2800, max: 5500 },
    languages: [
      ['English', 'Hindi', 'Tamil'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu']
    ],
    experience: { min: 2, max: 15 }
  },
  'Welder': {
    descriptions: [
      'Certified welder with expertise in arc welding and metal fabrication.',
      'Professional welding specialist with knowledge of various welding techniques.',
      'Experienced welder with structural and pipeline welding capabilities.',
      'Expert metal worker with precision welding and quality control skills.',
      'Licensed welder with safety certification and project management experience.',
      'Master welder with specialization in stainless steel and aluminum work.'
    ],
    salaryRange: { min: 3200, max: 6000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali', 'Hindi']
    ],
    experience: { min: 3, max: 18 }
  },
  'Mason': {
    descriptions: [
      'Skilled mason with expertise in brickwork and stone construction.',
      'Professional masonry worker with knowledge of traditional and modern techniques.',
      'Experienced mason specializing in decorative and structural stonework.',
      'Expert mason with precision work and architectural restoration skills.',
      'Certified masonry professional with project planning and execution capabilities.',
      'Master mason with specialization in heritage and luxury construction.'
    ],
    salaryRange: { min: 2500, max: 4800 },
    languages: [
      ['English', 'Hindi', 'Punjabi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 2, max: 16 }
  },
  'Tile Setter': {
    descriptions: [
      'Professional tile installer with expertise in ceramic and natural stone work.',
      'Experienced tile setter with knowledge of modern installation techniques.',
      'Skilled tiling specialist with precision cutting and pattern matching abilities.',
      'Expert tile worker with bathroom and kitchen installation experience.',
      'Certified tile installer with waterproofing and surface preparation skills.',
      'Master tile setter with decorative and commercial tiling expertise.'
    ],
    salaryRange: { min: 2300, max: 4500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 14 }
  },
  'Roofer': {
    descriptions: [
      'Professional roofer with expertise in various roofing materials and techniques.',
      'Experienced roofing contractor with knowledge of waterproofing and insulation.',
      'Skilled roofer specializing in residential and commercial roof installation.',
      'Expert roofing professional with safety certification and height work experience.',
      'Certified roofer with storm damage repair and maintenance capabilities.',
      'Master roofer with specialization in energy-efficient roofing systems.'
    ],
    salaryRange: { min: 2800, max: 5200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil', 'Hindi']
    ],
    experience: { min: 2, max: 15 }
  },
  'Glazier': {
    descriptions: [
      'Professional glazier with expertise in glass installation and window repair.',
      'Experienced glass technician with knowledge of modern glazing systems.',
      'Skilled glazier specializing in commercial and residential glass work.',
      'Expert glass installer with safety protocols and precision cutting skills.',
      'Certified glazier with curtain wall and structural glazing experience.',
      'Master glazier with specialization in energy-efficient glass systems.'
    ],
    salaryRange: { min: 2600, max: 4800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 12 }
  },
  'Heavy Equipment Operator': {
    descriptions: [
      'Certified heavy equipment operator with expertise in excavators and bulldozers.',
      'Professional machinery operator with safety certification and maintenance knowledge.',
      'Experienced equipment operator specializing in construction and earthmoving.',
      'Expert heavy machinery specialist with precision operation and safety skills.',
      'Licensed equipment operator with project management and team coordination.',
      'Master operator with specialization in complex construction equipment.'
    ],
    salaryRange: { min: 3500, max: 7000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 20 }
  },
  'Crane Operator': {
    descriptions: [
      'Certified crane operator with expertise in tower and mobile crane operation.',
      'Professional crane specialist with safety certification and precision lifting skills.',
      'Experienced crane operator with knowledge of load calculations and rigging.',
      'Expert crane professional with high-rise construction and heavy lifting experience.',
      'Licensed crane operator with signal recognition and communication protocols.',
      'Master crane operator with specialization in complex lifting operations.'
    ],
    salaryRange: { min: 4000, max: 8000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 4, max: 22 }
  },
  'Forklift Operator': {
    descriptions: [
      'Certified forklift operator with warehouse and logistics experience.',
      'Professional material handling specialist with safety and efficiency focus.',
      'Experienced forklift driver with inventory management and loading skills.',
      'Expert warehouse operator with equipment maintenance and inspection knowledge.',
      'Licensed forklift professional with multi-equipment operation capabilities.',
      'Skilled material handling expert with productivity and safety optimization.'
    ],
    salaryRange: { min: 2200, max: 4000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Steel Fixer': {
    descriptions: [
      'Professional steel fixer with expertise in reinforcement and structural work.',
      'Experienced rebar installer with knowledge of construction drawings and specifications.',
      'Skilled steel worker specializing in concrete reinforcement and formwork.',
      'Expert steel fixer with precision measurement and cutting capabilities.',
      'Certified reinforcement specialist with safety protocols and quality standards.',
      'Master steel fixer with high-rise and infrastructure project experience.'
    ],
    salaryRange: { min: 2800, max: 5000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil', 'Hindi']
    ],
    experience: { min: 2, max: 15 }
  },
  'Pipe Fitter': {
    descriptions: [
      'Certified pipe fitter with expertise in industrial and commercial piping systems.',
      'Professional pipe installer with knowledge of various materials and joining methods.',
      'Experienced pipe fitter specializing in HVAC and process piping.',
      'Expert piping specialist with blueprint reading and layout skills.',
      'Licensed pipe fitter with welding and fabrication capabilities.',
      'Master pipe fitter with specialization in high-pressure and specialty systems.'
    ],
    salaryRange: { min: 3200, max: 6200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 18 }
  },
  'HVAC Technician': {
    descriptions: [
      'Certified HVAC technician with expertise in heating and cooling system maintenance.',
      'Professional climate control specialist with installation and repair experience.',
      'Experienced HVAC mechanic with knowledge of energy-efficient systems.',
      'Expert air conditioning technician with refrigeration and electrical skills.',
      'Licensed HVAC professional with preventive maintenance and troubleshooting.',
      'Master HVAC technician with commercial and industrial system expertise.'
    ],
    salaryRange: { min: 3000, max: 6000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 16 }
  },
  'Concrete Mixer': {
    descriptions: [
      'Professional concrete mixer with expertise in batching and quality control.',
      'Experienced concrete specialist with knowledge of mix designs and additives.',
      'Skilled concrete worker with pump operation and placement experience.',
      'Expert concrete professional with finishing and curing techniques.',
      'Certified concrete mixer with safety protocols and equipment operation.',
      'Master concrete specialist with large-scale project and quality assurance experience.'
    ],
    salaryRange: { min: 2000, max: 3800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Excavator Operator': {
    descriptions: [
      'Certified excavator operator with expertise in earthmoving and site preparation.',
      'Professional excavation specialist with safety certification and precision digging.',
      'Experienced excavator driver with utility installation and trenching skills.',
      'Expert earthmoving operator with grading and demolition capabilities.',
      'Licensed excavator professional with maintenance and inspection knowledge.',
      'Master excavator operator with complex site work and project coordination.'
    ],
    salaryRange: { min: 3200, max: 6500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 18 }
  },
  'Road Worker': {
    descriptions: [
      'Professional road construction worker with asphalt and concrete experience.',
      'Experienced highway maintenance specialist with safety and traffic control.',
      'Skilled road worker with equipment operation and material handling abilities.',
      'Expert pavement professional with marking and signage installation skills.',
      'Certified road construction worker with quality control and project completion.',
      'Master road worker with infrastructure maintenance and repair expertise.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Building Maintenance': {
    descriptions: [
      'Professional building maintenance technician with multi-trade capabilities.',
      'Experienced facility maintenance worker with preventive and corrective maintenance.',
      'Skilled maintenance specialist with electrical, plumbing, and HVAC knowledge.',
      'Expert building technician with troubleshooting and emergency repair skills.',
      'Certified maintenance professional with safety protocols and documentation.',
      'Master maintenance technician with system optimization and energy efficiency.'
    ],
    salaryRange: { min: 2500, max: 4500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Pool Cleaner': {
    descriptions: [
      'Professional pool maintenance technician with chemical balancing expertise.',
      'Experienced pool cleaner with equipment operation and water quality management.',
      'Skilled pool specialist with filtration system maintenance and repair.',
      'Expert pool technician with safety protocols and customer service.',
      'Certified pool maintenance professional with troubleshooting capabilities.',
      'Master pool cleaner with commercial and residential pool experience.'
    ],
    salaryRange: { min: 1600, max: 3000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 8 }
  },
  'Landscaper': {
    descriptions: [
      'Professional landscaper with design and installation expertise.',
      'Experienced landscape specialist with plant knowledge and irrigation systems.',
      'Skilled landscaping professional with hardscape and softscape capabilities.',
      'Expert landscape technician with maintenance and seasonal care skills.',
      'Certified landscaper with project management and client consultation.',
      'Master landscaper with creative design and sustainable practice expertise.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 12 }
  },
  'Window Cleaner': {
    descriptions: [
      'Professional window cleaner with high-rise and commercial building experience.',
      'Experienced window cleaning specialist with safety equipment and techniques.',
      'Skilled window cleaner with residential and office building expertise.',
      'Expert window washing professional with quality standards and efficiency.',
      'Certified window cleaner with access equipment and safety protocols.',
      'Master window cleaning technician with specialized building and facade work.'
    ],
    salaryRange: { min: 1400, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Pest Control Worker': {
    descriptions: [
      'Certified pest control technician with integrated pest management expertise.',
      'Professional exterminator with knowledge of pesticide application and safety.',
      'Experienced pest control specialist with inspection and treatment protocols.',
      'Expert pest management technician with customer education and prevention.',
      'Licensed pest control professional with commercial and residential experience.',
      'Master pest control technician with specialty treatment and monitoring systems.'
    ],
    salaryRange: { min: 2200, max: 4200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 10 }
  },
  'Laundry Worker': {
    descriptions: [
      'Professional laundry worker with commercial equipment operation experience.',
      'Experienced laundry specialist with fabric care and stain removal expertise.',
      'Skilled laundry technician with sorting, washing, and finishing capabilities.',
      'Expert laundry professional with quality control and customer service.',
      'Certified laundry worker with industrial equipment and safety protocols.',
      'Master laundry specialist with dry cleaning and specialty garment care.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tagalog']
    ],
    experience: { min: 1, max: 8 }
  },
  'Dishwasher': {
    descriptions: [
      'Professional dishwasher with commercial kitchen and sanitation experience.',
      'Experienced kitchen assistant with dish cleaning and equipment maintenance.',
      'Skilled dishwashing specialist with hygiene standards and efficiency.',
      'Expert kitchen support worker with multi-tasking and teamwork abilities.',
      'Certified dishwasher with food safety knowledge and work ethic.',
      'Reliable kitchen professional with speed and quality in dish cleaning operations.'
    ],
    salaryRange: { min: 1300, max: 2200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Food Preparation Worker': {
    descriptions: [
      'Professional food prep worker with kitchen safety and sanitation expertise.',
      'Experienced food preparation specialist with cutting and portioning skills.',
      'Skilled kitchen assistant with food handling and storage knowledge.',
      'Expert food prep technician with efficiency and quality standards.',
      'Certified food preparation worker with menu knowledge and teamwork.',
      'Reliable kitchen professional with speed and accuracy in food preparation.'
    ],
    salaryRange: { min: 1600, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Kitchen Helper': {
    descriptions: [
      'Professional kitchen helper with food service and cleaning expertise.',
      'Experienced kitchen assistant with multi-tasking and support capabilities.',
      'Skilled kitchen worker with food preparation and equipment maintenance.',
      'Expert kitchen support staff with hygiene standards and teamwork.',
      'Certified kitchen helper with food safety and customer service.',
      'Reliable kitchen professional with adaptability and strong work ethic.'
    ],
    salaryRange: { min: 1400, max: 2500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Waiter': {
    descriptions: [
      'Professional waiter with fine dining and customer service expertise.',
      'Experienced server with menu knowledge and hospitality skills.',
      'Skilled waiter with multi-table management and communication abilities.',
      'Expert restaurant server with wine service and special event experience.',
      'Certified waiter with food safety knowledge and professional presentation.',
      'Master server with leadership capabilities and training experience.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['Arabic', 'English', 'French'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  },
  'Barista': {
    descriptions: [
      'Professional barista with specialty coffee preparation and latte art skills.',
      'Experienced coffee specialist with brewing techniques and customer service.',
      'Skilled barista with espresso machine operation and beverage knowledge.',
      'Expert coffee professional with menu development and quality standards.',
      'Certified barista with coffee education and training capabilities.',
      'Master coffee specialist with roasting knowledge and shop management.'
    ],
    salaryRange: { min: 1700, max: 3200 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Arabic', 'French'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Cashier': {
    descriptions: [
      'Professional cashier with point-of-sale systems and customer service expertise.',
      'Experienced retail cashier with money handling and transaction processing.',
      'Skilled cashier with multi-lingual communication and problem-solving abilities.',
      'Expert cashier with inventory knowledge and sales support capabilities.',
      'Certified cashier with loss prevention and accuracy in financial transactions.',
      'Reliable cashier with speed and professionalism in customer interactions.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 8 }
  },
  'Shop Assistant': {
    descriptions: [
      'Professional shop assistant with retail sales and customer service expertise.',
      'Experienced retail worker with product knowledge and merchandising skills.',
      'Skilled shop assistant with inventory management and cash handling.',
      'Expert retail professional with visual merchandising and sales techniques.',
      'Certified shop assistant with customer relations and problem resolution.',
      'Reliable retail worker with multi-tasking and communication abilities.'
    ],
    salaryRange: { min: 1600, max: 3000 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Inventory Clerk': {
    descriptions: [
      'Professional inventory clerk with stock management and data entry expertise.',
      'Experienced warehouse clerk with inventory tracking and reporting skills.',
      'Skilled inventory specialist with cycle counting and accuracy standards.',
      'Expert inventory professional with system knowledge and process improvement.',
      'Certified inventory clerk with quality control and documentation protocols.',
      'Reliable inventory worker with attention to detail and organizational skills.'
    ],
    salaryRange: { min: 1700, max: 3200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Packer': {
    descriptions: [
      'Professional packer with packaging standards and quality control expertise.',
      'Experienced packing specialist with speed and accuracy in product packaging.',
      'Skilled packer with material handling and shipping preparation capabilities.',
      'Expert packing professional with equipment operation and safety protocols.',
      'Certified packer with inventory management and order fulfillment skills.',
      'Reliable packing worker with efficiency and attention to packaging details.'
    ],
    salaryRange: { min: 1400, max: 2600 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Loading Worker': {
    descriptions: [
      'Professional loading worker with heavy lifting and material handling expertise.',
      'Experienced loader with truck loading and equipment operation skills.',
      'Skilled loading specialist with safety protocols and efficiency standards.',
      'Expert loading professional with dock operations and shipping procedures.',
      'Certified loading worker with teamwork and communication capabilities.',
      'Reliable loading specialist with physical stamina and work coordination.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Moving Helper': {
    descriptions: [
      'Professional moving helper with furniture handling and packing expertise.',
      'Experienced moving assistant with heavy lifting and customer service skills.',
      'Skilled moving worker with protective wrapping and loading techniques.',
      'Expert moving professional with efficiency and care in item transport.',
      'Certified moving helper with safety protocols and teamwork capabilities.',
      'Reliable moving specialist with physical strength and problem-solving skills.'
    ],
    salaryRange: { min: 1600, max: 3000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Cleaning Supervisor': {
    descriptions: [
      'Professional cleaning supervisor with team management and quality control expertise.',
      'Experienced cleaning manager with staff training and operational oversight.',
      'Skilled cleaning supervisor with scheduling and resource management capabilities.',
      'Expert cleaning professional with customer relations and problem resolution.',
      'Certified cleaning supervisor with safety protocols and compliance standards.',
      'Master cleaning manager with multi-site operations and performance optimization.'
    ],
    salaryRange: { min: 2500, max: 4500 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 15 }
  },
  'Maintenance Supervisor': {
    descriptions: [
      'Professional maintenance supervisor with team leadership and technical expertise.',
      'Experienced maintenance manager with preventive maintenance and emergency response.',
      'Skilled maintenance supervisor with multi-trade knowledge and project coordination.',
      'Expert maintenance professional with budget management and vendor relations.',
      'Certified maintenance supervisor with safety compliance and training capabilities.',
      'Master maintenance manager with facility optimization and strategic planning.'
    ],
    salaryRange: { min: 3500, max: 6500 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 5, max: 20 }
  },
  // NEW JOB TITLES - Domestic & Personal Care Workers
  'Nanny (Childcare Worker)': {
    descriptions: [
      'Professional nanny with extensive childcare experience and child development knowledge.',
      'Experienced childcare worker with first aid certification and educational activities.',
      'Dedicated nanny with excellent references and nurturing care approach.',
      'Expert childcare professional with multilingual communication skills.',
      'Certified nanny with special needs experience and behavioral management.',
      'Loving childcare specialist with creative activities and safety consciousness.'
    ],
    salaryRange: { min: 2500, max: 5000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'French', 'Arabic'],
      ['English', 'Sinhala']
    ],
    experience: { min: 2, max: 15 }
  },
  'Housemaid': {
    descriptions: [
      'Professional housemaid with comprehensive home cleaning and maintenance skills.',
      'Experienced domestic helper with excellent organizational and time management.',
      'Reliable housemaid with attention to detail and trustworthy character.',
      'Skilled home care professional with laundry and ironing expertise.',
      'Dedicated housemaid with cooking abilities and household management.',
      'Expert domestic worker with childcare support and elderly care experience.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'Sinhala'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 12 }
  },
  'Cook (Home-based)': {
    descriptions: [
      'Professional home cook with expertise in Middle Eastern and international cuisine.',
      'Experienced family cook with dietary requirements and healthy meal planning.',
      'Skilled home chef with food safety knowledge and kitchen management.',
      'Expert cook with traditional and modern cooking techniques.',
      'Certified cook with special diet preparation and nutrition awareness.',
      'Master home chef with creative menu planning and presentation skills.'
    ],
    salaryRange: { min: 2200, max: 4500 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Tagalog'],
      ['English', 'Tamil'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Elderly Caregiver': {
    descriptions: [
      'Compassionate elderly caregiver with medical assistance and companionship skills.',
      'Professional senior care specialist with medication management experience.',
      'Experienced elderly care worker with mobility assistance and safety protocols.',
      'Dedicated caregiver with dementia care training and patience.',
      'Certified elderly care professional with first aid and emergency response.',
      'Expert senior companion with emotional support and activity planning.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'Sinhala'],
      ['Arabic', 'English']
    ],
    experience: { min: 2, max: 15 }
  },
  'Babysitter': {
    descriptions: [
      'Reliable babysitter with flexible scheduling and child engagement skills.',
      'Experienced childcare provider with homework help and activity planning.',
      'Professional babysitter with safety consciousness and emergency preparedness.',
      'Caring babysitter with creative play and educational activities.',
      'Trusted childcare assistant with excellent references and communication.',
      'Expert babysitter with infant care and toddler management experience.'
    ],
    salaryRange: { min: 1500, max: 3000 }, // Adjusted for monthly rates
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'French'],
      ['Arabic', 'English']
    ],
    experience: { min: 1, max: 8 }
  },
  'Domestic Helper': {
    descriptions: [
      'Versatile domestic helper with comprehensive household management skills.',
      'Experienced home assistant with cleaning, cooking, and organizing abilities.',
      'Reliable domestic worker with pet care and garden maintenance experience.',
      'Professional household helper with laundry and ironing expertise.',
      'Dedicated domestic assistant with elderly and child care support.',
      'Expert home helper with grocery shopping and meal preparation skills.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'Sinhala'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 12 }
  },
  'Governess (Live-in Tutor/Nanny)': {
    descriptions: [
      'Professional governess with teaching qualifications and childcare expertise.',
      'Experienced live-in tutor with curriculum development and educational support.',
      'Skilled governess with language instruction and cultural education.',
      'Expert educational nanny with homework supervision and skill development.',
      'Certified governess with special needs education and behavioral guidance.',
      'Master educator with homeschooling experience and academic excellence.'
    ],
    salaryRange: { min: 4000, max: 8000 },
    languages: [
      ['English', 'Arabic', 'French'],
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'German'],
      ['English', 'Spanish']
    ],
    experience: { min: 3, max: 18 }
  },
  'Housekeeper (Residential)': {
    descriptions: [
      'Professional residential housekeeper with property management experience.',
      'Experienced housekeeper with deep cleaning and maintenance protocols.',
      'Skilled residential cleaner with inventory management and organization.',
      'Expert housekeeper with luxury home care and confidentiality.',
      'Certified housekeeper with eco-friendly cleaning and safety standards.',
      'Master housekeeper with staff coordination and quality assurance.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'Sinhala'],
      ['Arabic', 'English']
    ],
    experience: { min: 2, max: 15 }
  },
  'Personal Attendant': {
    descriptions: [
      'Professional personal attendant with VIP service and discretion.',
      'Experienced personal assistant with scheduling and lifestyle management.',
      'Skilled attendant with travel coordination and personal care.',
      'Expert personal helper with wardrobe management and event planning.',
      'Dedicated personal attendant with security awareness and confidentiality.',
      'Premium personal assistant with luxury service and protocol knowledge.'
    ],
    salaryRange: { min: 3000, max: 6000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'French'],
      ['English', 'German'],
      ['Arabic', 'English']
    ],
    experience: { min: 3, max: 15 }
  },
  'Live-in Maid': {
    descriptions: [
      'Dedicated live-in maid with 24/7 household support and reliability.',
      'Experienced residential maid with cooking and childcare assistance.',
      'Professional live-in helper with elderly care and pet management.',
      'Reliable full-time maid with cleaning and organizing expertise.',
      'Skilled live-in domestic worker with laundry and maintenance.',
      'Expert residential assistant with garden care and household management.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Tagalog'],
      ['English', 'Hindi'],
      ['English', 'Sinhala'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  // Cleaning & Maintenance category
  'Housekeeping Staff': {
    descriptions: [
      'Professional housekeeping staff with hotel and residential cleaning expertise.',
      'Experienced housekeeping professional with deep cleaning and maintenance.',
      'Skilled housekeeping worker with laundry and room preparation.',
      'Expert housekeeping staff with inventory management and quality standards.',
      'Certified housekeeping professional with hygiene protocols and efficiency.',
      'Master housekeeping specialist with training and supervisory capabilities.'
    ],
    salaryRange: { min: 1600, max: 3200 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Tagalog'],
      ['English', 'Bengali'],
      ['Arabic', 'English']
    ],
    experience: { min: 1, max: 10 }
  },
  'Janitor': {
    descriptions: [
      'Professional janitor with commercial and institutional cleaning expertise.',
      'Experienced custodial worker with floor care and maintenance protocols.',
      'Skilled janitor with equipment operation and supply management.',
      'Expert custodian with safety procedures and emergency response.',
      'Certified janitor with green cleaning and environmental consciousness.',
      'Master custodial professional with team coordination and quality assurance.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Building Maintenance Worker': {
    descriptions: [
      'Professional building maintenance worker with multi-trade capabilities.',
      'Experienced facility worker with electrical and plumbing basics.',
      'Skilled maintenance worker with HVAC and mechanical systems.',
      'Expert building technician with preventive maintenance programs.',
      'Certified maintenance worker with safety compliance and documentation.',
      'Master building specialist with emergency repairs and troubleshooting.'
    ],
    salaryRange: { min: 2200, max: 4200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 12 }
  },
  'Car Wash Attendant': {
    descriptions: [
      'Professional car wash attendant with detailing and customer service.',
      'Experienced auto detailer with interior and exterior cleaning expertise.',
      'Skilled car wash worker with equipment operation and quality standards.',
      'Expert detailing specialist with paint protection and finishing.',
      'Certified car wash professional with eco-friendly products and methods.',
      'Master detailing technician with luxury vehicle care and restoration.'
    ],
    salaryRange: { min: 1400, max: 2600 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Office Cleaner': {
    descriptions: [
      'Professional office cleaner with commercial cleaning and sanitation.',
      'Experienced office custodian with flexible scheduling and reliability.',
      'Skilled office cleaner with computer equipment and furniture care.',
      'Expert commercial cleaner with security protocols and confidentiality.',
      'Certified office cleaning professional with green cleaning methods.',
      'Master office custodian with quality standards and client satisfaction.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tagalog']
    ],
    experience: { min: 1, max: 8 }
  },
  // Construction & Infrastructure (Additional)
  'Construction Laborer': {
    descriptions: [
      'Experienced construction laborer with foundation and structural work expertise.',
      'Professional construction worker with safety certification and equipment operation.',
      'Skilled laborer with concrete work and reinforcement installation.',
      'Dedicated construction professional with teamwork and reliability.',
      'Certified construction worker with building codes and quality standards.',
      'Expert laborer with residential and commercial construction experience.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic', 'Urdu'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 15 }
  },
  'Scaffold Worker': {
    descriptions: [
      'Professional scaffold worker with height safety and assembly expertise.',
      'Experienced scaffolding specialist with structural assembly knowledge.',
      'Skilled scaffold erector with safety protocols and quality standards.',
      'Expert scaffolding professional with complex structure assembly.',
      'Certified scaffold worker with inspection and maintenance capabilities.',
      'Master scaffolding technician with project planning and safety management.'
    ],
    salaryRange: { min: 2500, max: 4500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Tamil']
    ],
    experience: { min: 2, max: 15 }
  },
  'Site Supervisor': {
    descriptions: [
      'Experienced site supervisor with project management and team leadership.',
      'Professional construction supervisor with safety compliance and quality control.',
      'Skilled site manager with scheduling and resource coordination.',
      'Expert construction supervisor with technical knowledge and problem-solving.',
      'Certified site supervisor with budget management and client relations.',
      'Master project supervisor with multi-trade coordination and delivery excellence.'
    ],
    salaryRange: { min: 4000, max: 7500 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 5, max: 20 }
  },
  'Road Construction Worker': {
    descriptions: [
      'Professional road construction worker with asphalt and concrete expertise.',
      'Experienced highway worker with traffic safety and equipment operation.',
      'Skilled road laborer with paving and marking installation.',
      'Expert road construction professional with quality control standards.',
      'Certified road worker with infrastructure maintenance and repair.',
      'Master road construction specialist with project completion excellence.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  // Mechanical & Technical (Additional)
  'Auto Mechanic': {
    descriptions: [
      'Certified automotive mechanic with engine repair and diagnostic expertise.',
      'Professional car mechanic with European and Japanese vehicle specialization.',
      'Experienced auto technician with electrical and mechanical systems.',
      'Expert mechanic with preventive maintenance and customer service.',
      'Licensed automotive professional with modern technology and tools.',
      'Master mechanic with transmission and engine overhaul capabilities.'
    ],
    salaryRange: { min: 3000, max: 6500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English', 'Urdu'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 20 }
  },
  'Diesel Mechanic': {
    descriptions: [
      'Professional diesel mechanic with heavy machinery and truck expertise.',
      'Experienced diesel technician with engine overhaul and repair skills.',
      'Skilled diesel specialist with hydraulic and electrical systems.',
      'Expert diesel mechanic with preventive maintenance programs.',
      'Certified diesel professional with industrial equipment experience.',
      'Master diesel technician with troubleshooting and performance optimization.'
    ],
    salaryRange: { min: 3200, max: 6800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 18 }
  },
  'Machine Operator': {
    descriptions: [
      'Skilled machine operator with production equipment and quality control.',
      'Experienced industrial operator with safety protocols and efficiency.',
      'Professional machine technician with maintenance and troubleshooting.',
      'Expert operator with multi-machine capabilities and precision work.',
      'Certified machine specialist with automation and programming knowledge.',
      'Master operator with productivity optimization and training abilities.'
    ],
    salaryRange: { min: 2500, max: 5000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'CNC Machine Operator': {
    descriptions: [
      'Professional CNC operator with precision machining and programming skills.',
      'Experienced CNC technician with CAD/CAM software and quality control.',
      'Skilled CNC specialist with setup and operation of complex machinery.',
      'Expert CNC operator with tight tolerance and material expertise.',
      'Certified CNC professional with maintenance and troubleshooting.',
      'Master CNC technician with programming and optimization capabilities.'
    ],
    salaryRange: { min: 3500, max: 7000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 18 }
  },
  'Fitter': {
    descriptions: [
      'Skilled fitter with mechanical assembly and precision fitting expertise.',
      'Professional pipe fitter with industrial and commercial installations.',
      'Experienced mechanical fitter with blueprint reading and fabrication.',
      'Expert fitter with welding and machinery assembly capabilities.',
      'Certified fitter with quality standards and safety protocols.',
      'Master fitter with complex assembly and troubleshooting skills.'
    ],
    salaryRange: { min: 2800, max: 5500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 16 }
  },
  'Maintenance Technician': {
    descriptions: [
      'Professional maintenance technician with preventive and corrective maintenance.',
      'Experienced maintenance specialist with electrical and mechanical systems.',
      'Skilled technician with equipment troubleshooting and repair.',
      'Expert maintenance professional with HVAC and plumbing knowledge.',
      'Certified technician with safety compliance and documentation.',
      'Master maintenance specialist with facility optimization and planning.'
    ],
    salaryRange: { min: 2800, max: 5200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Elevator Technician': {
    descriptions: [
      'Certified elevator technician with installation and maintenance expertise.',
      'Professional lift specialist with safety systems and regulations.',
      'Experienced elevator mechanic with electrical and mechanical skills.',
      'Expert elevator technician with modernization and troubleshooting.',
      'Licensed elevator professional with emergency repair capabilities.',
      'Master elevator specialist with complex systems and project management.'
    ],
    salaryRange: { min: 4000, max: 8000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 18 }
  },
  'Lathe Machine Operator': {
    descriptions: [
      'Skilled lathe operator with precision turning and machining expertise.',
      'Professional lathe technician with manual and CNC operation.',
      'Experienced operator with cutting tools and measurement precision.',
      'Expert lathe specialist with material knowledge and quality control.',
      'Certified lathe operator with setup and programming capabilities.',
      'Master lathe technician with complex turning and finishing operations.'
    ],
    salaryRange: { min: 3000, max: 6000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 16 }
  },
  // Manufacturing & Factory
  'Factory Worker': {
    descriptions: [
      'Experienced factory worker with production line and quality control expertise.',
      'Professional manufacturing worker with safety protocols and efficiency.',
      'Skilled factory operator with equipment handling and maintenance.',
      'Dedicated production worker with teamwork and reliability.',
      'Certified factory professional with quality standards and procedures.',
      'Expert manufacturing specialist with process improvement and training.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  },
  'Assembly Line Worker': {
    descriptions: [
      'Professional assembly worker with production efficiency and quality focus.',
      'Experienced line worker with component assembly and inspection.',
      'Skilled assembly operator with manual dexterity and attention to detail.',
      'Expert production worker with team coordination and pace management.',
      'Certified assembly professional with safety protocols and procedures.',
      'Master assembly specialist with training and process optimization.'
    ],
    salaryRange: { min: 1700, max: 3200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Warehouse Associate': {
    descriptions: [
      'Experienced warehouse associate with inventory management and logistics.',
      'Professional warehouse worker with forklift operation and safety.',
      'Skilled warehouse specialist with order fulfillment and accuracy.',
      'Expert warehouse professional with shipping and receiving.',
      'Certified warehouse operator with quality control and documentation.',
      'Master warehouse specialist with team coordination and efficiency.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Quality Checker': {
    descriptions: [
      'Professional quality checker with inspection and testing expertise.',
      'Experienced quality inspector with standards compliance and documentation.',
      'Skilled quality control specialist with measurement and analysis.',
      'Expert quality professional with process improvement and training.',
      'Certified quality inspector with statistical analysis and reporting.',
      'Master quality specialist with audit and certification experience.'
    ],
    salaryRange: { min: 2200, max: 4200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 12 }
  },
  'Production Supervisor': {
    descriptions: [
      'Experienced production supervisor with team leadership and efficiency.',
      'Professional manufacturing supervisor with quality control and safety.',
      'Skilled production manager with scheduling and resource optimization.',
      'Expert manufacturing supervisor with process improvement and training.',
      'Certified production leader with budget management and reporting.',
      'Master production supervisor with lean manufacturing and excellence.'
    ],
    salaryRange: { min: 3500, max: 6500 },
    languages: [
      ['English', 'Hindi', 'Arabic'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 4, max: 18 }
  },
  'Fabricator': {
    descriptions: [
      'Skilled fabricator with metal working and welding expertise.',
      'Professional fabrication specialist with blueprint reading and cutting.',
      'Experienced fabricator with precision assembly and finishing.',
      'Expert metal worker with custom fabrication and installation.',
      'Certified fabricator with quality standards and safety protocols.',
      'Master fabrication technician with project management and training.'
    ],
    salaryRange: { min: 2800, max: 5500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 15 }
  },
  'Loader/Unloader': {
    descriptions: [
      'Professional loader with material handling and safety expertise.',
      'Experienced loading worker with truck loading and equipment operation.',
      'Skilled loader specialist with efficiency and quality standards.',
      'Expert loading professional with dock operations and coordination.',
      'Certified loading worker with teamwork and communication.',
      'Master loading specialist with training and process optimization.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  // Transport & Logistics
  'Truck Driver': {
    descriptions: [
      'Professional truck driver with long-haul and local delivery experience.',
      'Experienced heavy vehicle driver with safety certification and navigation.',
      'Skilled truck operator with cargo handling and route optimization.',
      'Expert commercial driver with customer service and time management.',
      'Licensed truck professional with vehicle maintenance and inspection.',
      'Master truck driver with training and fleet management experience.'
    ],
    salaryRange: { min: 2500, max: 4500 },
    languages: [
      ['English', 'Arabic', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali'],
      ['English', 'Hindi', 'Tamil']
    ],
    experience: { min: 2, max: 15 }
  },
  'Bus Driver': {
    descriptions: [
      'Professional bus driver with passenger safety and route knowledge.',
      'Experienced public transport driver with customer service skills.',
      'Skilled bus operator with defensive driving and emergency procedures.',
      'Expert transport professional with schedule management and reliability.',
      'Licensed bus driver with disability assistance and communication.',
      'Master bus operator with training and supervisory capabilities.'
    ],
    salaryRange: { min: 2200, max: 4000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 12 }
  },
  'Light Vehicle Driver': {
    descriptions: [
      'Professional light vehicle driver with city navigation and efficiency.',
      'Experienced car driver with customer service and punctuality.',
      'Skilled light vehicle operator with delivery and passenger service.',
      'Expert driver with route planning and vehicle maintenance.',
      'Licensed light vehicle professional with safety and reliability.',
      'Master driver with training and fleet coordination experience.'
    ],
    salaryRange: { min: 2000, max: 3800 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 10 }
  },
  'Logistics Assistant': {
    descriptions: [
      'Professional logistics assistant with supply chain and coordination.',
      'Experienced logistics coordinator with inventory and documentation.',
      'Skilled logistics specialist with tracking and customer communication.',
      'Expert logistics professional with planning and optimization.',
      'Certified logistics assistant with technology and reporting.',
      'Master logistics coordinator with process improvement and training.'
    ],
    salaryRange: { min: 2200, max: 4200 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 8 }
  },
  'Dispatch Coordinator': {
    descriptions: [
      'Professional dispatch coordinator with routing and communication expertise.',
      'Experienced dispatcher with fleet management and optimization.',
      'Skilled dispatch specialist with emergency response and coordination.',
      'Expert dispatcher with technology and customer service.',
      'Certified dispatch coordinator with training and quality management.',
      'Master dispatcher with strategic planning and team leadership.'
    ],
    salaryRange: { min: 2500, max: 4800 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Tamil'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 2, max: 12 }
  },
  'Heavy Vehicle Driver': {
    descriptions: [
      'Professional heavy vehicle driver with specialized equipment operation.',
      'Experienced heavy transport driver with safety and regulations.',
      'Skilled heavy vehicle operator with cargo handling and inspection.',
      'Expert heavy transport professional with route planning and efficiency.',
      'Licensed heavy vehicle driver with maintenance and documentation.',
      'Master heavy transport operator with training and safety management.'
    ],
    salaryRange: { min: 3000, max: 5500 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English'],
      ['English', 'Bengali']
    ],
    experience: { min: 3, max: 18 }
  },
  // Hospitality & Food
  'Restaurant Cleaner': {
    descriptions: [
      'Professional restaurant cleaner with food service sanitation expertise.',
      'Experienced kitchen cleaner with hygiene standards and efficiency.',
      'Skilled restaurant custodian with equipment cleaning and maintenance.',
      'Expert food service cleaner with safety protocols and quality.',
      'Certified restaurant cleaner with chemical handling and procedures.',
      'Master restaurant custodian with training and quality assurance.'
    ],
    salaryRange: { min: 1400, max: 2600 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Barista': {
    descriptions: [
      'Professional barista with coffee preparation and customer service.',
      'Experienced coffee specialist with brewing techniques and quality.',
      'Skilled barista with espresso machine operation and drink knowledge.',
      'Expert coffee professional with latte art and menu familiarity.',
      'Certified barista with food safety and customer engagement.',
      'Master coffee specialist with training and shop management.'
    ],
    salaryRange: { min: 1700, max: 3200 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'French'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Food Delivery Rider': {
    descriptions: [
      'Professional food delivery rider with speed and customer service.',
      'Experienced delivery specialist with navigation and time management.',
      'Skilled food courier with vehicle maintenance and safety.',
      'Expert delivery professional with customer communication and quality.',
      'Certified delivery rider with technology and tracking systems.',
      'Master food delivery specialist with training and efficiency optimization.'
    ],
    salaryRange: { min: 1800, max: 3200 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  // Security & General Services
  'Watchman': {
    descriptions: [
      'Professional watchman with security monitoring and patrol expertise.',
      'Experienced security guard with observation and emergency response.',
      'Skilled watchman with access control and incident reporting.',
      'Expert security professional with communication and vigilance.',
      'Certified watchman with safety protocols and customer service.',
      'Master security specialist with training and team coordination.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['Arabic', 'English'],
      ['English', 'Hindi'],
      ['English', 'Urdu'],
      ['Arabic', 'English', 'Hindi'],
      ['English', 'Bengali']
    ],
    experience: { min: 1, max: 10 }
  },
  'Lifeguard': {
    descriptions: [
      'Professional lifeguard with water rescue and first aid certification.',
      'Experienced aquatic safety specialist with swimming and emergency response.',
      'Skilled lifeguard with pool maintenance and safety enforcement.',
      'Expert water safety professional with training and prevention.',
      'Certified lifeguard with CPR and medical assistance.',
      'Master aquatic safety specialist with supervision and program management.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'French'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Maintenance Helper': {
    descriptions: [
      'Professional maintenance helper with general repair and assistance.',
      'Experienced maintenance assistant with tool handling and support.',
      'Skilled maintenance worker with cleaning and basic repairs.',
      'Expert maintenance helper with safety awareness and reliability.',
      'Certified maintenance assistant with inventory and documentation.',
      'Master maintenance helper with training and quality support.'
    ],
    salaryRange: { min: 1600, max: 3000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'General Helper': {
    descriptions: [
      'Versatile general helper with multi-task capabilities and reliability.',
      'Experienced general assistant with adaptability and work ethic.',
      'Skilled general worker with basic maintenance and support.',
      'Expert general helper with communication and problem-solving.',
      'Certified general assistant with safety awareness and training.',
      'Master general helper with leadership and quality service.'
    ],
    salaryRange: { min: 1500, max: 2800 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  // Other essential jobs
  'Tailor': {
    descriptions: [
      'Professional tailor with clothing alteration and custom tailoring.',
      'Experienced seamster with pattern making and garment construction.',
      'Skilled tailor with fabric knowledge and precision fitting.',
      'Expert tailor with traditional and modern tailoring techniques.',
      'Certified tailor with quality craftsmanship and customer service.',
      'Master tailor with design consultation and specialty garments.'
    ],
    salaryRange: { min: 2000, max: 4500 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 2, max: 15 }
  },
  'Ironing Staff': {
    descriptions: [
      'Professional ironing specialist with garment care and pressing.',
      'Experienced laundry worker with fabric handling and finishing.',
      'Skilled ironing professional with commercial equipment operation.',
      'Expert garment care specialist with quality and efficiency.',
      'Certified ironing staff with customer service and reliability.',
      'Master ironing professional with training and quality standards.'
    ],
    salaryRange: { min: 1400, max: 2600 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tagalog']
    ],
    experience: { min: 1, max: 8 }
  },
  'Textile Factory Worker': {
    descriptions: [
      'Professional textile worker with fabric production and quality control.',
      'Experienced factory operator with textile machinery and maintenance.',
      'Skilled textile specialist with material handling and processing.',
      'Expert textile worker with efficiency and safety protocols.',
      'Certified textile professional with quality standards and procedures.',
      'Master textile specialist with training and process optimization.'
    ],
    salaryRange: { min: 1600, max: 3200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  },
  'Farm Worker': {
    descriptions: [
      'Professional farm worker with crop cultivation and livestock care.',
      'Experienced agricultural worker with planting and harvesting.',
      'Skilled farm laborer with equipment operation and maintenance.',
      'Expert agricultural professional with irrigation and pest control.',
      'Certified farm worker with organic farming and sustainability.',
      'Master agricultural specialist with training and farm management.'
    ],
    salaryRange: { min: 1500, max: 3000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 12 }
  },
  'Livestock Handler': {
    descriptions: [
      'Professional livestock handler with animal care and management.',
      'Experienced animal caretaker with feeding and health monitoring.',
      'Skilled livestock worker with breeding and handling expertise.',
      'Expert animal handler with safety protocols and veterinary assistance.',
      'Certified livestock professional with record keeping and quality care.',
      'Master livestock specialist with training and farm operations.'
    ],
    salaryRange: { min: 1600, max: 3200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  },
  'Greenhouse Worker': {
    descriptions: [
      'Professional greenhouse worker with plant cultivation and climate control.',
      'Experienced horticulture specialist with growing and harvesting.',
      'Skilled greenhouse operator with irrigation and pest management.',
      'Expert plant care professional with quality and productivity.',
      'Certified greenhouse worker with organic methods and sustainability.',
      'Master greenhouse specialist with training and production optimization.'
    ],
    salaryRange: { min: 1700, max: 3300 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Petrol Pump Attendant': {
    descriptions: [
      'Professional petrol pump attendant with fuel service and customer care.',
      'Experienced gas station worker with safety protocols and efficiency.',
      'Skilled fuel attendant with vehicle service and maintenance checks.',
      'Expert petrol station professional with cash handling and service.',
      'Certified pump attendant with safety compliance and customer satisfaction.',
      'Master fuel service specialist with training and quality service.'
    ],
    salaryRange: { min: 1600, max: 3000 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Tea Boy': {
    descriptions: [
      'Professional tea boy with beverage service and office support.',
      'Experienced office assistant with refreshment preparation and service.',
      'Skilled tea service worker with customer care and cleanliness.',
      'Expert beverage specialist with traditional and modern preparation.',
      'Certified tea boy with hygiene standards and efficiency.',
      'Master tea service professional with quality and presentation.'
    ],
    salaryRange: { min: 1200, max: 2200 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 6 }
  },
  'Baggage Handler': {
    descriptions: [
      'Professional baggage handler with airport operations and efficiency.',
      'Experienced luggage specialist with cargo handling and safety.',
      'Skilled baggage worker with loading and equipment operation.',
      'Expert airport handler with customer service and reliability.',
      'Certified baggage professional with security protocols and quality.',
      'Master baggage specialist with training and operational excellence.'
    ],
    salaryRange: { min: 1800, max: 3500 },
    languages: [
      ['English', 'Arabic'],
      ['English', 'Hindi'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 8 }
  },
  'Pest Control Worker': {
    descriptions: [
      'Professional pest control worker with integrated pest management.',
      'Experienced exterminator with chemical application and safety.',
      'Skilled pest control specialist with inspection and treatment.',
      'Expert pest management professional with prevention and education.',
      'Certified pest control worker with regulations and customer service.',
      'Master pest control specialist with training and quality assurance.'
    ],
    salaryRange: { min: 2000, max: 4000 },
    languages: [
      ['English', 'Hindi'],
      ['English', 'Arabic'],
      ['English', 'Bengali'],
      ['Arabic', 'English'],
      ['English', 'Tamil']
    ],
    experience: { min: 1, max: 10 }
  }
}

function getCountryForCity(city: City): Country {
  for (const [country, data] of Object.entries(GULF_REGIONS)) {
    if (data.cities.includes(city)) {
      return country as Country
    }
  }
  return 'UAE' // fallback
}

function getCurrencyForCity(city: City): string {
  const country = getCountryForCity(city)
  return GULF_REGIONS[country].currency
}

function convertSalaryToLocalCurrency(aedSalary: number, city: City): number {
  const currency = getCurrencyForCity(city)
  const rate = CURRENCY_RATES[currency as keyof typeof CURRENCY_RATES] || 1
  return Math.round(aedSalary / rate)
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePhoneNumber(country: Country): string {
  const phoneCodes = {
    'UAE': '+971',
    'Qatar': '+974',
    'Saudi Arabia': '+966',
    'Oman': '+968',
    'Kuwait': '+965',
    'Bahrain': '+973'
  }
  
  const baseCode = phoneCodes[country]
  const number = Math.floor(Math.random() * 90000000) + 10000000
  return `${baseCode}${number}`
}

function generateWorkerProfile(
  id: string,
  jobTitle: JobTitle,
  city: City,
  nameIndex: number
): Worker {
  try {
    const country = getCountryForCity(city)
    const jobDetails = JOB_DETAILS[jobTitle]

    if (!jobDetails) {
      throw new Error(`No job details found for ${jobTitle}`)
    }

    const isMale = Math.random() > 0.5
    const nameArray = isMale ? WORKER_NAMES.male : WORKER_NAMES.female
    const pictureArray = isMale ? PROFILE_PICTURES.male : PROFILE_PICTURES.female

    // Use a combination of nameIndex and id hash for better distribution
    const idNum = parseInt(id.replace(/\D/g, ''), 10) || 1
    const nameHashIndex = (nameIndex + idNum) % nameArray.length
    const fullName = nameArray[nameHashIndex] || 'Default Worker'

    // Use picture index based on id for consistency
    const pictureIndex = (idNum + nameHashIndex) % pictureArray.length
    const profilePicture = pictureArray[pictureIndex] || pictureArray[0]

    const yearsExperience = getRandomRange(jobDetails.experience.min, jobDetails.experience.max)
    const baseSalary = getRandomRange(jobDetails.salaryRange.min, jobDetails.salaryRange.max)
    const localSalary = convertSalaryToLocalCurrency(baseSalary, city)

    const visaStatuses: Worker['visaStatus'][] = ['Work Visa', 'Freelance Visa', 'Visit Visa', 'Expired Visa', 'No Visa']
    const visaStatus = getRandomElement(visaStatuses)

    return {
      id,
      fullName,
      profilePicture,
      jobTitle,
      yearsExperience,
      city,
      country,
      languagesSpoken: getRandomElement(jobDetails.languages),
      expectedSalary: localSalary,
      visaStatus,
      availability: Math.random() > 0.1, // 90% available
      aboutMe: getRandomElement(jobDetails.descriptions),
      phoneNumber: generatePhoneNumber(country),
      email: `${fullName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
      updatedAt: new Date()
    }
  } catch (error) {
    console.error(`Error generating worker profile for ${jobTitle} in ${city}:`, error)
    // Return fallback profile
    return {
      id,
      fullName: 'Default Worker',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      jobTitle,
      yearsExperience: 3,
      city,
      country: getCountryForCity(city),
      languagesSpoken: ['English'],
      expectedSalary: 2500,
      visaStatus: 'Work Visa',
      availability: true,
      aboutMe: 'Experienced professional worker.',
      phoneNumber: '+971501234567',
      email: 'worker@email.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export function generateDummyWorkers(): Worker[] {
  try {
    const workers: Worker[] = []
    let idCounter = 1
    let nameIndex = 0

    // Generate workers for each city/job combination ensuring good coverage
    Object.entries(GULF_REGIONS).forEach(([country, data]) => {
      data.cities.forEach(city => {
        Object.keys(JOB_DETAILS).forEach(jobTitle => {
          try {
            // Generate 3-5 workers per city/job combination for better performance
            const workersPerJob = getRandomRange(3, 5)

            for (let i = 0; i < workersPerJob; i++) {
              try {
                const worker = generateWorkerProfile(
                  `dummy_${idCounter}`,
                  jobTitle as JobTitle,
                  city,
                  nameIndex
                )
                workers.push(worker)
                idCounter++
                nameIndex++
              } catch (error) {
                console.error(`Error generating worker profile ${idCounter}:`, error)
                idCounter++
              }
            }
          } catch (error) {
            console.error(`Error generating workers for ${jobTitle} in ${city}:`, error)
          }
        })
      })
    })

    console.log(`Generated ${workers.length} dummy workers`)
    return workers
  } catch (error) {
    console.error('Error in generateDummyWorkers:', error)
    // Return minimal fallback data
    return [
      {
        id: 'fallback_1',
        fullName: 'Ahmed Hassan',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        jobTitle: 'Driver',
        yearsExperience: 5,
        city: 'Dubai',
        country: 'UAE',
        languagesSpoken: ['English', 'Arabic'],
        expectedSalary: 3000,
        visaStatus: 'Work Visa',
        availability: true,
        aboutMe: 'Experienced professional worker.',
        phoneNumber: '+971501234567',
        email: 'ahmed.hassan@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }
}

export function getCurrencyDisplayForCity(city: string): string {
  // Handle URL slug format
  const formattedCity = city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  // Special cases for city name mapping
  const cityMap: Record<string, City> = {
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Kuwait City': 'Kuwait City'
  }
  
  const cityName = (cityMap[formattedCity] as City) || (formattedCity as City)
  return getCurrencyForCity(cityName)
}

export { GULF_REGIONS, CURRENCY_RATES, getCurrencyForCity, getCountryForCity, convertSalaryToLocalCurrency }
