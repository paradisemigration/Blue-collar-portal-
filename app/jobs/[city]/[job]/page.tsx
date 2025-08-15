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
  Company
} from '../../../../utils/companiesData'

interface PageProps {
  params: {
    city: string
    job: string
  }
}

export default function IndividualJobPage({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const cityDisplay = getCityDisplayName(params.city)
  const jobDisplay = getJobDisplayName(params.job)
  const country = getCityCountry(cityDisplay)
  
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
  const generateFAQs = () => {
    const baseFAQs = [
      {
        question: `How many ${jobDisplay.toLowerCase()} job openings are available in ${cityDisplay}?`,
        answer: `We currently feature ${companies.length} companies in ${cityDisplay} that regularly hire ${jobDisplay.toLowerCase()}s. New positions are posted weekly, and you can apply to multiple companies simultaneously through our platform.`
      },
      {
        question: `What qualifications do I need for ${jobDisplay.toLowerCase()} jobs in ${cityDisplay}?`,
        answer: `Requirements vary by company and specific role. Generally, relevant experience, proper documentation (visa/work permit), and language skills (English/Arabic) are preferred. Many companies also provide on-the-job training for the right candidates.`
      },
      {
        question: `How quickly can I get hired for ${jobDisplay.toLowerCase()} positions in ${cityDisplay}?`,
        answer: `The hiring process typically takes 1-3 weeks from application to job offer. Companies in ${cityDisplay} often have urgent hiring needs, especially for skilled ${jobDisplay.toLowerCase()}s, so qualified candidates can expect quick responses.`
      },
      {
        question: `What is the average salary for ${jobDisplay.toLowerCase()}s in ${cityDisplay}?`,
        answer: `Salaries for ${jobDisplay.toLowerCase()}s in ${cityDisplay} vary based on experience, company size, and specific role. Most positions offer competitive packages including accommodation, transportation, and health insurance benefits in ${country}.`
      },
      {
        question: `Do these companies provide visa sponsorship for ${jobDisplay.toLowerCase()}s?`,
        answer: `Most companies listed provide visa sponsorship for qualified candidates. During the application process, you can specify your visa requirements, and companies will indicate if they can provide sponsorship for ${country} work permits.`
      },
      {
        question: `Can I apply to multiple companies at once for ${jobDisplay.toLowerCase()} positions?`,
        answer: `Yes! Our platform allows you to apply to multiple companies simultaneously. This increases your chances of finding the right ${jobDisplay.toLowerCase()} opportunity and gives you options to choose from different offers.`
      },
      {
        question: `What documents do I need to apply for ${jobDisplay.toLowerCase()} jobs?`,
        answer: `You'll typically need: updated CV/resume, passport copy, educational certificates, experience letters from previous employers, and any relevant professional certifications or licenses specific to ${jobDisplay.toLowerCase()} work.`
      },
      {
        question: `Are there opportunities for career advancement as a ${jobDisplay.toLowerCase()}?`,
        answer: `Many companies in ${cityDisplay} offer career progression opportunities. With dedication and skill development, ${jobDisplay.toLowerCase()}s can advance to senior positions, specialized roles, or even supervisory positions within their field.`
      },
      {
        question: `What benefits do companies typically offer to ${jobDisplay.toLowerCase()}s?`,
        answer: `Standard benefits usually include: monthly salary, accommodation (shared or private), transportation allowance, health insurance, annual leave, end-of-service benefits, and sometimes performance bonuses specific to ${jobDisplay.toLowerCase()} roles.`
      },
      {
        question: `How do I prepare for ${jobDisplay.toLowerCase()} interviews in ${cityDisplay}?`,
        answer: `Research the company background, prepare to discuss your relevant ${jobDisplay.toLowerCase()} experience, practice common interview questions, dress professionally, and be ready to demonstrate your specific skills. Companies in ${country} appreciate punctuality and positive attitude.`
      },
      {
        question: `Is it safe to work as a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Yes, ${cityDisplay} has strict labor laws protecting workers' rights. The ${country} government ensures safe working conditions, fair treatment, and proper compensation. All listed companies must comply with ${country} labor regulations.`
      },
      {
        question: `What languages do I need to speak for ${jobDisplay.toLowerCase()} jobs?`,
        answer: `English is widely used in most companies. Basic Arabic knowledge is helpful but not always required for ${jobDisplay.toLowerCase()} positions. Some companies also value Hindi, Urdu, Filipino, or other languages depending on their client base.`
      },
      {
        question: `What is the typical work schedule for ${jobDisplay.toLowerCase()}s in ${cityDisplay}?`,
        answer: `Working hours vary by company and specific ${jobDisplay.toLowerCase()} role. Most follow a 6-day work week with 8-10 hour shifts. Some positions may require shift work, overtime, or weekend duties, which are typically compensated according to ${country} labor law.`
      },
      {
        question: `Can I change companies once I'm working as a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Yes, ${country} labor laws allow job changes for ${jobDisplay.toLowerCase()}s. However, there are specific procedures to follow, and you may need a No Objection Certificate (NOC) from your current employer or wait for the end of your contract period.`
      }
    ]
    
    return baseFAQs.slice(0, 12) // Return 12 FAQs
  }

  const faqs = generateFAQs()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {jobDisplay.toLowerCase()} opportunities...</p>
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
              Apply online to top companies hiring {jobDisplay.toLowerCase()}s in {cityDisplay}, {country}. 
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
            <Link href="/browse" className="text-gray-500 hover:text-primary-600">Jobs</Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{jobDisplay} Jobs in {cityDisplay}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
              {companies.length} Top Companies Hiring {jobDisplay}s in {cityDisplay}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {cityDisplay} offers excellent opportunities for {jobDisplay.toLowerCase()}s with competitive salaries, 
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
        </div>

        {/* Companies List */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6">
            Companies Hiring {jobDisplay}s in {cityDisplay}
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

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            How to Apply for {jobDisplay} Jobs in {cityDisplay}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Create Your Profile</h4>
              <p className="text-gray-700">
                Complete your professional profile with {jobDisplay.toLowerCase()} experience, skills, and documents. 
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
                Your profile is sent directly to hiring managers looking for {jobDisplay.toLowerCase()}s.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Get Hired</h4>
              <p className="text-gray-700">
                Companies contact you directly for interviews. 
                Most {jobDisplay.toLowerCase()} candidates receive responses within 24-48 hours.
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
