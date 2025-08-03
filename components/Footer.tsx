import Link from 'next/link'
import { BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BriefcaseIcon className="h-8 w-8 text-gold-400" />
              <span className="text-2xl font-bold">Go Get Hire</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Paradise Workers Hub connects skilled blue-collar workers with employers across the Gulf region.
              Find verified professionals and grow your business with trusted talent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-gray-300 hover:text-white transition-colors">Browse Workers</Link></li>
              <li><Link href="/create-profile" className="text-gray-300 hover:text-white transition-colors">Create Profile</Link></li>
              <li><Link href="/jobs" className="text-gray-300 hover:text-white transition-colors">Job Postings</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Go Get Hire. All rights reserved. Built for the Gulf region with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
