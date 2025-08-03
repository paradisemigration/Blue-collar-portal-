import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  StarIcon,
  CheckBadgeIcon,
  EyeIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City } from '../../../types'
import { generateDummyWorkers, getCurrencyDisplayForCity } from '../../../utils/dummyData'

// Load actual user data from localStorage and combine with dummy data
const loadWorkers = (): Worker[] => {
  try {
    const workers: Worker[] = []

    // Load individual profile
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      workers.push(JSON.parse(userProfile))
    }

    // Load all profiles
    const allProfiles = localStorage.getItem('allUserProfiles')
    if (allProfiles) {
      const profiles = JSON.parse(allProfiles)
      profiles.forEach((profile: Worker) => {
        if (!workers.find(w => w.id === profile.id)) {
          workers.push(profile)
        }
      })
    }

    // Add comprehensive dummy data
    const dummyWorkers = generateDummyWorkers()
    dummyWorkers.forEach((dummyWorker) => {
      if (!workers.find(w => w.id === dummyWorker.id)) {
        workers.push(dummyWorker)
      }
    })

    return workers
  } catch (error) {
    console.error('Error loading workers:', error)
    return generateDummyWorkers() // Fallback to dummy data
  }
}

const validCities: City[] = [
  'dubai', 'abu-dhabi', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain',
  'doha', 'al-rayyan', 'al-wakrah', 'riyadh', 'jeddah', 'dammam', 'mecca', 'medina',
  'muscat', 'salalah', 'sohar', 'kuwait-city', 'hawalli', 'manama', 'riffa'
]

const validJobs: JobTitle[] = [
  'driver', 'maid', 'electrician', 'plumber', 'cleaner', 'carpenter', 
  'painter', 'security-guard', 'cook', 'gardener', 'mechanic', 
  'construction-worker', 'delivery-driver', 'warehouse-worker', 'office-boy'
]

function formatCityName(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function formatJobTitle(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function citySlugToDisplayName(slug: string): City {
  const formatted = formatCityName(slug)
  // Handle special cases
  const cityMap: Record<string, City> = {
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Kuwait City': 'Kuwait City'
  }
  return (cityMap[formatted] as City) || (formatted as City)
}

function jobSlugToDisplayName(slug: string): JobTitle {
  const formatted = formatJobTitle(slug)
  // Handle special cases
  const jobMap: Record<string, JobTitle> = {
    'Security Guard': 'Security Guard',
    'Construction Worker': 'Construction Worker',
    'Delivery Driver': 'Delivery Driver',
    'Warehouse Worker': 'Warehouse Worker',
    'Office Boy': 'Office Boy'
  }
  return (jobMap[formatted] as JobTitle) || (formatted as JobTitle)
}

interface PageProps {
  params: {
    city: string
    job: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const cityName = formatCityName(params.city)
  const jobTitle = formatJobTitle(params.job)
  const url = `/${params.city}/${params.job}`

  // Try to load custom SEO data
  let customSEO = null
  try {
    if (typeof window !== 'undefined') {
      const savedSEO = localStorage.getItem('seoCustomizations')
      if (savedSEO) {
        const customizations = JSON.parse(savedSEO)
        customSEO = customizations[url]
      }
    }
  } catch (error) {
    console.error('Error loading SEO data:', error)
  }

  return {
    title: customSEO?.title || `Hire Verified ${jobTitle}s in ${cityName} | Gulf Hiring Platform`,
    description: customSEO?.description || `Find experienced ${jobTitle.toLowerCase()}s in ${cityName}. Browse verified profiles, check reviews, and hire skilled professionals for your business needs.`,
    keywords: customSEO?.keywords || `${jobTitle.toLowerCase()}, ${cityName.toLowerCase()}, hire, jobs, workers, gulf`,
  }
}

export default function CityJobPage({ params }: PageProps) {
  // Validate URL parameters
  if (!validCities.includes(params.city.toLowerCase() as City) ||
      !validJobs.includes(params.job.toLowerCase() as JobTitle)) {
    notFound()
  }

  const cityDisplay = citySlugToDisplayName(params.city)
  const jobDisplay = jobSlugToDisplayName(params.job)
  const localCurrency = getCurrencyDisplayForCity(params.city)

  // Load real workers and filter by city and job
  const allWorkers = loadWorkers()
  const filteredWorkers = allWorkers.filter(worker =>
    worker.city.toLowerCase().replace(/\s+/g, '-') === params.city.toLowerCase() &&
    worker.jobTitle.toLowerCase().replace(/\s+/g, '-') === params.job.toLowerCase()
  )

  const averageSalary = filteredWorkers.length > 0 
    ? Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.expectedSalary, 0) / filteredWorkers.length)
    : 0

  const faqs = [
    {
      question: `How much does it cost to hire a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
      answer: `The average salary for ${jobDisplay.toLowerCase()}s in ${cityDisplay} ranges from ${localCurrency} 2,000 to ${localCurrency} 5,000 per month, depending on experience and qualifications.`
    },
    {
      question: `Are all ${jobDisplay.toLowerCase()} profiles verified?`,
      answer: `Yes, all worker profiles on our platform are verified with proper documentation, background checks, and skill assessments.`
    },
    {
      question: `How quickly can I hire a ${jobDisplay.toLowerCase()}?`,
      answer: `Most employers connect with suitable candidates within 24-48 hours. The hiring process can be completed within a week.`
    },
    {
      question: `What if I'm not satisfied with the ${jobDisplay.toLowerCase()} I hired?`,
      answer: `We offer support throughout the hiring process and can help you find alternative candidates if needed.`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire Verified {jobDisplay}s in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Connect with skilled and experienced {jobDisplay.toLowerCase()}s in {cityDisplay}. 
              All profiles are verified and ready to work.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{filteredWorkers.length}</div>
                <div className="text-gray-200">Available {jobDisplay}s</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{localCurrency} {averageSalary}</div>
                <div className="text-gray-200">Average Salary</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">24h</div>
                <div className="text-gray-200">Average Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/browse" className="text-gray-500 hover:text-primary-600">Browse Workers</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{cityDisplay} {jobDisplay}s</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredWorkers.length > 0 ? (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="card hover:shadow-lg transition-shadow">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={worker.profilePicture}
                      alt={worker.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy-900">{worker.fullName}</h3>
                      <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {worker.city}, {worker.country}
                      </div>
                    </div>
                    {(worker.visaStatus === 'Work Visa' || worker.visaStatus === 'Freelance Visa') && (
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" title={worker.visaStatus} />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.yearsExperience}</div>
                      <div className="text-gray-600 text-sm">Years Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.expectedSalary}</div>
                      <div className="text-gray-600 text-sm">{localCurrency}/Month</div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-700 mb-2">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {worker.languagesSpoken.slice(0, 3).map((lang) => (
                        <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About Me Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {worker.aboutMe}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      Unlock Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600 text-white rounded-lg p-8 text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Hire?</h3>
              <p className="text-lg mb-6 text-gray-200">
                Subscribe now to unlock contact details and connect with {jobDisplay.toLowerCase()}s directly
              </p>
              <Link href="/pricing" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block">
                View Pricing Plans
              </Link>
            </div>
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <BriefcaseIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {jobDisplay}s found in {cityDisplay}
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new profiles. Check back soon or browse other locations.
            </p>
            <Link href="/browse" className="btn-primary">
              Browse All Workers
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for common routes
export async function generateStaticParams() {
  const commonRoutes = [
    { city: 'dubai', job: 'maid' },
    { city: 'dubai', job: 'driver' },
    { city: 'abu-dhabi', job: 'cleaner' },
    { city: 'doha', job: 'driver' },
    { city: 'riyadh', job: 'electrician' },
    { city: 'muscat', job: 'plumber' }
  ]
  
  return commonRoutes
}
