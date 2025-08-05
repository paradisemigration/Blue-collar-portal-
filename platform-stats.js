// Calculate platform statistics

// Cities from GULF_REGIONS
const cities = [
  // UAE: 8 cities
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
  // Qatar: 6 cities  
  'Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen',
  // Saudi Arabia: 10 cities
  'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif',
  // Oman: 7 cities
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi',
  // Kuwait: 6 cities
  'Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya',
  // Bahrain: 6 cities
  'Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'
];

// Job titles from sitemap
const jobTitles = [
  // Domestic & Personal Care Workers (10 jobs)
  'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
  'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',

  // Construction & Infrastructure (15 jobs)
  'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
  'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
  'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',

  // Mechanical & Technical (10 jobs)
  'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
  'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',

  // Manufacturing & Factory (8 jobs)
  'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
  'Production Supervisor', 'Fabricator', 'Loader/Unloader',

  // Transport & Logistics (7 jobs)
  'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
  'Dispatch Coordinator', 'Heavy Vehicle Driver',

  // Cleaning & Maintenance (6 jobs)
  'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner',

  // Hospitality & Food (7 jobs)
  'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista (basic)', 'Food Delivery Rider',

  // Security & General Services (5 jobs)
  'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper',

  // Garments & Tailoring (3 jobs)
  'Tailor', 'Ironing Staff', 'Textile Factory Worker',

  // Agriculture & Farming (3 jobs)
  'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',

  // Other Common Jobs (6 jobs)
  'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker',

  // Legacy job titles for backward compatibility (6 jobs)
  'Driver', 'Maid', 'Gardener', 'Mechanic', 'Construction Worker', 'Warehouse Worker'
];

// Static pages
const staticPages = [
  '/', '/browse', '/create-profile', '/register', '/login', '/employer-login', 
  '/pricing', '/contact', '/help', '/jobs', '/privacy', '/terms', '/dashboard',
  '/employer-dashboard', '/edit-profile', '/profile-preview', '/admin', '/admin-login'
];

console.log('=== PLATFORM STATISTICS ===');
console.log(`Total Cities: ${cities.length}`);
console.log(`Total Job Profiles: ${jobTitles.length}`);
console.log(`City+Job Combination Pages: ${cities.length} × ${jobTitles.length} = ${cities.length * jobTitles.length}`);
console.log(`Static Pages: ${staticPages.length}`);
console.log(`Total Pages: ${(cities.length * jobTitles.length) + staticPages.length}`);
console.log('');
console.log('=== BREAKDOWN BY CATEGORY ===');
console.log('Domestic & Personal Care: 10 jobs');
console.log('Construction & Infrastructure: 15 jobs');
console.log('Mechanical & Technical: 10 jobs');
console.log('Manufacturing & Factory: 8 jobs');
console.log('Transport & Logistics: 7 jobs');
console.log('Cleaning & Maintenance: 6 jobs');
console.log('Hospitality & Food: 7 jobs');
console.log('Security & General Services: 5 jobs');
console.log('Garments & Tailoring: 3 jobs');
console.log('Agriculture & Farming: 3 jobs');
console.log('Other Common Jobs: 6 jobs');
console.log('Legacy job titles: 6 jobs');
console.log('');
console.log('=== CITIES BY COUNTRY ===');
console.log('UAE: 8 cities');
console.log('Qatar: 6 cities');
console.log('Saudi Arabia: 10 cities');
console.log('Oman: 7 cities');
console.log('Kuwait: 6 cities');
console.log('Bahrain: 6 cities');
