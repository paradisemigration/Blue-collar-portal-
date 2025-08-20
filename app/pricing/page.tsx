'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckIcon,
  StarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ClockIcon,
  ChevronRightIcon,
  HomeIcon,
  SparklesIcon,
  LockClosedIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Basic Access',
    price: 49,
    currency: 'AED',
    duration: '7 days',
    popular: false,
    description: 'Perfect for quick hiring needs',
    features: [
      'Access to 50 worker profiles',
      'View contact details',
      'Basic search filters',
      'Email support',
      '7-day access'
    ],
    buttonText: 'Get Basic Access',
    buttonColor: 'bg-gray-600 hover:bg-gray-700'
  },
  {
    name: 'Premium',
    price: 149,
    currency: 'AED',
    duration: '30 days',
    popular: true,
    description: 'Most popular for businesses',
    features: [
      'Unlimited worker profiles',
      'Direct contact access',
      'Advanced search & filters',
      'Priority phone support',
      'Profile verification badges',
      'Download worker CVs',
      'Save favorite profiles',
      '30-day full access'
    ],
    buttonText: 'Get Premium Access',
    buttonColor: 'bg-primary-600 hover:bg-primary-700'
  },
  {
    name: 'Enterprise',
    price: 299,
    currency: 'AED',
    duration: '90 days',
    popular: false,
    description: 'For large-scale recruitment',
    features: [
      'Everything in Premium',
      'Bulk contact downloads',
      'Dedicated account manager',
      '24/7 priority support',
      'Custom filtering options',
      'Team collaboration tools',
      'Analytics & insights',
      '90-day extended access'
    ],
    buttonText: 'Get Enterprise Access',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  }
]

const testimonials = [
  {
    name: 'Ahmed Al-Mansouri',
    company: 'Al-Mansouri Construction',
    location: 'Dubai, UAE',
    rating: 5,
    text: 'Found the perfect construction team within hours. The contact details were accurate and the workers were exactly as described.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Sarah Johnson',
    company: 'Johnson Family',
    location: 'Abu Dhabi, UAE',
    rating: 5,
    text: 'Excellent service! Found a reliable housemaid and nanny quickly. The verification process gives me confidence in the quality.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Mohammed Hassan',
    company: 'Hassan Trading LLC',
    location: 'Sharjah, UAE',
    rating: 5,
    text: 'Great platform for finding skilled workers. The premium features saved me weeks of recruitment time.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('Premium')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName)
  }

  const handlePurchase = async (plan: typeof plans[0]) => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      alert(`Thank you! Your ${plan.name} subscription is now active. You can now access all worker contact details.`)
      // Here you would typically integrate with a payment gateway
      // and redirect to a success page or back to browse with unlocked access
      window.location.href = '/browse'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/browse" className="text-gray-500 hover:text-primary-600 transition-colors">
              Browse Workers
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">Pricing Plans</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 p-4 rounded-2xl">
              <SparklesIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Unlock Access to
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"> Skilled Workers</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant access to verified worker profiles, contact details, and direct communication. Choose the plan that fits your hiring needs.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-green-500" />
              <span>100% Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-blue-500" />
              <span>2,000+ Active Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-purple-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'border-primary-500 bg-white shadow-2xl'
                  : selectedPlan === plan.name
                  ? 'border-primary-300 bg-white shadow-lg'
                  : 'border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <StarIcon className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-600 ml-2">{plan.currency}</span>
                    <div className="text-gray-500 mt-1">for {plan.duration}</div>
                  </div>

                  <button
                    onClick={() => handlePurchase(plan)}
                    disabled={isProcessing}
                    className={`w-full ${plan.buttonColor} text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCardIcon className="h-5 w-5" />
                        {plan.buttonText}
                      </>
                    )}
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What You Get Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What You Get With Premium Access</h2>
            <p className="text-xl text-gray-600">Everything you need to find and connect with the perfect workers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 mb-4">
                <PhoneIcon className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Direct Contact</h3>
              <p className="text-gray-600 text-sm">Get phone numbers and email addresses to contact workers directly</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6 mb-4">
                <ShieldCheckIcon className="h-12 w-12 text-green-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Profiles</h3>
              <p className="text-gray-600 text-sm">All workers are verified with background checks and document validation</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl p-6 mb-4">
                <BoltIcon className="h-12 w-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-gray-600 text-sm">Unlock profiles immediately and start contacting workers right away</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-6 mb-4">
                <ClockIcon className="h-12 w-12 text-yellow-600 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Get help whenever you need it with our dedicated support team</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied employers who found their perfect workers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 text-center italic">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">How quickly can I access worker contacts?</h3>
                <p className="text-gray-600">Instantly! Once you subscribe, you'll have immediate access to all contact details and can start reaching out to workers right away.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are all workers verified?</h3>
                <p className="text-gray-600">Yes, every worker profile goes through our comprehensive verification process including background checks and document validation.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. However, the access period you've paid for will remain active until it expires.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, debit cards, and digital payment methods including Apple Pay and Google Pay.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">We offer a 48-hour satisfaction guarantee. If you're not completely satisfied, contact our support team for a full refund.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is there customer support?</h3>
                <p className="text-gray-600">Yes! We provide 24/7 customer support via phone, email, and live chat to help you with any questions or issues.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Find Your Perfect Worker?</h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">Join thousands of employers who trust our platform</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handlePurchase(plans[1])} // Premium plan
              className="bg-white text-primary-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <CreditCardIcon className="h-6 w-6" />
              Start Premium Access
            </button>
            <Link
              href="/browse"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
            >
              <LockClosedIcon className="h-5 w-5" />
              Browse Workers First
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
