'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  CheckBadgeIcon,
  ShareIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import {
  getCompaniesForCity,
  getCityDisplayName,
  getCategoryDisplayName,
  getCityCountry,
  ALL_CITIES,
  JOB_CATEGORIES_URL_MAP,
  INDIVIDUAL_JOBS_URL_MAP,
  Company
} from '../../../../utils/companiesData'

// Function to get job display name
function getJobDisplayName(jobSlug: string): string {
  // Reverse lookup from INDIVIDUAL_JOBS_URL_MAP
  for (const [displayName, slug] of Object.entries(INDIVIDUAL_JOBS_URL_MAP)) {
    if (slug === jobSlug) {
      return displayName
    }
  }
  return jobSlug
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

  return jobCategories[jobSlug] || null
}

interface PageProps {
  params: {
    city: string
    category: string
  }
}

export default function JobListingPage({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isIndividualJob, setIsIndividualJob] = useState(false)
  const router = useRouter()

  const cityDisplay = getCityDisplayName(params.city)

  // Determine if this is a category or individual job
  const validCategories = Object.values(JOB_CATEGORIES_URL_MAP)
  const validJobs = Object.values(INDIVIDUAL_JOBS_URL_MAP)
  const isJobSlug = validJobs.includes(params.category)

  // Get appropriate display names based on type
  const jobDisplay = isJobSlug ? getJobDisplayName(params.category) : null
  const categorySlug = isJobSlug ? getCategoryFromJob(params.category) : params.category
  const categoryDisplay = getCategoryDisplayName(categorySlug)
  const country = getCityCountry(cityDisplay)

  // Validate URL parameters
  useEffect(() => {
    const validCities = ALL_CITIES.map(city => city.toLowerCase().replace(/\s+/g, '-'))

    if (!validCities.includes(params.city) || (!validCategories.includes(params.category) && !validJobs.includes(params.category))) {
      router.push('/browse')
      return
    }

    setIsIndividualJob(isJobSlug)
    setIsLoading(false)
  }, [params.city, params.category, router, validCategories, validJobs, isJobSlug])

  const companies = getCompaniesForCity(cityDisplay)

  // Generate category-specific or job-specific FAQs
  const generateFAQs = () => {
    const jobType = isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()
    const jobTypeText = isIndividualJob ? jobDisplay : categoryDisplay

    const baseFAQs = [
      {
        question: `How many ${jobType} job openings are available in ${cityDisplay}?`,
        answer: `We currently feature ${companies.length} companies in ${cityDisplay} that regularly hire ${jobType}. New positions are posted weekly, and you can apply to multiple companies simultaneously through our platform.`
      },
      {
        question: `What qualifications do I need for ${jobType} jobs in ${cityDisplay}?`,
        answer: `Requirements vary by company and specific role. Generally, relevant experience, proper documentation (visa/work permit), and language skills (English/Arabic) are preferred. Many companies also provide on-the-job training for the right candidates.`
      },
      {
        question: `How quickly can I get hired for ${jobType} positions in ${cityDisplay}?`,
        answer: `The hiring process typically takes 1-3 weeks from application to job offer. Companies in ${cityDisplay} often have urgent hiring needs, especially for skilled ${jobType}, so qualified candidates can expect quick responses.`
      },
      {
        question: `What is the average salary for ${jobType} in ${cityDisplay}?`,
        answer: `Salaries for ${jobType} in ${cityDisplay} vary based on experience, company size, and specific role. Most positions offer competitive packages including accommodation, transportation, and health insurance benefits in ${country}.`
      },
      {
        question: `Do these companies provide visa sponsorship for ${jobType}?`,
        answer: `Most companies listed provide visa sponsorship for qualified candidates. During the application process, you can specify your visa requirements, and companies will indicate if they can provide sponsorship for ${country} work permits.`
      },
      {
        question: `Can I apply to multiple companies at once?`,
        answer: `Yes! Our platform allows you to apply to multiple companies simultaneously. This increases your chances of finding the right opportunity and gives you options to choose from different offers.`
      },
      {
        question: `What documents do I need to apply for ${categoryDisplay.toLowerCase()} jobs?`,
        answer: `You'll typically need: updated CV/resume, passport copy, educational certificates, experience letters from previous employers, and any relevant professional certifications or licenses.`
      },
      {
        question: `Are there opportunities for career advancement in ${categoryDisplay.toLowerCase()}?`,
        answer: `Many companies in ${cityDisplay} offer career progression opportunities. With dedication and skill development, ${categoryDisplay.toLowerCase()} can advance to supervisory roles, specialized positions, or even management positions within their field.`
      },
      {
        question: `What benefits do companies typically offer to ${categoryDisplay.toLowerCase()}?`,
        answer: `Standard benefits usually include: monthly salary, accommodation (shared or private), transportation allowance, health insurance, annual leave, end-of-service benefits, and sometimes performance bonuses.`
      },
      {
        question: `How do I prepare for interviews with companies in ${cityDisplay}?`,
        answer: `Research the company background, prepare to discuss your relevant experience, practice common interview questions, dress professionally, and be ready to demonstrate your skills. Companies in ${country} appreciate punctuality and positive attitude.`
      },
      {
        question: `Is it safe to work in ${cityDisplay} as a ${categoryDisplay.toLowerCase()}?`,
        answer: `Yes, ${cityDisplay} has strict labor laws protecting workers' rights. The ${country} government ensures safe working conditions, fair treatment, and proper compensation. All listed companies must comply with ${country} labor regulations.`
      },
      {
        question: `What languages do I need to speak for ${categoryDisplay.toLowerCase()} jobs?`,
        answer: `English is widely used in most companies. Basic Arabic knowledge is helpful but not always required. Some companies also value Hindi, Urdu, Filipino, or other languages depending on their client base and team composition.`
      },
      {
        question: `Can I change jobs once I'm working in ${cityDisplay}?`,
        answer: `Yes, ${country} labor laws allow job changes. However, there are specific procedures to follow, and you may need a No Objection Certificate (NOC) from your current employer or wait for the end of your contract period.`
      },
      {
        question: `How long are typical employment contracts for ${categoryDisplay.toLowerCase()}?`,
        answer: `Employment contracts are usually 2-3 years for ${categoryDisplay.toLowerCase()}. Some companies offer renewable contracts, and exceptional performers may receive longer-term agreements or permanent positions.`
      },
      {
        question: `What is the working schedule like for ${categoryDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Working hours vary by company and role. Most follow a 6-day work week with 8-10 hour shifts. Some positions may require shift work, overtime, or weekend duties, which are typically compensated according to ${country} labor law.`
      }
    ]
    
    return baseFAQs.slice(0, 12) // Return 12 FAQs
  }

  const faqs = generateFAQs()

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": `${isIndividualJob ? jobDisplay : categoryDisplay} Jobs in ${cityDisplay}`,
    "description": `Find ${isIndividualJob ? jobDisplay?.toLowerCase() : categoryDisplay.toLowerCase()} opportunities in ${cityDisplay}, ${country}. Apply to verified companies with competitive salaries and benefits.`,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Go Get Hires",
      "sameAs": "https://www.gogethires.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityDisplay,
        "addressCountry": country
      }
    },
    "employmentType": "FULL_TIME",
    "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    "datePosted": new Date().toISOString(),
    "industry": isIndividualJob ? jobDisplay : categoryDisplay,
    "occupationalCategory": categoryDisplay,
    "workHours": "Full-time",
    "salaryCurrency": country === 'UAE' ? 'AED' : country === 'Qatar' ? 'QAR' : country === 'Saudi Arabia' ? 'SAR' : country === 'Kuwait' ? 'KWD' : country === 'Bahrain' ? 'BHD' : 'OMR',
    "jobBenefits": [
      "Health insurance",
      "Accommodation provided",
      "Transportation allowance",
      "Visa sponsorship",
      "Annual leave",
      "End of service benefits"
    ]
  }

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
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest {isIndividualJob ? jobDisplay : categoryDisplay} Jobs Opening in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
              Apply online to top companies hiring {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} in {cityDisplay}, {country}.
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
            {isIndividualJob ? (
              <>
                <Link href={`/jobs/${params.city}/${categorySlug}`} className="text-gray-500 hover:text-primary-600">
                  {categoryDisplay} in {cityDisplay}
                </Link>
                <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-900">{jobDisplay} Jobs</span>
              </>
            ) : (
              <span className="text-gray-900">{categoryDisplay} Jobs in {cityDisplay}</span>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
              🎯 {companies.length} Premium Companies Hiring {isIndividualJob ? jobDisplay : categoryDisplay} in {cityDisplay}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {cityDisplay} offers excellent opportunities for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} with competitive salaries,
              comprehensive benefits, and career growth potential. Apply directly to verified companies and
              get hired faster through our streamlined application process in {country}.
            </p>
          </div>

          {/* Quick Apply Section */}
          <div className="bg-primary-600 text-white rounded-none sm:rounded-lg p-6 sm:p-8 mb-8 mx-0 sm:mx-0">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Apply to Multiple Companies</h3>
              <p className="text-primary-100 mb-6 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
                Create your professional profile and apply to all listed companies with a single submission.
                Streamline your job search process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/create-profile"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 sm:px-8 rounded-md text-base sm:text-lg transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  Create Profile & Apply
                </Link>
                <div className="flex items-center gap-2 text-primary-100">
                  <CheckBadgeIcon className="h-4 w-4" />
                  <span className="text-sm">Free Application Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies List - Professional Corporate Design */}
        <div className="bg-white rounded-none sm:rounded-lg shadow-sm border-0 sm:border p-4 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center px-2 sm:px-0">
            Premium Companies Hiring {categoryDisplay} in {cityDisplay}
          </h3>

          <div className="grid gap-8">
            {companies.map((company: Company, index: number) => {
              const shareUrl = `https://www.gogethires.com/jobs/${params.city}/${params.category}`;
              const shareText = `Check out this amazing ${isIndividualJob ? jobDisplay : categoryDisplay} opportunity at ${company.name} in ${cityDisplay}! Apply now: ${shareUrl}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

              return (
                <div key={index} className="group relative bg-white rounded-none sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-0 sm:border border-gray-200 hover:border-gray-300 overflow-hidden mx-0 sm:mx-0">
                  {/* Company Header */}
                  <div className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className="bg-white shadow-sm border border-gray-200 p-2 sm:p-3 rounded-lg flex-shrink-0">
                          <BuildingOfficeIcon className="h-6 w-6 sm:h-7 sm:w-7 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 truncate">{company.name}</h4>
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600 font-medium">Verified Employer</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <StarIcon className="h-4 w-4 text-amber-500 fill-current" />
                              <span className="font-medium">4.8</span>
                            </div>
                            <div className="bg-gray-200 w-px h-4 hidden sm:block"></div>
                            <span className="hidden sm:inline">{company.industry}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                          Currently Hiring
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Details */}
                  <div className="p-4 sm:p-6">
                    {/* Company Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <BriefcaseIcon className="h-5 w-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-900">{company.industry}</div>
                        <div className="text-xs text-gray-500 mt-1">Industry</div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-900">{company.size}</div>
                        <div className="text-xs text-gray-500 mt-1">Company Size</div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <MapPinIcon className="h-5 w-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-900">{cityDisplay}</div>
                        <div className="text-xs text-gray-500 mt-1">Location</div>
                      </div>
                    </div>

                    {/* Company Description */}
                    <div className="mb-6">
                      <h5 className="text-base font-semibold text-gray-900 mb-3">Company Overview</h5>
                      <p className="text-gray-700 leading-relaxed text-sm">{company.description}</p>
                    </div>

                    {/* Benefits & Highlights */}
                    <div className="mb-6">
                      <h5 className="text-base font-semibold text-gray-900 mb-3">Employee Benefits</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Accommodation Provided</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>Transportation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span>Health Insurance</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span>Visa Sponsorship</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="border-r border-gray-300 last:border-r-0">
                          <div className="text-lg font-semibold text-gray-900">95%</div>
                          <div className="text-xs text-gray-600 mt-1">Success Rate</div>
                        </div>
                        <div className="border-r border-gray-300 last:border-r-0">
                          <div className="text-lg font-semibold text-gray-900">24h</div>
                          <div className="text-xs text-gray-600 mt-1">Response Time</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{Math.floor(Math.random() * 50) + 10}</div>
                          <div className="text-xs text-gray-600 mt-1">Open Positions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <Link
                        href="/create-profile"
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 text-center flex items-center justify-center gap-2"
                      >
                        <BriefcaseIcon className="h-4 w-4" />
                        Apply to Position
                      </Link>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 min-w-fit"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        Share via WhatsApp
                      </a>
                    </div>

                    {/* Additional Actions */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="h-4 w-4" />
                        <span>Posted {Math.floor(Math.random() * 5) + 1} days ago</span>
                      </div>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `${company.name} - ${isIndividualJob ? jobDisplay : categoryDisplay} Jobs`,
                              text: shareText,
                              url: shareUrl
                            });
                          } else {
                            navigator.clipboard.writeText(shareUrl);
                            alert('Job link copied to clipboard!');
                          }
                        }}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <ShareIcon className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            How to Apply for {categoryDisplay} Jobs in {cityDisplay}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Create Your Profile</h4>
              <p className="text-gray-700">
                Complete your professional profile with experience, skills, and documents. 
                This takes just 5 minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Apply to Companies</h4>
              <p className="text-gray-700">
                Browse and apply to multiple companies with one click. 
                Your profile is sent directly to hiring managers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Get Hired</h4>
              <p className="text-gray-700">
                Companies contact you directly for interviews. 
                Most candidates receive responses within 24-48 hours.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/create-profile"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Start Your Application
            </Link>
          </div>
        </div>

        {/* SEO Content Sections */}
        {/* Market Overview Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            {isIndividualJob ? jobDisplay : categoryDisplay} Job Market in {cityDisplay}, {country}: Complete Guide 2024
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} job market in {cityDisplay} is experiencing unprecedented growth in 2024.
              With {country}'s booming economy and infrastructure development, demand for skilled {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} has reached an all-time high.
              {cityDisplay} offers some of the most competitive salaries and comprehensive benefits packages for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} in the Gulf region.
            </p>

            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              Why Choose {cityDisplay} for {isIndividualJob ? jobDisplay : categoryDisplay} Career?
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-navy-900 mb-3">Economic Advantages</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tax-free income for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()}</li>
                  <li>High salary packages with annual increments</li>
                  <li>Comprehensive healthcare and insurance benefits</li>
                  <li>End-of-service gratuity as per {country} labor law</li>
                  <li>Annual paid leave and return ticket provisions</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-navy-900 mb-3">Career Growth Opportunities</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Skill development and training programs</li>
                  <li>Promotion opportunities within companies</li>
                  <li>International work experience certification</li>
                  <li>Networking with global professionals</li>
                  <li>Industry-specific certifications and qualifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Salary and Benefits Deep Dive */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            {isIndividualJob ? jobDisplay : categoryDisplay} Salary Guide & Benefits in {cityDisplay} 2024
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Salary Ranges by Experience Level</h3>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy-900">Entry Level (0-2 years)</span>
                    <span className="text-lg font-bold text-primary-600">
                      {country === 'UAE' ? 'AED 2,000 - 3,500' :
                       country === 'Qatar' ? 'QAR 2,200 - 3,800' :
                       country === 'Saudi Arabia' ? 'SAR 2,100 - 3,600' :
                       country === 'Kuwait' ? 'KWD 180 - 320' :
                       country === 'Bahrain' ? 'BHD 200 - 350' :
                       'OMR 200 - 350'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Perfect for fresh graduates and career starters in {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy-900">Mid Level (3-5 years)</span>
                    <span className="text-lg font-bold text-primary-600">
                      {country === 'UAE' ? 'AED 3,500 - 5,500' :
                       country === 'Qatar' ? 'QAR 3,800 - 6,000' :
                       country === 'Saudi Arabia' ? 'SAR 3,600 - 5,800' :
                       country === 'Kuwait' ? 'KWD 320 - 500' :
                       country === 'Bahrain' ? 'BHD 350 - 550' :
                       'OMR 350 - 550'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Experienced professionals with proven track record in {cityDisplay}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy-900">Senior Level (5+ years)</span>
                    <span className="text-lg font-bold text-primary-600">
                      {country === 'UAE' ? 'AED 5,500 - 8,000+' :
                       country === 'Qatar' ? 'QAR 6,000 - 8,500+' :
                       country === 'Saudi Arabia' ? 'SAR 5,800 - 8,200+' :
                       country === 'Kuwait' ? 'KWD 500 - 750+' :
                       country === 'Bahrain' ? 'BHD 550 - 800+' :
                       'OMR 550 - 800+'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Senior professionals and supervisory roles with leadership responsibilities</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Complete Benefits Package</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Accommodation</div>
                    <div className="text-sm text-gray-600">Furnished housing or housing allowance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Transportation</div>
                    <div className="text-sm text-gray-600">Company transport or allowance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Health Insurance</div>
                    <div className="text-sm text-gray-600">Comprehensive medical coverage</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Annual Leave</div>
                    <div className="text-sm text-gray-600">30 days paid vacation + ticket</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Visa Sponsorship</div>
                    <div className="text-sm text-gray-600">Complete immigration support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Requirements Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            Essential Skills & Requirements for {isIndividualJob ? jobDisplay : categoryDisplay} in {cityDisplay}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Technical Skills Required</h3>
              <div className="space-y-3">
                {isIndividualJob && jobDisplay.toLowerCase().includes('driver') ? (
                  <>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Valid Driving License</div>
                      <p className="text-sm text-gray-700">{country} driving license or international license with local conversion</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Vehicle Knowledge</div>
                      <p className="text-sm text-gray-700">Understanding of vehicle maintenance, safety checks, and basic troubleshooting</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Navigation Skills</div>
                      <p className="text-sm text-gray-700">GPS navigation, route planning, and knowledge of {cityDisplay} roads</p>
                    </div>
                  </>
                ) : isIndividualJob && jobDisplay.toLowerCase().includes('maid') ? (
                  <>
                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Household Management</div>
                      <p className="text-sm text-gray-700">Comprehensive cleaning, organizing, and household maintenance skills</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Laundry & Ironing</div>
                      <p className="text-sm text-gray-700">Expert knowledge of fabric care, washing techniques, and professional ironing</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Cooking Skills</div>
                      <p className="text-sm text-gray-700">Basic to advanced cooking, meal preparation, and kitchen hygiene</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Industry-Specific Skills</div>
                      <p className="text-sm text-gray-700">Relevant technical knowledge and hands-on experience in {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Safety Compliance</div>
                      <p className="text-sm text-gray-700">Understanding of {country} workplace safety regulations and best practices</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="font-semibold text-navy-900 mb-2">Professional Certifications</div>
                      <p className="text-sm text-gray-700">Relevant certifications or willingness to obtain required qualifications</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Soft Skills & Personal Qualities</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-navy-900 mb-2">Communication Skills</div>
                  <p className="text-sm text-gray-700">Basic English and/or Arabic communication for effective workplace interaction</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-navy-900 mb-2">Cultural Adaptability</div>
                  <p className="text-sm text-gray-700">Respect for {country} culture, traditions, and professional workplace norms</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-navy-900 mb-2">Reliability & Punctuality</div>
                  <p className="text-sm text-gray-700">Consistent attendance, meeting deadlines, and maintaining professional standards</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-navy-900 mb-2">Problem-Solving</div>
                  <p className="text-sm text-gray-700">Ability to handle challenges independently and seek appropriate guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Living in City Guide */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            Living and Working in {cityDisplay}: Complete Guide for {isIndividualJob ? jobDisplay : categoryDisplay}
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Cost of Living</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">Accommodation</span>
                  <span className="font-semibold">Usually Provided</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">Monthly Groceries</span>
                  <span className="font-semibold">
                    {country === 'UAE' ? 'AED 800-1200' :
                     country === 'Qatar' ? 'QAR 900-1300' :
                     country === 'Saudi Arabia' ? 'SAR 850-1250' :
                     country === 'Kuwait' ? 'KWD 70-110' :
                     country === 'Bahrain' ? 'BHD 80-120' :
                     'OMR 80-120'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">Transportation</span>
                  <span className="font-semibold">Company Provided</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Entertainment</span>
                  <span className="font-semibold">
                    {country === 'UAE' ? 'AED 500-800' :
                     country === 'Qatar' ? 'QAR 550-900' :
                     country === 'Saudi Arabia' ? 'SAR 500-850' :
                     country === 'Kuwait' ? 'KWD 45-75' :
                     country === 'Bahrain' ? 'BHD 50-80' :
                     'OMR 50-80'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Lifestyle & Culture</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Climate:</strong> {cityDisplay} has a {country === 'UAE' || country === 'Qatar' ? 'hot desert climate with mild winters' : country === 'Saudi Arabia' ? 'arid climate with seasonal variations' : 'hot and humid climate with mild winters'}.</p>
                <p><strong>Languages:</strong> Arabic is official, English widely spoken in business and daily life.</p>
                <p><strong>Weekend:</strong> {country === 'Saudi Arabia' ? 'Friday-Saturday' : 'Friday-Saturday in most sectors'}.</p>
                <p><strong>Currency:</strong> {country === 'UAE' ? 'UAE Dirham (AED)' : country === 'Qatar' ? 'Qatari Riyal (QAR)' : country === 'Saudi Arabia' ? 'Saudi Riyal (SAR)' : country === 'Kuwait' ? 'Kuwaiti Dinar (KWD)' : country === 'Bahrain' ? 'Bahraini Dinar (BHD)' : 'Omani Rial (OMR)'}.</p>
                <p><strong>Time Zone:</strong> {country === 'UAE' || country === 'Oman' ? 'GMT+4' : 'GMT+3'}.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Work Environment</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Working Hours:</strong> Typically 8-10 hours per day, 6 days per week for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()}.</p>
                <p><strong>Overtime:</strong> Compensated as per {country} Labor Law with premium rates.</p>
                <p><strong>Holidays:</strong> Islamic holidays plus national days are public holidays.</p>
                <p><strong>Professional Growth:</strong> Many companies offer training and advancement opportunities.</p>
                <p><strong>Workplace Safety:</strong> Strict safety standards enforced across all industries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Trends and Future Outlook */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            {isIndividualJob ? jobDisplay : categoryDisplay} Industry Trends & Future Outlook in {cityDisplay}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Market Trends 2024</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Increased Demand</h4>
                  <p className="text-sm text-gray-700">
                    {cityDisplay}'s rapid development and {country}'s Vision initiatives are driving unprecedented demand for skilled {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()}.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Salary Growth</h4>
                  <p className="text-sm text-gray-700">
                    Average salaries for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} in {cityDisplay} have increased by 15-20% in the past year due to high demand.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Technology Integration</h4>
                  <p className="text-sm text-gray-700">
                    Modern tools and technology are being integrated into {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} roles, enhancing efficiency and job satisfaction.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Future Opportunities</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Career Advancement</h4>
                  <p className="text-sm text-gray-700">
                    Senior {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} can advance to supervisory, training, or specialized technical roles with higher compensation.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Specialization Areas</h4>
                  <p className="text-sm text-gray-700">
                    Opportunities for specialization in high-demand areas like luxury services, industrial automation, or specialized technical skills.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">Long-term Stability</h4>
                  <p className="text-sm text-gray-700">
                    {country}'s long-term development plans ensure sustained demand for {isIndividualJob ? jobDisplay.toLowerCase() : categoryDisplay.toLowerCase()} over the next decade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Frequently Asked Questions - {categoryDisplay} Jobs in {cityDisplay}
          </h2>
          
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
    </>
  )
}
