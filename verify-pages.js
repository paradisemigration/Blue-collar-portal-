// Verification script for total page count
const GULF_REGIONS = {
  UAE: {
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain']
  },
  Qatar: {
    cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen']
  },
  'Saudi Arabia': {
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif']
  },
  Oman: {
    cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi']
  },
  Kuwait: {
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya']
  },
  Bahrain: {
    cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
  }
}

const JOB_TITLES = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
  'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy',
  'AC Technician', 'Welder', 'Mason', 'Tile Setter', 'Roofer', 'Glazier',
  'Heavy Equipment Operator', 'Crane Operator', 'Forklift Operator', 'Steel Fixer',
  'Pipe Fitter', 'HVAC Technician', 'Concrete Mixer', 'Excavator Operator',
  'Road Worker', 'Building Maintenance', 'Pool Cleaner', 'Landscaper',
  'Window Cleaner', 'Pest Control Technician', 'Laundry Worker', 'Dishwasher',
  'Food Preparation Worker', 'Kitchen Helper', 'Waiter', 'Barista', 'Cashier',
  'Shop Assistant', 'Inventory Clerk', 'Packer', 'Loading Worker', 'Moving Helper',
  'Cleaning Supervisor', 'Maintenance Supervisor'
]

// Count cities
const allCities = Object.values(GULF_REGIONS).flatMap(region => region.cities)
const totalCities = allCities.length
const totalJobs = JOB_TITLES.length
const totalPages = totalCities * totalJobs

console.log('=== PAGE COUNT VERIFICATION ===')
console.log(`Cities: ${totalCities}`)
console.log(`Job titles: ${totalJobs}`)
console.log(`Total city/job pages: ${totalPages}`)
console.log('\nCities by country:')
Object.entries(GULF_REGIONS).forEach(([country, data]) => {
  console.log(`${country}: ${data.cities.length} cities`)
})

console.log('\nSample city/job combinations:')
for (let i = 0; i < 5; i++) {
  const city = allCities[i]
  const job = JOB_TITLES[i]
  const citySlug = city.toLowerCase().replace(/\s+/g, '-')
  const jobSlug = job.toLowerCase().replace(/\s+/g, '-')
  console.log(`/${citySlug}/${jobSlug}`)
}

module.exports = { totalCities, totalJobs, totalPages }
