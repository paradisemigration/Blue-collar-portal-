'use client'

import { useState } from 'react'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'worker'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Thank you for contacting us! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'worker'
      })
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <a href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
              Home
            </a>
            <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for support, partnerships, or any questions about GoGetHires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Phone Support</h3>
                    <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                    <div className="space-y-1">
                      <p className="text-navy-900 font-medium">UAE: +971 4 123 4567</p>
                      <p className="text-navy-900 font-medium">Qatar: +974 4 123 4567</p>
                      <p className="text-navy-900 font-medium">KSA: +966 11 123 4567</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Email Support</h3>
                    <p className="text-gray-600 mb-2">Send us an email anytime</p>
                    <div className="space-y-1">
                      <p className="text-navy-900 font-medium">support@gogethires.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600 mb-2">We're here to help during these hours</p>
                    <div className="space-y-1">
                      <p className="text-navy-900">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                      <p className="text-navy-900">Friday: 2:00 PM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Office Locations</h3>
                    <p className="text-gray-600 mb-2">Visit us at our regional offices</p>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-navy-900">Dubai Office</p>
                        <p className="text-gray-600 text-sm">Business Bay, Dubai, UAE</p>
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">Doha Office</p>
                        <p className="text-gray-600 text-sm">West Bay, Doha, Qatar</p>
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">Riyadh Office</p>
                        <p className="text-gray-600 text-sm">King Abdullah Financial District, Riyadh, KSA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact for Different User Types */}
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Quick Support by User Type</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">👷 For Workers</h4>
                  <p className="text-gray-600 text-sm mb-2">Profile creation, login issues, account management</p>
                  <a href="mailto:support@gogethires.com" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    support@gogethires.com
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">🏢 For Employers</h4>
                  <p className="text-gray-600 text-sm mb-2">Subscriptions, hiring support, bulk requirements</p>
                  <a href="mailto:support@gogethires.com" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    support@gogethires.com
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-2">🤝 For Partnerships</h4>
                  <p className="text-gray-600 text-sm mb-2">Business partnerships, integrations, collaborations</p>
                  <a href="mailto:support@gogethires.com" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    support@gogethires.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg border p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="worker">Worker</option>
                    <option value="employer">Employer</option>
                    <option value="partner">Potential Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Support Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💬 Need Quick Help?</h3>
          <p className="text-blue-700 mb-3">
            We typically respond to all enquiries within 24 hours
          </p>
          <div className="flex justify-center">
            <a
              href="mailto:support@gogethires.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Email Support Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
