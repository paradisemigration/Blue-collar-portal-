'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { 
  getCompaniesForCity,
  getCityDisplayName, 
  getJobDisplayName,
  getCityCountry,
  ALL_CITIES,
  INDIVIDUAL_JOBS_URL_MAP,
  JOB_CATEGORIES_URL_MAP,
  Company
} from '../../../../utils/companiesData'

interface PageProps {
  params: {
    city: string
    job: string
  }
}

// Function to get category from job title
function getCategoryFromJob(jobSlug: string): string {
  const jobCategories: Record<string, string> = {
    // Domestic & Personal Care Workers
    'nanny-childcare-worker': 'domestic-workers',
    'housemaid': 'domestic-workers',
    'cook-home-based': 'domestic-workers',
    'elderly-caregiver': 'domestic-workers',
    'babysitter': 'domestic-workers',
    'domestic-helper': 'domestic-workers',
    'governess-live-in-tutor-nanny': 'domestic-workers',
    'housekeeper-residential': 'domestic-workers',
    'personal-attendant': 'domestic-workers',
    'live-in-maid': 'domestic-workers',
    'maid': 'domestic-workers',

    // Construction & Infrastructure
    'construction-laborer': 'construction-workers',
    'mason': 'construction-workers',
    'carpenter': 'construction-workers',
    'electrician': 'construction-workers',
    'plumber': 'construction-workers',
    'welder': 'construction-workers',
    'painter': 'construction-workers',
    'steel-fixer': 'construction-workers',
    'scaffold-worker': 'construction-workers',
    'tile-setter': 'construction-workers',
    'hvac-technician': 'construction-workers',
    'crane-operator': 'construction-workers',
    'heavy-equipment-operator': 'construction-workers',
    'site-supervisor': 'construction-workers',
    'road-construction-worker': 'construction-workers',
    'construction-worker': 'construction-workers',

    // Mechanical & Technical
    'auto-mechanic': 'technical-workers',
    'diesel-mechanic': 'technical-workers',
    'machine-operator': 'technical-workers',
    'cnc-machine-operator': 'technical-workers',
    'fitter': 'technical-workers',
    'maintenance-technician': 'technical-workers',
    'elevator-technician': 'technical-workers',
    'ac-technician': 'technical-workers',
    'forklift-operator': 'technical-workers',
    'lathe-machine-operator': 'technical-workers',
    'mechanic': 'technical-workers',

    // Manufacturing & Factory
    'factory-worker': 'factory-workers',
    'assembly-line-worker': 'factory-workers',
    'packer': 'factory-workers',
    'warehouse-associate': 'factory-workers',
    'quality-checker': 'factory-workers',
    'production-supervisor': 'factory-workers',
    'fabricator': 'factory-workers',
    'loader-unloader': 'factory-workers',
    'warehouse-worker': 'factory-workers',

    // Transport & Logistics
    'truck-driver': 'driver',
    'delivery-driver': 'driver',
    'bus-driver': 'driver',
    'light-vehicle-driver': 'driver',
    'logistics-assistant': 'driver',
    'dispatch-coordinator': 'driver',
    'heavy-vehicle-driver': 'driver',
    'driver': 'driver',

    // Cleaning & Maintenance
    'cleaner': 'cleaning-workers',
    'housekeeping-staff': 'cleaning-workers',
    'janitor': 'cleaning-workers',
    'building-maintenance-worker': 'cleaning-workers',
    'car-wash-attendant': 'cleaning-workers',
    'office-cleaner': 'cleaning-workers',

    // Hospitality & Food
    'cook': 'hospitality-workers',
    'kitchen-helper': 'hospitality-workers',
    'waiter': 'hospitality-workers',
    'dishwasher': 'hospitality-workers',
    'restaurant-cleaner': 'hospitality-workers',
    'barista': 'hospitality-workers',
    'food-delivery-rider': 'hospitality-workers',

    // Security & General Services
    'security-guard': 'security-workers',
    'watchman': 'security-workers',
    'lifeguard': 'security-workers',
    'maintenance-helper': 'security-workers',
    'general-helper': 'security-workers',

    // Garments & Tailoring
    'tailor': 'tailoring-workers',
    'ironing-staff': 'tailoring-workers',
    'textile-factory-worker': 'tailoring-workers',

    // Agriculture & Farming
    'farm-worker': 'farming-workers',
    'livestock-handler': 'farming-workers',
    'greenhouse-worker': 'farming-workers',
    'gardener': 'farming-workers',

    // Other Common Jobs
    'petrol-pump-attendant': 'general-workers',
    'office-boy': 'general-workers',
    'tea-boy': 'general-workers',
    'baggage-handler': 'general-workers',
    'laundry-worker': 'general-workers',
    'pest-control-worker': 'general-workers'
  }
  
  return jobCategories[jobSlug] || 'general-workers'
}

// Function to get category display name from category slug
function getCategoryDisplayName(categorySlug: string): string {
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

export default function JobPage({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const cityDisplay = getCityDisplayName(params.city)
  const jobDisplay = getJobDisplayName(params.job)
  const country = getCityCountry(cityDisplay)
  const categorySlug = getCategoryFromJob(params.job)
  const categoryDisplay = getCategoryDisplayName(categorySlug)
  
  // Validate URL parameters
  useEffect(() => {
    const validCities = ALL_CITIES.map(city => city.toLowerCase().replace(/\s+/g, '-'))
    const validJobs = Object.values(INDIVIDUAL_JOBS_URL_MAP)
    
    if (!validCities.includes(params.city) || !validJobs.includes(params.job)) {
      router.push('/browse')
      return
    }
    
    setIsLoading(false)
  }, [params.city, params.job, router])

  const companies = getCompaniesForCity(cityDisplay)

  // Generate job-specific FAQs
  const generateJobFAQs = () => {
    const baseFAQs = [
      {
        question: `How many ${jobDisplay.toLowerCase()} job openings are available in ${cityDisplay}?`,
        answer: `We currently feature ${companies.length} companies in ${cityDisplay} that regularly hire ${jobDisplay.toLowerCase()}. New positions are posted weekly, and you can apply to multiple companies simultaneously through our platform.`
      },
      {
        question: `What qualifications do I need for ${jobDisplay.toLowerCase()} jobs in ${cityDisplay}?`,
        answer: `Requirements vary by company and specific role. Generally, relevant experience, proper documentation (visa/work permit), and language skills (English/Arabic) are preferred. Many companies also provide on-the-job training for the right candidates.`
      },
      {
        question: `How quickly can I get hired for ${jobDisplay.toLowerCase()} positions in ${cityDisplay}?`,
        answer: `The hiring process typically takes 1-3 weeks from application to job offer. Companies in ${cityDisplay} often have urgent hiring needs, especially for skilled ${jobDisplay.toLowerCase()}, so qualified candidates can expect quick responses.`
      },
      {
        question: `What is the average salary for ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Salaries for ${jobDisplay.toLowerCase()} in ${cityDisplay} vary based on experience, company size, and specific role. Most positions offer competitive packages including accommodation, transportation, and health insurance benefits in ${country}.`
      },
      {
        question: `Do these companies provide visa sponsorship for ${jobDisplay.toLowerCase()}?`,
        answer: `Most companies listed provide visa sponsorship for qualified candidates. During the application process, you can specify your visa requirements, and companies will indicate if they can provide sponsorship for ${country} work permits.`
      },
      {
        question: `What are the typical working conditions for ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Working conditions for ${jobDisplay.toLowerCase()} in ${cityDisplay} are regulated by ${country} labor laws. Most positions include proper safety equipment, regular breaks, and compliance with international workplace standards.`
      },
      {
        question: `Can I apply to multiple companies at once for ${jobDisplay.toLowerCase()} positions?`,
        answer: `Yes! Our platform allows you to apply to multiple companies simultaneously. This increases your chances of finding the right opportunity and gives you options to choose from different offers for ${jobDisplay.toLowerCase()} positions.`
      },
      {
        question: `What documents do I need to apply for ${jobDisplay.toLowerCase()} jobs?`,
        answer: `You'll typically need: updated CV/resume, passport copy, educational certificates, experience letters from previous employers, and any relevant professional certifications or licenses specific to ${jobDisplay.toLowerCase()} work.`
      }
    ]
    
    return baseFAQs.slice(0, 8) // Return 8 FAQs
  }

  const faqs = generateJobFAQs()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest {jobDisplay} Jobs Opening in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
              Apply online to top companies hiring {jobDisplay.toLowerCase()} in {cityDisplay}, {country}. 
              Start your career with verified employers today.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{companies.length}</div>
                <div className="text-gray-200 text-sm">Companies Hiring</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">24h</div>
                <div className="text-gray-200 text-sm">Quick Response</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">100%</div>
                <div className="text-gray-200 text-sm">Verified Companies</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">Free</div>
                <div className="text-gray-200 text-sm">Application</div>
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
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/jobs" className="text-gray-500 hover:text-primary-600">Jobs</Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <Link href={`/jobs/${params.city}/${categorySlug}`} className="text-gray-500 hover:text-primary-600">
              {categoryDisplay} in {cityDisplay}
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{jobDisplay} Jobs</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
              {companies.length} Top Companies Hiring {jobDisplay} in {cityDisplay}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {cityDisplay} offers excellent opportunities for {jobDisplay.toLowerCase()} with competitive salaries, 
              comprehensive benefits, and career growth potential. Apply directly to verified companies and 
              get hired faster through our streamlined application process in {country}.
            </p>
          </div>

          {/* Quick Apply Section */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-navy-900 mb-3">Quick Apply to All Companies</h3>
              <p className="text-gray-700 mb-4">
                Create your profile once and apply to multiple companies with a single click
              </p>
              <Link 
                href="/create-profile" 
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
              >
                Create Profile & Apply Now
              </Link>
            </div>
          </div>

          {/* Related Category Link */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Looking for all {categoryDisplay} jobs?
              </h3>
              <p className="text-gray-600 mb-4">
                View all job opportunities in the {categoryDisplay} category in {cityDisplay}
              </p>
              <Link 
                href={`/jobs/${params.city}/${categorySlug}`}
                className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 hover:border-primary-700 font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
              >
                View All {categoryDisplay} Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">
            Companies Hiring {jobDisplay} in {cityDisplay}
          </h3>
          
          <div className="grid gap-6">
            {companies.map((company: Company, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-navy-900 mb-2">{company.name}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <BriefcaseIcon className="h-4 w-4" />
                            {company.industry}
                          </div>
                          <div className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4" />
                            {company.size}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            {cityDisplay}, {country}
                          </div>
                        </div>
                        <p className="text-gray-700">{company.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:ml-6">
                    <Link 
                      href="/create-profile"
                      className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Frequently Asked Questions - {jobDisplay} Jobs in {cityDisplay}
          </h3>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h4 className="text-lg font-semibold text-navy-900 mb-3 leading-tight">
                  {faq.question}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
