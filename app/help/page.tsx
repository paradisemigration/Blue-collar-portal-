import Link from 'next/link'
import { 
  QuestionMarkCircleIcon, 
  UserGroupIcon, 
  BriefcaseIcon, 
  CreditCardIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Help Center | Gulf Hiring Platform',
  description: 'Get help and support for using Gulf Hiring Platform. Find answers to common questions and contact support.',
  keywords: 'help, support, faq, gulf hiring, assistance'
}

export default function HelpCenter() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: UserGroupIcon,
      faqs: [
        {
          question: 'How do I create a worker profile?',
          answer: 'Go to the "Add Profile" page, fill in your personal information, job details, upload a professional photo, and submit. You\'ll receive login credentials via email.'
        },
        {
          question: 'How do I browse and hire workers?',
          answer: 'Visit the "Browse Workers" page, use filters to find suitable candidates, and subscribe to unlock contact details. You can then contact workers directly.'
        },
        {
          question: 'Is the platform free to use?',
          answer: 'Creating a worker profile is completely free. Employers need to subscribe to access worker contact details and post job openings.'
        },
        {
          question: 'Which countries and cities are supported?',
          answer: 'We support UAE, Qatar, Saudi Arabia, Oman, Kuwait, and Bahrain with major cities in each country.'
        }
      ]
    },
    {
      title: 'For Workers',
      icon: BriefcaseIcon,
      faqs: [
        {
          question: 'How do I get hired through the platform?',
          answer: 'Create a complete profile with professional photo, detailed job information, and skills. Keep your profile active and respond quickly to employer contacts.'
        },
        {
          question: 'Can I edit my profile after creating it?',
          answer: 'Yes! Log in to your dashboard and click "Edit Profile" to update your information, photo, or availability status at any time.'
        },
        {
          question: 'What visa status options are available?',
          answer: 'You can select from Work Visa, Visit Visa, Freelance Visa, Expired Visa, or No Visa. This helps employers understand your legal status.'
        },
        {
          question: 'How do I increase my profile visibility?',
          answer: 'Complete all profile sections, upload a professional photo, add detailed job descriptions, keep your availability status updated, and respond promptly to inquiries.'
        }
      ]
    },
    {
      title: 'For Employers',
      icon: CreditCardIcon,
      faqs: [
        {
          question: 'What subscription plans are available?',
          answer: 'We offer three plans: Starter (AED 200 - 15 profiles), Professional (AED 300 - 30 profiles + 2 job posts), and Enterprise (AED 500 - 60 profiles + 5 job posts + premium features).'
        },
        {
          question: 'How do I contact workers?',
          answer: 'Subscribe to a plan, browse worker profiles, and click "Unlock Contact" to access phone numbers and email addresses. You can then contact workers directly.'
        },
        {
          question: 'Can I post job openings?',
          answer: 'Yes, Professional and Enterprise plans include job posting credits. You can post openings that workers can view and apply to.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, and bank transfers. Payments are processed securely through our payment partners.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: ShieldCheckIcon,
      faqs: [
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.'
        },
        {
          question: 'How are profiles verified?',
          answer: 'All worker profiles undergo verification including document checks, background verification, and skill assessments before being made public.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use enterprise-grade security measures to protect your data. Worker contact details are only visible to subscribed employers.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can request account deletion by contacting our support team. We\'ll process your request within 48 hours.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full">
              <QuestionMarkCircleIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions and get the support you need to make the most of Gulf Hiring Platform
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/contact" 
            className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow text-center group"
          >
            <PhoneIcon className="h-12 w-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get personalized help from our support team</p>
          </Link>

          <Link 
            href="/create-profile" 
            className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow text-center group"
          >
            <UserGroupIcon className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Create Profile</h3>
            <p className="text-gray-600 text-sm">Start your journey as a worker on our platform</p>
          </Link>

          <Link 
            href="/browse" 
            className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow text-center group"
          >
            <BriefcaseIcon className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Browse Workers</h3>
            <p className="text-gray-600 text-sm">Find and hire skilled professionals</p>
          </Link>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <category.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {category.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-4 border-primary-200 pl-6">
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-6 text-gray-200">
            Our support team is here to help you with any questions or issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-primary-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <a 
              href="mailto:support@gulfhire.com" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-600 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
