import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  TruckIcon,
  HomeIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  HammerIcon,
  PaintBrushIcon,
  EyeIcon,
  FireIcon,
  ScissorsIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const popularJobs = [
    { title: 'Drivers', count: '1,234', city: 'Dubai', href: '/dubai/driver', icon: TruckIcon, color: 'bg-blue-500' },
    { title: 'Maids', count: '987', city: 'Doha', href: '/doha/maid', icon: HomeIcon, color: 'bg-pink-500' },
    { title: 'Electricians', count: '756', city: 'Riyadh', href: '/riyadh/electrician', icon: BoltIcon, color: 'bg-yellow-500' },
    { title: 'Plumbers', count: '543', city: 'Abu Dhabi', href: '/abu-dhabi/plumber', icon: WrenchScrewdriverIcon, color: 'bg-blue-600' },
    { title: 'Cleaners', count: '689', city: 'Kuwait City', href: '/kuwait-city/cleaner', icon: SparklesIcon, color: 'bg-green-500' },
    { title: 'Carpenters', count: '432', city: 'Muscat', href: '/muscat/carpenter', icon: HammerIcon, color: 'bg-orange-500' },
    { title: 'Painters', count: '378', city: 'Manama', href: '/manama/painter', icon: PaintBrushIcon, color: 'bg-purple-500' },
    { title: 'Security Guards', count: '521', city: 'Jeddah', href: '/jeddah/security-guard', icon: EyeIcon, color: 'bg-gray-600' },
    { title: 'Cooks', count: '298', city: 'Al Rayyan', href: '/al-rayyan/cook', icon: FireIcon, color: 'bg-red-500' },
    { title: 'Gardeners', count: '345', city: 'Sharjah', href: '/sharjah/gardener', icon: ScissorsIcon, color: 'bg-green-600' }
  ]

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Verified Profiles',
      description: 'All worker profiles are verified with proper documentation and background checks.'
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Smart Search',
      description: 'Find workers by job type, location, experience, and salary requirements.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and privacy measures.'
    },
    {
      icon: ClockIcon,
      title: 'Quick Hiring',
      description: 'Connect with workers instantly and reduce your hiring time by 80%.'
    }
  ]

  const testimonials = [
    {
      name: 'Ahmed Al-Mansouri',
      company: 'Dubai Construction LLC',
      text: 'Found 5 skilled electricians within 2 days. The platform saved us weeks of recruitment time and costs.',
      rating: 5,
      location: 'Dubai, UAE'
    },
    {
      name: 'Sarah Johnson',
      company: 'Doha Facilities Management',
      text: 'Excellent service! The worker profiles are detailed and accurate. Highly recommend Go Get Hire.',
      rating: 5,
      location: 'Doha, Qatar'
    },
    {
      name: 'Mohammed Al-Rashid',
      company: 'Riyadh Hospitality Group',
      text: 'We hired 12 housekeeping staff through Go Get Hire. All workers were professional and well-trained.',
      rating: 5,
      location: 'Riyadh, Saudi Arabia'
    },
    {
      name: 'Fatima Al-Zahra',
      company: 'Kuwait Commercial Center',
      text: 'Amazing platform! Found reliable security guards and maintenance staff quickly. Great value for money.',
      rating: 5,
      location: 'Kuwait City, Kuwait'
    },
    {
      name: 'Omar Hassan',
      company: 'Muscat Real Estate',
      text: 'Go Get Hire helped us find experienced plumbers and electricians for our new project. Very satisfied!',
      rating: 5,
      location: 'Muscat, Oman'
    },
    {
      name: 'Aisha Al-Mansoori',
      company: 'Bahrain Hotels & Resorts',
      text: 'Professional service with verified workers. The hiring process is smooth and efficient.',
      rating: 5,
      location: 'Manama, Bahrain'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Skilled Workers <br />
              <span className="text-gold-400">Across the Gulf</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Connect with verified blue-collar professionals. From drivers to electricians,
              find the right talent for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Browse Workers
              </Link>
              <Link href="/create-profile" className="bg-transparent border-2 border-white hover:bg-white hover:text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Create Worker Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Explore the most in-demand jobs across Gulf cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {popularJobs.map((job) => {
              const IconComponent = job.icon
              return (
                <Link
                  key={job.title}
                  href={job.href}
                  className="card hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`${job.color} rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-900 group-hover:text-primary-600 transition-colors mb-2">
                      {job.title}
                    </h3>
                    <span className="text-2xl font-bold text-primary-600 mb-2">{job.count}</span>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{job.city}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Choose Go Get Hire?
            </h2>
            <p className="text-gray-600 text-lg">
              The most trusted platform for blue-collar hiring in the Gulf region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">10,000+</div>
              <div className="text-gray-300">Verified Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">2,500+</div>
              <div className="text-gray-300">Happy Employers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">15+</div>
              <div className="text-gray-300">Job Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">6</div>
              <div className="text-gray-300">Gulf Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-navy-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  <div className="text-gray-500 text-xs mt-1">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Hire?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of employers who trust Go Get Hire for their staffing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Start Browsing
            </Link>
            <Link href="/pricing" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
