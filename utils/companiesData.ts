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

export const QATAR_COMPANIES: CityCompanies = {
  'Doha': [
    {
      name: 'Qatar National Bank (QNB)',
      industry: 'Banking & Financial Services',
      size: '30,000+ employees',
      description: 'Leading banking group in Qatar and the Middle East'
    },
    {
      name: 'Qatar Islamic Bank (QIB)',
      industry: 'Islamic Banking',
      size: '5,000+ employees',
      description: 'Premier Islamic banking institution in Qatar'
    },
    {
      name: 'Qatar Petroleum (QP)',
      industry: 'Oil & Gas',
      size: '50,000+ employees',
      description: 'National oil and gas company of Qatar'
    },
    {
      name: 'Qatar Airways',
      industry: 'Aviation',
      size: '50,000+ employees',
      description: 'Flag carrier airline of Qatar and leading global airline'
    },
    {
      name: 'Qatar Energy',
      industry: 'Energy',
      size: '45,000+ employees',
      description: 'Integrated energy company and major LNG producer'
    },
    {
      name: 'Qatar Steel',
      industry: 'Steel Manufacturing',
      size: '2,000+ employees',
      description: 'Leading steel manufacturing company in Qatar'
    },
    {
      name: 'Qatar Cement',
      industry: 'Manufacturing - Cement',
      size: '1,000+ employees',
      description: 'Major cement manufacturing company'
    },
    {
      name: 'Qatar National Cement Company',
      industry: 'Manufacturing - Cement',
      size: '800+ employees',
      description: 'National cement production and distribution company'
    },
    {
      name: 'Qatar Aluminum Manufacturing Company (QAMCO)',
      industry: 'Manufacturing - Aluminum',
      size: '1,500+ employees',
      description: 'Leading aluminum manufacturing company'
    },
    {
      name: 'Qatar Industrial Manufacturing Company (QIMC)',
      industry: 'Industrial Manufacturing',
      size: '1,200+ employees',
      description: 'Diversified industrial manufacturing company'
    },
    {
      name: 'Qatar General Insurance & Reinsurance Company',
      industry: 'Insurance',
      size: '1,000+ employees',
      description: 'Provider of insurance and reinsurance services'
    },
    {
      name: 'Qatar Insurance Company',
      industry: 'Insurance',
      size: '800+ employees',
      description: 'Leading insurance services provider'
    },
    {
      name: 'Qatar Islamic Insurance Company',
      industry: 'Islamic Insurance',
      size: '600+ employees',
      description: 'Sharia-compliant insurance services provider'
    },
    {
      name: 'Qatar Oman Investment Company',
      industry: 'Investment & Finance',
      size: '500+ employees',
      description: 'Investment and financial services company'
    },
    {
      name: 'Qatar Electricity & Water Company (QEWC)',
      industry: 'Utilities',
      size: '3,000+ employees',
      description: 'Major electricity and water utility provider'
    },
    {
      name: 'Qatar International Islamic Bank (QIIB)',
      industry: 'Islamic Banking',
      size: '2,000+ employees',
      description: 'International Islamic banking services'
    },
    {
      name: 'Qatar Development Bank (QDB)',
      industry: 'Development Banking',
      size: '1,000+ employees',
      description: 'National development bank supporting SMEs'
    },
    {
      name: 'Qatar Foundation',
      industry: 'Education & Research',
      size: '8,000+ employees',
      description: 'Leading organization for education, science and community development'
    },
    {
      name: 'Qatar Museums',
      industry: 'Arts & Culture',
      size: '2,000+ employees',
      description: 'National museums organization preserving cultural heritage'
    },
    {
      name: 'Qatar Charity',
      industry: 'Non-Profit & Charity',
      size: '3,000+ employees',
      description: 'International humanitarian and development organization'
    },
    {
      name: 'Qatar Red Crescent Society',
      industry: 'Non-Profit & Humanitarian',
      size: '1,500+ employees',
      description: 'Humanitarian organization providing emergency relief'
    },
    {
      name: 'Qatar Foundation for Education, Science and Community Development',
      industry: 'Education & Research',
      size: '5,000+ employees',
      description: 'Comprehensive foundation for educational and scientific advancement'
    },
    {
      name: 'Qatar University',
      industry: 'Higher Education',
      size: '4,000+ employees',
      description: 'Leading national university in Qatar'
    },
    {
      name: 'Qatar University of Science and Technology',
      industry: 'Higher Education - STEM',
      size: '1,000+ employees',
      description: 'Specialized university focusing on science and technology'
    },
    {
      name: 'Qatar University of Business and Economics',
      industry: 'Higher Education - Business',
      size: '800+ employees',
      description: 'Specialized university for business and economics education'
    },
    {
      name: 'Qatar University of Engineering',
      industry: 'Higher Education - Engineering',
      size: '1,200+ employees',
      description: 'Engineering-focused educational institution'
    },
    {
      name: 'Qatar University of Health Sciences',
      industry: 'Higher Education - Healthcare',
      size: '1,000+ employees',
      description: 'Medical and health sciences educational institution'
    }
  ]
}

export const SAUDI_ARABIA_COMPANIES: CityCompanies = {
  'Riyadh': [
    {
      name: 'Saudi Aramco',
      industry: 'Oil & Gas',
      size: '70,000+ employees',
      description: 'National oil company with significant operations in Riyadh'
    },
    {
      name: 'SABIC',
      industry: 'Petrochemicals',
      size: '35,000+ employees',
      description: 'State-owned petrochemical giant'
    },
    {
      name: 'Almarai',
      industry: 'Food & Dairy',
      size: '40,000+ employees',
      description: 'Leading dairy and food processing company'
    },
    {
      name: 'STC Group',
      industry: 'Telecommunications',
      size: '20,000+ employees',
      description: 'Major telecommunications provider'
    },
    {
      name: 'Samba Financial Group',
      industry: 'Banking & Financial Services',
      size: '8,000+ employees',
      description: 'Prominent banking and financial services company'
    },
    {
      name: 'Saudi Electricity Company',
      industry: 'Utilities',
      size: '32,000+ employees',
      description: 'State-owned electricity provider'
    },
    {
      name: 'Saudi Advanced Industries Company',
      industry: 'Industrial Conglomerate',
      size: '15,000+ employees',
      description: 'Conglomerate with diverse industrial interests'
    },
    {
      name: 'Saudi Awwal Bank',
      industry: 'Banking & Financial Services',
      size: '5,000+ employees',
      description: 'One of the oldest banks in Saudi Arabia'
    },
    {
      name: 'Saudi Oger',
      industry: 'Construction & Contracting',
      size: '25,000+ employees',
      description: 'Construction and contracting company'
    },
    {
      name: 'Saudi Research and Media Group',
      industry: 'Media & Entertainment',
      size: '3,000+ employees',
      description: 'Media conglomerate'
    },
    {
      name: 'Savvy Games Group',
      industry: 'Gaming & Entertainment',
      size: '1,000+ employees',
      description: 'Gaming and entertainment company'
    },
    {
      name: 'Shawarmer',
      industry: 'Food & Restaurants',
      size: '5,000+ employees',
      description: 'Popular fast-food chain specializing in shawarma'
    },
    {
      name: 'SACO Hardware',
      industry: 'Retail & Hardware',
      size: '3,000+ employees',
      description: 'Retailer of hardware and home improvement products'
    },
    {
      name: 'Saudi Manpower Solutions Company',
      industry: 'Human Resources',
      size: '10,000+ employees',
      description: 'Provider of workforce solutions'
    },
    {
      name: 'Triangular Pyramid Factory',
      industry: 'Manufacturing - Construction Materials',
      size: '1,000+ employees',
      description: 'Manufacturer of construction materials'
    },
    {
      name: 'Tahaluf',
      industry: 'Technology & Consulting',
      size: '500+ employees',
      description: 'Technology and consulting firm'
    },
    {
      name: 'Weqaya',
      industry: 'Insurance',
      size: '800+ employees',
      description: 'Insurance and risk management company'
    },
    {
      name: 'Al Habtoor Group',
      industry: 'Hospitality & Real Estate',
      size: '12,000+ employees',
      description: 'Conglomerate with interests in hospitality and real estate'
    },
    {
      name: 'Al Faisaliah Group',
      industry: 'Diversified Business',
      size: '8,000+ employees',
      description: 'Diversified business group'
    },
    {
      name: 'Al Shoula Group',
      industry: 'Transportation & Logistics',
      size: '3,000+ employees',
      description: 'Transportation and logistics company'
    }
  ],
  'Jeddah': [
    {
      name: 'E. A. Juffali and Brothers',
      industry: 'Diversified Business',
      size: '50,000+ employees',
      description: 'Largest private enterprise in Saudi Arabia'
    },
    {
      name: 'Al-Dawaa Pharmacies',
      industry: 'Healthcare & Pharmaceuticals',
      size: '8,000+ employees',
      description: 'Leading pharmacy chain'
    },
    {
      name: 'Jarir Bookstore',
      industry: 'Retail & Electronics',
      size: '5,000+ employees',
      description: 'Retailer of books, electronics, and office supplies'
    },
    {
      name: 'Al-Futtaim Group',
      industry: 'Retail & Automotive',
      size: '35,000+ employees',
      description: 'Retail and automotive conglomerate'
    },
    {
      name: 'Al-Muhaidib Group',
      industry: 'Diversified Business',
      size: '15,000+ employees',
      description: 'Diversified business group'
    },
    {
      name: 'Alireza Group',
      industry: 'Diversified Business',
      size: '20,000+ employees',
      description: 'Conglomerate with interests in various sectors'
    },
    {
      name: 'Al-Zamil Group',
      industry: 'Industrial & Manufacturing',
      size: '10,000+ employees',
      description: 'Industrial and manufacturing company'
    },
    {
      name: 'Al-Bilad Bank',
      industry: 'Banking & Financial Services',
      size: '3,000+ employees',
      description: 'Banking and financial services provider'
    },
    {
      name: 'Al-Khodari Sons Company',
      industry: 'Construction & Contracting',
      size: '5,000+ employees',
      description: 'Construction and contracting firm'
    },
    {
      name: 'Al-Suwaidi Industrial Services',
      industry: 'Industrial Services',
      size: '2,000+ employees',
      description: 'Provider of industrial services'
    }
  ],
  'Khobar': [
    {
      name: 'Sipchem',
      industry: 'Petrochemicals',
      size: '3,000+ employees',
      description: 'Petrochemical company'
    },
    {
      name: 'Saudi Aramco',
      industry: 'Oil & Gas',
      size: '15,000+ employees',
      description: 'Oil and gas company with significant operations in Khobar'
    },
    {
      name: 'Al-Khobar International School',
      industry: 'Education',
      size: '500+ employees',
      description: 'Educational institution'
    },
    {
      name: 'Al Khobar International Trading',
      industry: 'Trading & Commerce',
      size: '1,000+ employees',
      description: 'Trading company'
    },
    {
      name: 'Al Khobar Industrial Company',
      industry: 'Industrial Manufacturing',
      size: '2,000+ employees',
      description: 'Industrial manufacturing firm'
    }
  ],
  'Dammam': [
    {
      name: 'Saudi Aramco',
      industry: 'Oil & Gas',
      size: '20,000+ employees',
      description: 'Oil and gas company with major operations in Dammam'
    },
    {
      name: 'Saudi Electricity Company',
      industry: 'Utilities',
      size: '5,000+ employees',
      description: 'Electricity provider with facilities in Dammam'
    },
    {
      name: 'Al Khobar International Trading',
      industry: 'Trading & Commerce',
      size: '800+ employees',
      description: 'Trading company with a presence in Dammam'
    },
    {
      name: 'Al Khobar Industrial Company',
      industry: 'Industrial Manufacturing',
      size: '1,500+ employees',
      description: 'Industrial manufacturing firm operating in Dammam'
    },
    {
      name: 'Dammam Industrial Company',
      industry: 'Industrial Manufacturing',
      size: '2,000+ employees',
      description: 'Industrial manufacturing company'
    }
  ],
  'Mecca': [
    {
      name: 'Saudi Binladin Group',
      industry: 'Construction & Contracting',
      size: '100,000+ employees',
      description: 'Construction and contracting company'
    },
    {
      name: 'Al Haramain Railway',
      industry: 'Transportation',
      size: '2,000+ employees',
      description: 'Transportation company operating the high-speed rail'
    },
    {
      name: 'Al-Madina Al-Munawara Company',
      industry: 'Real Estate Development',
      size: '1,000+ employees',
      description: 'Real estate development firm'
    },
    {
      name: 'Al-Balad Al-Ameen',
      industry: 'Urban Development',
      size: '1,500+ employees',
      description: 'Urban development company'
    },
    {
      name: 'Al-Ansar Group',
      industry: 'Diversified Business',
      size: '5,000+ employees',
      description: 'Diversified business group'
    }
  ],
  'Medina': [
    {
      name: 'Saudi Binladin Group',
      industry: 'Construction & Contracting',
      size: '80,000+ employees',
      description: 'Construction and contracting company'
    },
    {
      name: 'Al-Madina Al-Munawara Company',
      industry: 'Real Estate Development',
      size: '800+ employees',
      description: 'Real estate development firm'
    },
    {
      name: 'Al-Balad Al-Ameen',
      industry: 'Urban Development',
      size: '1,200+ employees',
      description: 'Urban development company'
    },
    {
      name: 'Al-Ansar Group',
      industry: 'Diversified Business',
      size: '4,000+ employees',
      description: 'Diversified business group'
    },
    {
      name: 'Al-Madina Media Group',
      industry: 'Media & Publishing',
      size: '500+ employees',
      description: 'Media and publishing company'
    }
  ]
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

// Individual job titles mapping to URL-friendly names
export const INDIVIDUAL_JOBS_URL_MAP: Record<string, string> = {
  // Domestic & Personal Care Workers
  'Nanny (Childcare Worker)': 'nanny-childcare-worker',
  'Housemaid': 'housemaid',
  'Cook (Home-based)': 'cook-home-based',
  'Elderly Caregiver': 'elderly-caregiver',
  'Babysitter': 'babysitter',
  'Domestic Helper': 'domestic-helper',
  'Governess (Live-in Tutor/Nanny)': 'governess-live-in-tutor-nanny',
  'Housekeeper (Residential)': 'housekeeper-residential',
  'Personal Attendant': 'personal-attendant',
  'Live-in Maid': 'live-in-maid',
  'Maid': 'maid',

  // Construction & Infrastructure
  'Construction Laborer': 'construction-laborer',
  'Mason': 'mason',
  'Carpenter': 'carpenter',
  'Electrician': 'electrician',
  'Plumber': 'plumber',
  'Welder': 'welder',
  'Painter': 'painter',
  'Steel Fixer': 'steel-fixer',
  'Scaffold Worker': 'scaffold-worker',
  'Tile Setter': 'tile-setter',
  'HVAC Technician': 'hvac-technician',
  'Crane Operator': 'crane-operator',
  'Heavy Equipment Operator': 'heavy-equipment-operator',
  'Site Supervisor': 'site-supervisor',
  'Road Construction Worker': 'road-construction-worker',
  'Construction Worker': 'construction-worker',

  // Mechanical & Technical
  'Auto Mechanic': 'auto-mechanic',
  'Diesel Mechanic': 'diesel-mechanic',
  'Machine Operator': 'machine-operator',
  'CNC Machine Operator': 'cnc-machine-operator',
  'Fitter': 'fitter',
  'Maintenance Technician': 'maintenance-technician',
  'Elevator Technician': 'elevator-technician',
  'AC Technician': 'ac-technician',
  'Forklift Operator': 'forklift-operator',
  'Lathe Machine Operator': 'lathe-machine-operator',
  'Mechanic': 'mechanic',

  // Manufacturing & Factory
  'Factory Worker': 'factory-worker',
  'Assembly Line Worker': 'assembly-line-worker',
  'Packer': 'packer',
  'Warehouse Associate': 'warehouse-associate',
  'Quality Checker': 'quality-checker',
  'Production Supervisor': 'production-supervisor',
  'Fabricator': 'fabricator',
  'Loader/Unloader': 'loader-unloader',
  'Warehouse Worker': 'warehouse-worker',

  // Transport & Logistics
  'Truck Driver': 'truck-driver',
  'Delivery Driver': 'delivery-driver',
  'Bus Driver': 'bus-driver',
  'Light Vehicle Driver': 'light-vehicle-driver',
  'Logistics Assistant': 'logistics-assistant',
  'Dispatch Coordinator': 'dispatch-coordinator',
  'Heavy Vehicle Driver': 'heavy-vehicle-driver',
  'Driver': 'driver',

  // Cleaning & Maintenance
  'Cleaner': 'cleaner',
  'Housekeeping Staff': 'housekeeping-staff',
  'Janitor': 'janitor',
  'Building Maintenance Worker': 'building-maintenance-worker',
  'Car Wash Attendant': 'car-wash-attendant',
  'Office Cleaner': 'office-cleaner',

  // Hospitality & Food
  'Cook': 'cook',
  'Kitchen Helper': 'kitchen-helper',
  'Waiter': 'waiter',
  'Dishwasher': 'dishwasher',
  'Restaurant Cleaner': 'restaurant-cleaner',
  'Barista': 'barista',
  'Food Delivery Rider': 'food-delivery-rider',

  // Security & General Services
  'Security Guard': 'security-guard',
  'Watchman': 'watchman',
  'Lifeguard': 'lifeguard',
  'Maintenance Helper': 'maintenance-helper',
  'General Helper': 'general-helper',

  // Garments & Tailoring
  'Tailor': 'tailor',
  'Ironing Staff': 'ironing-staff',
  'Textile Factory Worker': 'textile-factory-worker',

  // Agriculture & Farming
  'Farm Worker': 'farm-worker',
  'Livestock Handler': 'livestock-handler',
  'Greenhouse Worker': 'greenhouse-worker',
  'Gardener': 'gardener',

  // Other Common Jobs
  'Petrol Pump Attendant': 'petrol-pump-attendant',
  'Office Boy': 'office-boy',
  'Tea Boy': 'tea-boy',
  'Baggage Handler': 'baggage-handler',
  'Laundry Worker': 'laundry-worker',
  'Pest Control Worker': 'pest-control-worker'
}

// Job categories mapping to simplified URL-friendly names (keeping for backward compatibility)
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

// All supported cities by country
export const UAE_CITIES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ras Al Khaimah',
  'Fujairah',
  'Ajman'
]

export const SAUDI_ARABIA_CITIES = [
  'Riyadh',
  'Jeddah',
  'Khobar',
  'Dammam',
  'Mecca',
  'Medina'
]

export const QATAR_CITIES = [
  'Doha'
]

export const ALL_CITIES = [...UAE_CITIES, ...SAUDI_ARABIA_CITIES, ...QATAR_CITIES]

export function getCityDisplayName(citySlug: string): string {
  const cityMap: Record<string, string> = {
    // UAE Cities
    'dubai': 'Dubai',
    'abu-dhabi': 'Abu Dhabi',
    'sharjah': 'Sharjah',
    'ras-al-khaimah': 'Ras Al Khaimah',
    'fujairah': 'Fujairah',
    'ajman': 'Ajman',
    // Saudi Arabia Cities
    'riyadh': 'Riyadh',
    'jeddah': 'Jeddah',
    'khobar': 'Khobar',
    'dammam': 'Dammam',
    'mecca': 'Mecca',
    'medina': 'Medina',
    // Qatar Cities
    'doha': 'Doha'
  }
  return cityMap[citySlug] || citySlug
}

export function getJobDisplayName(jobSlug: string): string {
  // Reverse lookup from INDIVIDUAL_JOBS_URL_MAP
  for (const [displayName, slug] of Object.entries(INDIVIDUAL_JOBS_URL_MAP)) {
    if (slug === jobSlug) {
      return displayName
    }
  }
  return jobSlug
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

export function getCompaniesForCity(city: string): Company[] {
  return UAE_COMPANIES[city] || SAUDI_ARABIA_COMPANIES[city] || QATAR_COMPANIES[city] || []
}

export function getCityCountry(city: string): string {
  if (UAE_CITIES.includes(city)) return 'UAE'
  if (SAUDI_ARABIA_CITIES.includes(city)) return 'Saudi Arabia'
  if (QATAR_CITIES.includes(city)) return 'Qatar'
  return 'Unknown'
}
