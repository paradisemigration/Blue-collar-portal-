import { DocumentTextIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Terms of Service | GoGetHires',
  description: 'Read our terms of service and user agreement for using GoGetHires services.',
  keywords: 'terms, service, agreement, legal, conditions'
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-navy-600 p-4 rounded-full">
              <DocumentTextIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using GoGetHires services.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border p-8 space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using GoGetHires ("Platform", "Service", "we", "us", or "our"), you agree to be bound by these
              Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          {/* Platform Description */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Platform Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GoGetHires is an online marketplace that connects blue-collar workers with employers across the Gulf region. 
              Our platform enables:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Workers to create professional profiles and showcase their skills</li>
              <li>Employers to browse worker profiles and connect with candidates</li>
              <li>Facilitation of communication between workers and employers</li>
              <li>Job posting and application services</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. User Accounts</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">3.1 Account Creation</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One person may only create one account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">3.2 Account Security</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">4. User Conduct</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">4.1 Prohibited Activities</h3>
                <p className="text-gray-700 mb-2">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Post false, misleading, or inaccurate information</li>
                  <li>Impersonate another person or entity</li>
                  <li>Engage in discriminatory practices based on race, religion, gender, or nationality</li>
                  <li>Harass, threaten, or abuse other users</li>
                  <li>Use the platform for illegal activities</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Circumvent our subscription or payment systems</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">4.2 Content Standards</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>All profile information must be truthful and accurate</li>
                  <li>Profile photos must be professional and appropriate</li>
                  <li>Job descriptions and requirements must be legitimate</li>
                  <li>Communication between users must be respectful and professional</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Services and Subscriptions */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Services and Subscriptions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">5.1 Worker Services</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Creating and maintaining a worker profile is free</li>
                  <li>Workers can update their profiles and availability status at any time</li>
                  <li>We do not guarantee job placement or employment opportunities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">5.2 Employer Services</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Subscription plans are required to access worker contact details</li>
                  <li>Subscription fees are non-refundable except as required by law</li>
                  <li>We reserve the right to modify subscription plans and pricing</li>
                  <li>Unused credits expire at the end of the subscription period</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">5.3 Payment Terms</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>All payments must be made in advance</li>
                  <li>Prices are displayed in the local currency (AED, QAR, SAR, etc.)</li>
                  <li>Payment processing is handled by secure third-party providers</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Intellectual Property</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.1 Platform Content</h3>
                <p className="text-gray-700">
                  The platform design, features, and functionality are owned by Gulf Hiring Platform and protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">6.2 User Content</h3>
                <p className="text-gray-700">
                  You retain ownership of the content you post on the platform. By posting content, you grant us a 
                  non-exclusive, worldwide license to use, display, and distribute your content on the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          {/* Platform Availability */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Platform Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high platform availability but do not guarantee uninterrupted service. We may 
              temporarily suspend the service for maintenance, updates, or other operational reasons. We are not liable 
              for any inconvenience or losses resulting from service interruptions.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Disclaimers</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">9.1 Service Disclaimer</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>The platform is provided "as is" without warranties of any kind</li>
                  <li>We do not verify the accuracy of user-provided information</li>
                  <li>We are not responsible for the conduct of users or outcomes of interactions</li>
                  <li>Employment decisions are solely between workers and employers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">9.2 Third-Party Services</h3>
                <p className="text-gray-700">
                  Our platform may integrate with third-party services (payment processors, etc.). We are not responsible 
                  for the availability, content, or practices of these third-party services.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Gulf Hiring Platform shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to loss of profits, data, or business 
              opportunities, arising from your use of the platform.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Gulf Hiring Platform from any claims, damages, losses, or 
              expenses arising from your use of the platform, violation of these terms, or infringement of any third-party rights.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Termination</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">12.1 Termination by You</h3>
                <p className="text-gray-700">
                  You may terminate your account at any time by contacting our support team. Termination does not entitle 
                  you to a refund of any subscription fees.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">12.2 Termination by Us</h3>
                <p className="text-gray-700">
                  We may suspend or terminate your account for violations of these terms, fraudulent activity, or other 
                  reasons at our sole discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">13. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. 
              Any disputes arising from these terms or your use of the platform shall be subject to the exclusive 
              jurisdiction of the courts of Dubai, UAE.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by posting 
              the updated terms on our platform. Your continued use of the service after such changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> legal@gulfhire.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +971 4 123 4567</p>
              <p className="text-gray-700"><strong>Address:</strong> Business Bay, Dubai, UAE</p>
            </div>
          </section>

          {/* Severability */}
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">16. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain 
              in full force and effect. The invalid provision shall be replaced with a valid provision that most closely 
              achieves the intent of the original provision.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
