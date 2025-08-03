const { generateDummyWorkers } = require('./code/utils/dummyData.ts');

const GULF_REGIONS = {
  UAE: {
    currency: 'AED',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain']
  },
  Qatar: {
    currency: 'QAR', 
    cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen']
  },
  'Saudi Arabia': {
    currency: 'SAR',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif']
  },
  Oman: {
    currency: 'OMR',
    cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi']
  },
  Kuwait: {
    currency: 'KWD',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya']
  },
  Bahrain: {
    currency: 'BHD',
    cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
  }
}

try {
  const workers = generateDummyWorkers();
  
  // Calculate total cities
  const totalCities = Object.values(GULF_REGIONS).reduce((total, region) => total + region.cities.length, 0);
  
  // Calculate job types
  const jobTypes = [...new Set(workers.map(w => w.jobTitle))];
  const totalJobTypes = jobTypes.length;
  
  console.log('=== GO GET HIRE STATISTICS ===');
  console.log('Total Job Profiles:', workers.length);
  console.log('Total Cities:', totalCities);
  console.log('Total Job Types:', totalJobTypes);
  console.log('');
  console.log('Cities by Country:');
  Object.entries(GULF_REGIONS).forEach(([country, data]) => {
    console.log(`  ${country}: ${data.cities.length} cities`);
  });
  console.log('');
  console.log('Job Types:', jobTypes.sort());
} catch (error) {
  console.error('Error:', error);
}
