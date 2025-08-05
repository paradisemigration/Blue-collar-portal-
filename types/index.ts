export interface Worker {
  id: string;
  fullName: string;
  profilePicture: string;
  jobTitle: JobTitle;
  yearsExperience: number;
  city: City;
  country: Country;
  languagesSpoken: string[];
  expectedSalary: number;
  visaStatus: 'Work Visa' | 'Visit Visa' | 'Freelance Visa' | 'Expired Visa' | 'No Visa';
  availability: boolean;
  aboutMe: string;
  phoneNumber: string; // Hidden from public
  email: string; // Hidden from public
  createdAt: Date;
  updatedAt: Date;
}

export interface Employer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  subscriptionPlan: SubscriptionPlan | null;
  creditsRemaining: number;
  createdAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // in AED
  profileAccess: number;
  jobPosts: number;
  isPremium: boolean;
  features: string[];
}

export type JobTitle =
  // Domestic & Personal Care Workers
  | 'Nanny (Childcare Worker)'
  | 'Housemaid'
  | 'Cook (Home-based)'
  | 'Elderly Caregiver'
  | 'Babysitter'
  | 'Domestic Helper'
  | 'Governess (Live-in Tutor/Nanny)'
  | 'Housekeeper (Residential)'
  | 'Personal Attendant'
  | 'Live-in Maid'

  // Construction & Infrastructure
  | 'Construction Laborer'
  | 'Mason'
  | 'Carpenter'
  | 'Electrician'
  | 'Plumber'
  | 'Welder'
  | 'Painter'
  | 'Steel Fixer'
  | 'Scaffold Worker'
  | 'Tile Setter'
  | 'HVAC Technician'
  | 'Crane Operator'
  | 'Heavy Equipment Operator'
  | 'Site Supervisor'
  | 'Road Construction Worker'

  // Mechanical & Technical
  | 'Auto Mechanic'
  | 'Diesel Mechanic'
  | 'Machine Operator'
  | 'CNC Machine Operator'
  | 'Fitter'
  | 'Maintenance Technician'
  | 'Elevator Technician'
  | 'AC Technician'
  | 'Forklift Operator'
  | 'Lathe Machine Operator'

  // Manufacturing & Factory
  | 'Factory Worker'
  | 'Assembly Line Worker'
  | 'Packer'
  | 'Warehouse Associate'
  | 'Quality Checker'
  | 'Production Supervisor'
  | 'Fabricator'
  | 'Loader/Unloader'

  // Transport & Logistics
  | 'Truck Driver'
  | 'Delivery Driver'
  | 'Bus Driver'
  | 'Light Vehicle Driver'
  | 'Logistics Assistant'
  | 'Dispatch Coordinator'
  | 'Heavy Vehicle Driver'

  // Cleaning & Maintenance
  | 'Cleaner'
  | 'Housekeeping Staff'
  | 'Janitor'
  | 'Building Maintenance Worker'
  | 'Car Wash Attendant'
  | 'Office Cleaner'

  // Hospitality & Food
  | 'Cook'
  | 'Kitchen Helper'
  | 'Waiter'
  | 'Dishwasher'
  | 'Restaurant Cleaner'
  | 'Barista'
  | 'Food Delivery Rider'

  // Security & General Services
  | 'Security Guard'
  | 'Watchman'
  | 'Lifeguard'
  | 'Maintenance Helper'
  | 'General Helper'

  // Garments & Tailoring
  | 'Tailor'
  | 'Ironing Staff'
  | 'Textile Factory Worker'

  // Agriculture & Farming
  | 'Farm Worker'
  | 'Livestock Handler'
  | 'Greenhouse Worker'

  // Other Common Jobs
  | 'Petrol Pump Attendant'
  | 'Office Boy'
  | 'Tea Boy'
  | 'Baggage Handler'
  | 'Laundry Worker'
  | 'Pest Control Worker'

  // Legacy job titles for backward compatibility
  | 'Driver'
  | 'Maid'
  | 'Gardener'
  | 'Mechanic'
  | 'Construction Worker'
  | 'Warehouse Worker';

export type City =
  | 'Dubai'
  | 'Abu Dhabi'
  | 'Sharjah'
  | 'Ajman'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Umm Al Quwain'
  | 'Al Ain'
  | 'Doha'
  | 'Al Rayyan'
  | 'Al Wakrah'
  | 'Umm Salal'
  | 'Al Khor'
  | 'Al Daayen'
  | 'Riyadh'
  | 'Jeddah'
  | 'Dammam'
  | 'Mecca'
  | 'Medina'
  | 'Khobar'
  | 'Dhahran'
  | 'Jubail'
  | 'Yanbu'
  | 'Taif'
  | 'Muscat'
  | 'Salalah'
  | 'Sohar'
  | 'Nizwa'
  | 'Sur'
  | 'Rustaq'
  | 'Buraimi'
  | 'Kuwait City'
  | 'Hawalli'
  | 'Salmiya'
  | 'Jahra'
  | 'Ahmadi'
  | 'Farwaniya'
  | 'Manama'
  | 'Riffa'
  | 'Muharraq'
  | 'Hamad Town'
  | 'Isa Town'
  | 'Sitra';

export type Country = 
  | 'UAE'
  | 'Qatar'
  | 'Saudi Arabia'
  | 'Oman'
  | 'Kuwait'
  | 'Bahrain';

export interface JobPost {
  id: string;
  employerId: string;
  title: string;
  description: string;
  jobTitle: JobTitle;
  city: City;
  salaryRange: {
    min: number;
    max: number;
  };
  requirements: string[];
  benefits: string[];
  createdAt: Date;
  isActive: boolean;
}

export interface FilterOptions {
  jobTitle?: JobTitle;
  city?: City;
  minExperience?: number;
  maxExperience?: number;
  minSalary?: number;
  maxSalary?: number;
  visaStatus?: 'Work Visa' | 'Visit Visa' | 'Freelance Visa' | 'Expired Visa' | 'No Visa';
  availability?: boolean;
  languages?: string[];
}
