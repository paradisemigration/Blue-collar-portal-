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
  | 'Driver'
  | 'Maid'
  | 'Electrician'
  | 'Plumber'
  | 'Cleaner'
  | 'Carpenter'
  | 'Painter'
  | 'Security Guard'
  | 'Cook'
  | 'Gardener'
  | 'Mechanic'
  | 'Construction Worker'
  | 'Delivery Driver'
  | 'Warehouse Worker'
  | 'Office Boy'
  | 'AC Technician'
  | 'Welder'
  | 'Mason'
  | 'Tile Setter'
  | 'Roofer'
  | 'Glazier'
  | 'Heavy Equipment Operator'
  | 'Crane Operator'
  | 'Forklift Operator'
  | 'Steel Fixer'
  | 'Pipe Fitter'
  | 'HVAC Technician'
  | 'Concrete Mixer'
  | 'Excavator Operator'
  | 'Road Worker'
  | 'Building Maintenance'
  | 'Pool Cleaner'
  | 'Landscaper'
  | 'Window Cleaner'
  | 'Pest Control Technician'
  | 'Laundry Worker'
  | 'Dishwasher'
  | 'Food Preparation Worker'
  | 'Kitchen Helper'
  | 'Waiter'
  | 'Barista'
  | 'Cashier'
  | 'Shop Assistant'
  | 'Inventory Clerk'
  | 'Packer'
  | 'Loading Worker'
  | 'Moving Helper'
  | 'Cleaning Supervisor'
  | 'Maintenance Supervisor';

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
  visaStatus?: 'Available' | 'Not Available';
  languages?: string[];
}
