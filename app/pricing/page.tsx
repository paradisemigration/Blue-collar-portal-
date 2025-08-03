import { CheckIcon, StarIcon } from '@heroicons/react/24/outline'

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
  title: 'Pricing Plans - Gulf Hiring Platform',
  description: 'Choose the perfect plan for your hiring needs. Access verified blue-collar worker profiles across the Gulf region.',
}

export default function Pricing() {
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
          <button className="btn-primary text-lg px-8 py-3">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}
