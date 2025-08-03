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
  visaStatus: 'Available' | 'Not Available';
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
  | 'Office Boy';

export type City = 
  | 'Dubai'
  | 'Abu Dhabi'
  | 'Sharjah'
  | 'Ajman'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Umm Al Quwain'
  | 'Doha'
  | 'Al Rayyan'
  | 'Al Wakrah'
  | 'Riyadh'
  | 'Jeddah'
  | 'Dammam'
  | 'Mecca'
  | 'Medina'
  | 'Muscat'
  | 'Salalah'
  | 'Sohar'
  | 'Kuwait City'
  | 'Hawalli'
  | 'Manama'
  | 'Riffa';

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
