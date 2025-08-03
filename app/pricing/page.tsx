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

// Metadata handled by layout

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
    // Save employer data and redirect to payment
    localStorage.setItem('employerData', JSON.stringify({
      ...employerData,
      selectedPlan: selectedPlan
    }))
    // Here you would normally integrate with Stripe
    alert(`Thank you! Redirecting to payment for ${selectedPlan.name} plan (${selectedPlan.currency} ${selectedPlan.price})\n\nAfter payment, you'll be redirected to your employer dashboard.`)
    // Simulate successful payment and redirect to employer dashboard
    setTimeout(() => {
      localStorage.setItem('isEmployerLoggedIn', 'true')
      window.location.href = '/employer-dashboard'
    }, 2000)
  }

  if (showEmployerForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Complete Your Registration</h2>
                  <p className="text-blue-100">Enter your details and proceed to secure payment</p>
                </div>
                <button
                  onClick={() => setShowEmployerForm(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Selected Plan Display */}
              <div className="mb-8 p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Selected Plan: {selectedPlan?.name}</h3>
                    <p className="text-primary-700 mb-2">{selectedPlan?.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-navy-900">{selectedPlan?.currency} {selectedPlan?.price}</span>
                      <span className="text-gray-600">/ {selectedPlan?.period}</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-lg font-bold text-navy-900">{selectedPlan?.profileAccess}</div>
                      <div className="text-sm text-gray-600">Profile Access</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer Details Form */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Company Information</h3>
              </div>

              <form onSubmit={handleEmployerSubmit} className="space-y-6">
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

                {/* Payment Summary */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-lg font-semibold text-navy-900 mb-4">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedPlan?.name} Plan</span>
                      <span className="font-semibold">{selectedPlan?.currency} {selectedPlan?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-navy-900">
                      <span>Total</span>
                      <span>{selectedPlan?.currency} {selectedPlan?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowEmployerForm(false)}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Plans
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🔐 Proceed to Secure Payment
                  </button>
                </div>
              </form>
            </div>
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
