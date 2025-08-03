import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Privacy Policy | Gulf Hiring Platform',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information on Gulf Hiring Platform.',
  keywords: 'privacy, policy, data protection, gdpr, personal information'
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-full">
              <ShieldCheckIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Gulf Hiring Platform ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">2.1 Personal Information</h3>
                <p className="text-gray-700 mb-2">When you create an account, we collect:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Full name and contact information (email, phone number)</li>
                  <li>Profile photograph</li>
                  <li>Job title, experience, and professional information</li>
                  <li>Location (city and country)</li>
                  <li>Visa status and availability</li>
                  <li>Languages spoken and salary expectations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">2.2 Usage Information</h3>
                <p className="text-gray-700 mb-2">We automatically collect:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and features used</li>
                  <li>Time spent on the platform</li>
                  <li>Search queries and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">2.3 Payment Information</h3>
                <p className="text-gray-700">
                  For employers who subscribe to our services, we collect payment information through secure third-party processors. 
                  We do not store credit card details on our servers.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. How We Use Your Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">3.1 Service Provision</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Create and maintain user accounts</li>
                  <li>Display worker profiles to employers</li>
                  <li>Facilitate communication between workers and employers</li>
                  <li>Process subscription payments and provide access to premium features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">3.2 Platform Improvement</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Develop new features and functionality</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">3.3 Communication</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Send important account and service updates</li>
                  <li>Notify about new job opportunities (for workers)</li>
                  <li>Share platform news and feature announcements</li>
                  <li>Respond to inquiries and provide support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Information Sharing and Disclosure</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">4.1 With Employers</h3>
                <p className="text-gray-700">
                  Worker profile information (excluding contact details) is visible to all employers. Contact details are only 
                  shared with subscribed employers who unlock specific profiles.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">4.2 Service Providers</h3>
                <p className="text-gray-700">
                  We may share information with trusted third-party service providers who assist us in operating our platform, 
                  including payment processors, cloud hosting providers, and analytics services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">4.3 Legal Requirements</h3>
                <p className="text-gray-700">
                  We may disclose your information when required by law, to protect our rights, or to comply with legal proceedings.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Your Rights and Choices</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.1 Access and Updates</h3>
                <p className="text-gray-700">
                  You can access and update your personal information through your account dashboard at any time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.2 Data Portability</h3>
                <p className="text-gray-700">
                  You have the right to request a copy of your personal data in a structured, commonly used format.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.3 Account Deletion</h3>
                <p className="text-gray-700">
                  You may request deletion of your account and personal data by contacting our support team. 
                  Some information may be retained for legal or legitimate business purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.4 Communication Preferences</h3>
                <p className="text-gray-700">
                  You can opt out of non-essential communications through your account settings or by following 
                  unsubscribe links in our emails.
                </p>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure that such 
              transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children under 18. If we become aware that we have collected such information, we will 
              take steps to delete it promptly.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
              the new policy on our platform and updating the "Last updated" date. Your continued use of our services 
              after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> privacy@gulfhire.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +971 4 123 4567</p>
              <p className="text-gray-700"><strong>Address:</strong> Business Bay, Dubai, UAE</p>
            </div>
          </section>

          {/* Compliance */}
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Regulatory Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy is designed to comply with applicable data protection regulations in the Gulf region, 
              including the UAE Data Protection Law, Qatar Personal Data Protection Law, and Saudi Arabia Personal Data 
              Protection Law. We are committed to maintaining the highest standards of data protection and privacy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
