// UAE Companies by City for Job Listings

export interface Company {
  name: string
  industry: string
  size: string
  description: string
}

export interface CityCompanies {
  [key: string]: Company[]
}

export const UAE_COMPANIES: CityCompanies = {
  'Dubai': [
    {
      name: 'Emirates Group',
      industry: 'Aviation & Hospitality',
      size: '100,000+ employees',
      description: 'Global aviation and travel services conglomerate'
    },
    {
      name: 'Al Ghurair',
      industry: 'Diversified Business',
      size: '10,000+ employees', 
      description: 'Leading diversified business group in the UAE'
    },
    {
      name: 'ASGC Construction',
      industry: 'Construction',
      size: '5,000+ employees',
      description: 'Premier construction and engineering company'
    },
    {
      name: 'Majid Al Futtaim',
      industry: 'Retail & Real Estate',
      size: '40,000+ employees',
      description: 'Leading shopping mall, retail and leisure pioneer'
    },
    {
      name: 'Dubai Duty Free',
      industry: 'Retail',
      size: '5,000+ employees',
      description: 'World-class duty-free retail operation'
    },
    {
      name: 'Jumeirah Group',
      industry: 'Hospitality',
      size: '15,000+ employees',
      description: 'Luxury hospitality company and Dubai landmark operator'
    },
    {
      name: 'Apparel Group',
      industry: 'Fashion Retail',
      size: '20,000+ employees',
      description: 'Fashion and lifestyle retail conglomerate'
    },
    {
      name: 'Nakheel',
      industry: 'Real Estate Development',
      size: '3,000+ employees',
      description: 'Master developer of Dubai\'s iconic projects'
    },
    {
      name: 'DAMAC Properties',
      industry: 'Real Estate Development',
      size: '3,000+ employees',
      description: 'Luxury real estate development company'
    },
    {
      name: 'Emaar Properties',
      industry: 'Real Estate Development',
      size: '8,000+ employees',
      description: 'Global property developer and provider'
    },
    {
      name: 'DP World',
      industry: 'Logistics & Ports',
      size: '50,000+ employees',
      description: 'Global supply chain logistics company'
    },
    {
      name: 'Transguard Group',
      industry: 'Security & Support Services',
      size: '60,000+ employees',
      description: 'Integrated security and support services provider'
    },
    {
      name: 'Dubai Holding',
      industry: 'Investment & Development',
      size: '20,000+ employees',
      description: 'Global investment and development holding company'
    },
    {
      name: 'Noon.com',
      industry: 'E-commerce',
      size: '3,000+ employees',
      description: 'Leading e-commerce platform in the Middle East'
    },
    {
      name: 'Careem',
      industry: 'Technology & Transportation',
      size: '5,000+ employees',
      description: 'Super app for transportation and delivery services'
    },
    {
      name: 'Al Tayer Group',
      industry: 'Automotive & Retail',
      size: '8,000+ employees',
      description: 'Premier automotive and retail distribution company'
    },
    {
      name: 'Chalhoub Group',
      industry: 'Luxury Retail',
      size: '12,000+ employees',
      description: 'Leading luxury retail and distribution company'
    },
    {
      name: 'Aramex',
      industry: 'Logistics & Express',
      size: '15,000+ employees',
      description: 'Global logistics and transportation solutions provider'
    },
    {
      name: 'Union Coop',
      industry: 'Retail & Consumer Goods',
      size: '8,000+ employees',
      description: 'Leading consumer cooperative society'
    },
    {
      name: 'Dubai Airports',
      industry: 'Aviation Infrastructure',
      size: '5,000+ employees',
      description: 'World-class airport management company'
    },
    {
      name: 'Dulsco',
      industry: 'Integrated Services',
      size: '15,000+ employees',
      description: 'Integrated environmental and support services'
    },
    {
      name: 'Landmark Group',
      industry: 'Retail & Hospitality',
      size: '50,000+ employees',
      description: 'Multinational consumer conglomerate'
    },
    {
      name: 'Emirates NBD',
      industry: 'Banking & Financial Services',
      size: '40,000+ employees',
      description: 'Leading banking group in the Middle East'
    },
    {
      name: 'Mashreq Bank',
      industry: 'Banking & Financial Services',
      size: '15,000+ employees',
      description: 'Private sector bank with regional presence'
    },
    {
      name: 'GEMS Education',
      industry: 'Education',
      size: '20,000+ employees',
      description: 'Global education company and school operator'
    },
    {
      name: 'Al Naboodah Group',
      industry: 'Construction & Heavy Equipment',
      size: '12,000+ employees',
      description: 'Construction and heavy equipment specialist'
    },
    {
      name: 'Al Rostamani Group',
      industry: 'Automotive & Trading',
      size: '10,000+ employees',
      description: 'Diversified business group with automotive focus'
    },
    {
      name: 'Arabtec Construction',
      industry: 'Construction',
      size: '8,000+ employees',
      description: 'Regional construction and engineering contractor'
    },
    {
      name: 'Belhasa Group',
      industry: 'Trading & Services',
      size: '5,000+ employees',
      description: 'Diversified trading and services conglomerate'
    },
    {
      name: 'Blue Diamond Group',
      industry: 'Hospitality & Services',
      size: '3,000+ employees',
      description: 'Hospitality and lifestyle services provider'
    },
    {
      name: 'Cayan Group',
      industry: 'Real Estate Development',
      size: '1,000+ employees',
      description: 'Real estate development and investment company'
    },
    {
      name: 'GGICO',
      industry: 'Insurance',
      size: '2,000+ employees',
      description: 'Leading insurance and financial services provider'
    },
    {
      name: 'BinHendi Enterprises',
      industry: 'Trading & Distribution',
      size: '3,000+ employees',
      description: 'Trading and distribution company'
    },
    {
      name: 'Pan Gulf Group',
      industry: 'Industrial & Trading',
      size: '2,000+ employees',
      description: 'Industrial manufacturing and trading group'
    },
    {
      name: 'RA International',
      industry: 'Construction & Engineering',
      size: '2,000+ employees',
      description: 'Construction and engineering services provider'
    },
    {
      name: 'Time Hotels',
      industry: 'Hospitality',
      size: '2,000+ employees',
      description: 'Hotel management and hospitality company'
    },
    {
      name: 'AW Rostamani Holdings',
      industry: 'Automotive & Investment',
      size: '5,000+ employees',
      description: 'Automotive and diversified investment holding'
    },
    {
      name: 'Khansaheb Civil Engineering',
      industry: 'Civil Engineering',
      size: '3,000+ employees',
      description: 'Civil engineering and construction specialist'
    },
    {
      name: 'Desert Group',
      industry: 'Food & Beverage',
      size: '2,000+ employees',
      description: 'Food and beverage manufacturing and distribution'
    },
    {
      name: 'Emirates Flight Catering',
      industry: 'Aviation Services',
      size: '10,000+ employees',
      description: 'Airline catering and hospitality services'
    },
    {
      name: 'ENOC',
      industry: 'Oil & Gas',
      size: '8,000+ employees',
      description: 'Integrated oil and gas company'
    },
    {
      name: 'Dubai Investments',
      industry: 'Investment & Development',
      size: '5,000+ employees',
      description: 'Diversified investment and development company'
    },
    {
      name: 'Wasl Properties',
      industry: 'Real Estate',
      size: '2,000+ employees',
      description: 'Real estate development and asset management'
    },
    {
      name: 'Al Futtaim Group',
      industry: 'Diversified Business',
      size: '35,000+ employees',
      description: 'Diversified business group across multiple sectors'
    },
    {
      name: 'Emirates Leisure Retail',
      industry: 'Retail',
      size: '3,000+ employees',
      description: 'Travel retail and leisure company'
    },
    {
      name: 'OSN',
      industry: 'Media & Entertainment',
      size: '1,000+ employees',
      description: 'Premium entertainment network'
    },
    {
      name: 'Dubai World Trade Centre',
      industry: 'Events & Exhibitions',
      size: '2,000+ employees',
      description: 'Premier exhibition and convention center'
    },
    {
      name: 'Dubai Silicon Oasis Authority',
      industry: 'Technology & Free Zone',
      size: '1,000+ employees',
      description: 'Integrated technology park and free zone'
    },
    {
      name: 'Dubai Healthcare City',
      industry: 'Healthcare',
      size: '15,000+ employees',
      description: 'Healthcare free zone and medical district'
    }
  ],
  'Abu Dhabi': [
    {
      name: 'Etisalat',
      industry: 'Telecommunications',
      size: '40,000+ employees',
      description: 'Leading telecommunications group in the Middle East'
    },
    {
      name: 'International Holding Company (IHC)',
      industry: 'Investment Holding',
      size: '200,000+ employees',
      description: 'Diversified holding company with global reach'
    },
    {
      name: 'TAQA',
      industry: 'Energy & Utilities',
      size: '25,000+ employees',
      description: 'International energy and water company'
    },
    {
      name: 'Mubadala Investment Company',
      industry: 'Sovereign Investment',
      size: '5,000+ employees',
      description: 'Sovereign investor and strategic investment arm'
    },
    {
      name: 'Aldar Properties',
      industry: 'Real Estate Development',
      size: '3,000+ employees',
      description: 'Leading real estate developer and asset manager'
    },
    {
      name: 'Abu Dhabi National Oil Company (ADNOC)',
      industry: 'Oil & Gas',
      size: '60,000+ employees',
      description: 'State-owned oil and gas company'
    },
    {
      name: 'First Abu Dhabi Bank',
      industry: 'Banking & Financial Services',
      size: '25,000+ employees',
      description: 'Largest bank in the UAE and leading MENA financial institution'
    },
    {
      name: 'Agthia Group',
      industry: 'Food & Beverage',
      size: '3,000+ employees',
      description: 'Food and beverage company'
    },
    {
      name: 'ADNOC Distribution',
      industry: 'Fuel Retail & Convenience',
      size: '8,000+ employees',
      description: 'Fuel distribution and convenience retail network'
    },
    {
      name: 'Borouge',
      industry: 'Petrochemicals',
      size: '2,000+ employees',
      description: 'Leading petrochemicals company'
    },
    {
      name: 'Abu Dhabi Ports',
      industry: 'Ports & Logistics',
      size: '3,000+ employees',
      description: 'Master developer and operator of commercial ports'
    },
    {
      name: 'NMC Health',
      industry: 'Healthcare',
      size: '25,000+ employees',
      description: 'Healthcare services provider'
    },
    {
      name: 'Yas Holding',
      industry: 'Investment & Development',
      size: '5,000+ employees',
      description: 'Investment and development company'
    },
    {
      name: 'Abu Dhabi Media',
      industry: 'Media & Entertainment',
      size: '2,000+ employees',
      description: 'Media and entertainment conglomerate'
    },
    {
      name: 'Abu Dhabi Islamic Bank',
      industry: 'Islamic Banking',
      size: '8,000+ employees',
      description: 'Leading Islamic financial services group'
    },
    {
      name: 'National Marine Dredging Company',
      industry: 'Marine Engineering',
      size: '5,000+ employees',
      description: 'Marine engineering and construction specialist'
    }
  ],
  'Sharjah': [
    {
      name: 'Air Arabia',
      industry: 'Aviation',
      size: '2,000+ employees',
      description: 'Low-cost airline carrier'
    },
    {
      name: 'Sharjah Electricity & Water Authority (SEWA)',
      industry: 'Utilities',
      size: '3,000+ employees',
      description: 'Electricity and water utility provider'
    },
    {
      name: 'Bee\'ah',
      industry: 'Environmental Management',
      size: '1,000+ employees',
      description: 'Environmental management and waste solutions'
    },
    {
      name: 'Gulftainer',
      industry: 'Ports & Container Terminal',
      size: '2,000+ employees',
      description: 'Port operator and container terminal management'
    },
    {
      name: 'Dana Gas',
      industry: 'Oil & Gas',
      size: '1,500+ employees',
      description: 'Regional natural gas company'
    },
    {
      name: 'Sharjah National Hotels',
      industry: 'Hospitality',
      size: '1,000+ employees',
      description: 'Hotel and hospitality management'
    },
    {
      name: 'Petrofac',
      industry: 'Oil & Gas Services',
      size: '10,000+ employees',
      description: 'International service provider to the energy industry'
    },
    {
      name: 'Sharjah Chamber of Commerce',
      industry: 'Business Services',
      size: '500+ employees',
      description: 'Business development and commercial services'
    },
    {
      name: 'Sharjah Asset Management',
      industry: 'Investment Management',
      size: '300+ employees',
      description: 'Asset management and investment services'
    }
  ],
  'Ras Al Khaimah': [
    {
      name: 'RAK Ceramics',
      industry: 'Manufacturing - Ceramics',
      size: '12,000+ employees',
      description: 'Global ceramics and sanitary ware manufacturer'
    },
    {
      name: 'Julphar Pharmaceuticals',
      industry: 'Pharmaceuticals',
      size: '2,000+ employees',
      description: 'Pharmaceutical manufacturing and distribution'
    },
    {
      name: 'RAK Bank',
      industry: 'Banking & Financial Services',
      size: '2,000+ employees',
      description: 'Commercial banking and financial services'
    },
    {
      name: 'RAK Properties',
      industry: 'Real Estate Development',
      size: '500+ employees',
      description: 'Real estate development and investment'
    },
    {
      name: 'RAK Ports',
      industry: 'Ports & Maritime',
      size: '1,000+ employees',
      description: 'Port operations and maritime services'
    },
    {
      name: 'RAK Free Trade Zone Authority',
      industry: 'Free Zone Services',
      size: '300+ employees',
      description: 'Free zone development and business services'
    }
  ],
  'Fujairah': [
    {
      name: 'Fujairah National Group',
      industry: 'Diversified Business',
      size: '2,000+ employees',
      description: 'Diversified business group'
    },
    {
      name: 'Fujairah National Bank',
      industry: 'Banking & Financial Services',
      size: '800+ employees',
      description: 'Regional banking and financial services'
    },
    {
      name: 'Fujairah Free Zone',
      industry: 'Free Zone Services',
      size: '200+ employees',
      description: 'Free zone authority and business services'
    },
    {
      name: 'Fujairah Port Authority',
      industry: 'Ports & Maritime',
      size: '500+ employees',
      description: 'Port operations and maritime authority'
    },
    {
      name: 'Fujairah Cement Industries',
      industry: 'Manufacturing - Cement',
      size: '300+ employees',
      description: 'Cement manufacturing and building materials'
    }
  ],
  'Ajman': [
    {
      name: 'Ajman Bank',
      industry: 'Islamic Banking',
      size: '1,000+ employees',
      description: 'Islamic banking and financial services'
    },
    {
      name: 'Ajman Free Zone',
      industry: 'Free Zone Services',
      size: '200+ employees',
      description: 'Free zone authority and business development'
    },
    {
      name: 'Ajman University',
      industry: 'Education',
      size: '1,500+ employees',
      description: 'Higher education and academic institution'
    },
    {
      name: 'Gulf Medical University',
      industry: 'Medical Education',
      size: '800+ employees',
      description: 'Medical education and healthcare training'
    },
    {
      name: 'Ajman Chamber of Commerce',
      industry: 'Business Services',
      size: '150+ employees',
      description: 'Business development and commercial services'
    }
  ]
}

// Job categories mapping to simplified URL-friendly names
export const JOB_CATEGORIES_URL_MAP = {
  'Domestic & Personal Care Workers': 'domestic-workers',
  'Construction & Infrastructure': 'construction-workers', 
  'Mechanical & Technical': 'technical-workers',
  'Manufacturing & Factory': 'factory-workers',
  'Transport & Logistics': 'driver',
  'Cleaning & Maintenance': 'cleaning-workers',
  'Hospitality & Food': 'hospitality-workers',
  'Security & General Services': 'security-workers',
  'Garments & Tailoring': 'tailoring-workers',
  'Agriculture & Farming': 'farming-workers',
  'Other Common Jobs': 'general-workers'
}

// City slug to display name mapping for UAE
export const UAE_CITIES = [
  'Dubai',
  'Abu Dhabi', 
  'Sharjah',
  'Ras Al Khaimah',
  'Fujairah',
  'Ajman'
]

export function getCityDisplayName(citySlug: string): string {
  const cityMap: Record<string, string> = {
    'dubai': 'Dubai',
    'abu-dhabi': 'Abu Dhabi',
    'sharjah': 'Sharjah', 
    'ras-al-khaimah': 'Ras Al Khaimah',
    'fujairah': 'Fujairah',
    'ajman': 'Ajman'
  }
  return cityMap[citySlug] || citySlug
}

export function getCategoryDisplayName(categorySlug: string): string {
  const categoryMap: Record<string, string> = {
    'domestic-workers': 'Domestic & Personal Care Workers',
    'construction-workers': 'Construction & Infrastructure',
    'technical-workers': 'Mechanical & Technical', 
    'factory-workers': 'Manufacturing & Factory',
    'driver': 'Transport & Logistics',
    'cleaning-workers': 'Cleaning & Maintenance',
    'hospitality-workers': 'Hospitality & Food',
    'security-workers': 'Security & General Services',
    'tailoring-workers': 'Garments & Tailoring',
    'farming-workers': 'Agriculture & Farming',
    'general-workers': 'Other Common Jobs'
  }
  return categoryMap[categorySlug] || categorySlug
}
