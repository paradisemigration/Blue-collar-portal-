'use client'

import { useState } from 'react'
import { CheckIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Starter',
    price: 200,
    currency: 'AED',
    period: 'per plan',
    description: 'Perfect for small businesses hiring occasionally',
    features: [
      'Access to 15 worker profiles',
      'Basic search and filters',
      'Email support',
      'Valid for 30 days',
      'Mobile-friendly platform'
    ],
    profileAccess: 15,
    jobPosts: 0,
    isPremium: false,
    isPopular: false
  },
  {
    name: 'Professional',
    price: 300,
    currency: 'AED',
    period: 'per plan',
    description: 'Best for growing businesses with regular hiring needs',
    features: [
      'Access to 30 worker profiles',
      'Advanced search filters',
      'Post 2 job openings',
      'Priority email support',
      'Valid for 60 days',
      'Analytics dashboard',
      'Saved searches'
    ],
    profileAccess: 30,
    jobPosts: 2,
    isPremium: false,
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 500,
    currency: 'AED',
    period: 'per plan',
    description: 'For enterprises with high-volume hiring requirements',
    features: [
      'Access to 60 worker profiles',
      'All search and filter options',
      'Post 5 job openings',
      'Premium company badge',
      'Valid for 90 days',
      'Priority customer support',
      'Advanced analytics',
      'Bulk contact export',
      'Dedicated account manager'
    ],
    profileAccess: 60,
    jobPosts: 5,
    isPremium: true,
    isPopular: false
  }
]

const faqs = [
  {
    question: 'How does the profile access work?',
    answer: 'Each plan gives you credits to unlock worker contact details. Once you unlock a profile, you have permanent access to that worker\'s contact information.'
  },
  {
    question: 'Can I upgrade my plan?',
    answer: 'Yes, you can upgrade your plan at any time. The remaining credits from your current plan will be added to your new plan.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and bank transfers. Payments are processed securely through our payment partners.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a free browsing experience where you can view worker profiles without contact details. Subscribe to unlock full access.'
  },
  {
    question: 'How long are the plans valid?',
    answer: 'Plans are valid for the specified duration (30-90 days) from the date of purchase. Unused credits expire at the end of the validity period.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied with our service and haven\'t used more than 2 profile unlocks.'
  }
]

export const metadata = {
  title: 'Pricing Plans - Go Get Hire | Gulf Hiring Platform',
  description: 'Choose the perfect plan for your hiring needs with Go Get Hire. Access verified blue-collar worker profiles across the Gulf region.',
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showEmployerForm, setShowEmployerForm] = useState(false)
  const [employerData, setEmployerData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    companySize: '',
    industry: ''
  })

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan)
    setShowEmployerForm(true)
  }

  const handleEmployerSubmit = (e) => {
    e.preventDefault()
    // Here you would normally integrate with Stripe
    alert(`Thank you! Redirecting to payment for ${selectedPlan.name} plan (${selectedPlan.currency} ${selectedPlan.price})`)
    setShowEmployerForm(false)
  }

  if (showEmployerForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-navy-900">Employer Details</h2>
              <button
                onClick={() => setShowEmployerForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-900">Selected Plan: {selectedPlan?.name}</h3>
              <p className="text-primary-700">{selectedPlan?.currency} {selectedPlan?.price} - {selectedPlan?.description}</p>
            </div>

            <form onSubmit={handleEmployerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={employerData.companyName}
                    onChange={(e) => setEmployerData({...employerData, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={employerData.contactPerson}
                    onChange={(e) => setEmployerData({...employerData, contactPerson: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={employerData.email}
                    onChange={(e) => setEmployerData({...employerData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={employerData.phoneNumber}
                    onChange={(e) => setEmployerData({...employerData, phoneNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select
                    value={employerData.companySize}
                    onChange={(e) => setEmployerData({...employerData, companySize: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={employerData.industry}
                    onChange={(e) => setEmployerData({...employerData, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select industry</option>
                    <option value="construction">Construction</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail</option>
                    <option value="logistics">Logistics</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEmployerForm(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your hiring needs. All plans include access to verified worker profiles 
            and our secure platform.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                plan.isPopular 
                  ? 'border-primary-500 transform scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <StarIcon className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Premium Badge */}
              {plan.isPremium && (
                <div className="absolute top-6 right-6">
                  <div className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-navy-900">{plan.price}</span>
                  <span className="text-lg text-gray-600">{plan.currency}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleGetStarted(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.isPopular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-16">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Compare Plans
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-navy-900">Features</th>
                  {plans.map(plan => (
                    <th key={plan.name} className="text-center py-4 px-4 font-semibold text-navy-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Profile Access</td>
                  {plans.map(plan => (
                    <td key={plan.name} className="text-center py-4 px-4 font-semibold text-navy-900">
                      {plan.profileAccess}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Job Posts</td>
                  {plans.map(plan => (
                    <td key={plan.name} className="text-center py-4 px-4 font-semibold text-navy-900">
                      {plan.jobPosts || '—'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Advanced Filters</td>
                  {plans.map(plan => (
                    <td key={plan.name} className="text-center py-4 px-4">
                      {plan.name !== 'Starter' ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Analytics Dashboard</td>
                  {plans.map(plan => (
                    <td key={plan.name} className="text-center py-4 px-4">
                      {plan.name !== 'Starter' ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Premium Support</td>
                  {plans.map(plan => (
                    <td key={plan.name} className="text-center py-4 px-4">
                      {plan.isPremium ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you choose the right plan for your business.
          </p>
          <a href="mailto:sales@gogethire.com" className="btn-primary text-lg px-8 py-3 inline-block">
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  )
}
