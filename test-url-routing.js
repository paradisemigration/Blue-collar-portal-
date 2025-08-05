// Test URL routing for housekeeping-staff
const testRouting = () => {
  // Test job slug conversion
  const jobSlug = 'housekeeping-staff'
  const formattedJob = jobSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  console.log('Job slug:', jobSlug)
  console.log('Formatted job:', formattedJob) // Should be "Housekeeping Staff"
  
  // Test if it's in valid jobs list
  const validJobs = [
    'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
    'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',
    'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
    'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
    'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',
    'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
    'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',
    'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
    'Production Supervisor', 'Fabricator', 'Loader/Unloader',
    'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
    'Dispatch Coordinator', 'Heavy Vehicle Driver',
    'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner',
    'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista (basic)', 'Food Delivery Rider',
    'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper',
    'Tailor', 'Ironing Staff', 'Textile Factory Worker',
    'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',
    'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker',
    'Driver', 'Maid', 'Gardener', 'Mechanic', 'Construction Worker', 'Warehouse Worker'
  ]
  
  console.log('Is "Housekeeping Staff" in valid jobs?', validJobs.includes('Housekeeping Staff'))
  
  // Test city slug conversion
  const citySlug = 'doha'
  const formattedCity = citySlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  console.log('City slug:', citySlug)
  console.log('Formatted city:', formattedCity) // Should be "Doha"
  
  const validCities = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
    'Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen',
    'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif',
    'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi',
    'Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya',
    'Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'
  ]
  
  console.log('Is "Doha" in valid cities?', validCities.includes('Doha'))
}

testRouting()
