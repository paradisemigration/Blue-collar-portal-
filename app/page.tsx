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
  CogIcon,
  PaintBrushIcon,
  EyeIcon,
  FireIcon,
  ScissorsIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const popularJobs = [
    { title: 'Drivers', count: '1,234', city: 'Dubai', href: '/dubai/driver', icon: TruckIcon, color: 'bg-blue-500' },
    { title: 'Maids', count: '987', city: 'Doha', href: '/doha/maid', icon: HomeIcon, color: 'bg-pink-500' },
    { title: 'Electricians', count: '756', city: 'Riyadh', href: '/riyadh/electrician', icon: BoltIcon, color: 'bg-yellow-500' },
    { title: 'Plumbers', count: '543', city: 'Abu Dhabi', href: '/abu-dhabi/plumber', icon: WrenchScrewdriverIcon, color: 'bg-blue-600' },
    { title: 'Cleaners', count: '689', city: 'Kuwait City', href: '/kuwait-city/cleaner', icon: SparklesIcon, color: 'bg-green-500' },
    { title: 'Carpenters', count: '432', city: 'Muscat', href: '/muscat/carpenter', icon: CogIcon, color: 'bg-orange-500' },
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
      location: 'Dubai, UAE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      name: 'Sarah Johnson',
      company: 'Doha Facilities Management',
      text: 'Excellent service! The worker profiles are detailed and accurate. Highly recommend Go Get Hires Now.',
      rating: 5,
      location: 'Doha, Qatar',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6d2e9cd?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      name: 'Mohammed Al-Rashid',
      company: 'Riyadh Hospitality Group',
      text: 'We hired 12 housekeeping staff through Go Get Hires Now. All workers were professional and well-trained.',
      rating: 5,
      location: 'Riyadh, Saudi Arabia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      name: 'Fatima Al-Zahra',
      company: 'Kuwait Commercial Center',
      text: 'Amazing platform! Found reliable security guards and maintenance staff quickly. Great value for money.',
      rating: 5,
      location: 'Kuwait City, Kuwait',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      name: 'Omar Hassan',
      company: 'Muscat Real Estate',
      text: 'Go Get Hires Now helped us find experienced plumbers and electricians for our new project. Very satisfied!',
      rating: 5,
      location: 'Muscat, Oman',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format'
    },
    {
      name: 'Aisha Al-Mansoori',
      company: 'Bahrain Hotels & Resorts',
      text: 'Professional service with verified workers. The hiring process is smooth and efficient.',
      rating: 5,
      location: 'Manama, Bahrain',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format'
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
                Find Worker
              </Link>
              <Link href="/create-profile" className="bg-transparent border-2 border-white hover:bg-white hover:text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                Ready to Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Workers Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Hire Verified Workers
            </h2>
            <p className="text-gray-600 text-lg">
              Connect with skilled professionals across Gulf cities
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {popularJobs.map((job) => {
              const IconComponent = job.icon
              return (
                <Link
                  key={job.title}
                  href={job.href}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-4 sm:p-6 transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`${job.color} rounded-2xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold text-navy-900 group-hover:text-primary-600 transition-colors mb-1 sm:mb-2 leading-tight">
                      {job.title}
                    </h3>
                    <span className="text-lg sm:text-2xl font-bold text-primary-600 mb-1 sm:mb-2">{job.count}</span>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="truncate">{job.city}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Browse Workers Button */}
          <div className="text-center mt-10">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <UserGroupIcon className="h-5 w-5" />
              Browse All Workers
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Latest Job Opportunities
            </h2>
            <p className="text-gray-600 text-lg">
              Discover exciting employment opportunities across the Gulf region
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Featured Jobs - Redesigned Cards */}
            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Light Vehicle Driver</h3>
                      <p className="text-blue-600 font-medium text-sm">Emirates Transport LLC</p>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    URGENT
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Dubai, UAE</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">AED 2,500</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">2-3 yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">Full-time</span>
                  <span className="text-gray-500 text-xs">Posted today</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/dubai/driver" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <HomeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Housemaid</h3>
                      <p className="text-pink-600 font-medium text-sm">Al Mansouri Family</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">
                    FEATURED
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Doha, Qatar</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">QAR 1,800</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">1-2 yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full font-medium">Live-in</span>
                  <span className="text-gray-500 text-xs">Posted 2 days ago</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/doha/maid" className="block w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BoltIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Electrician</h3>
                      <p className="text-yellow-600 font-medium text-sm">Saudi Electric Company</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                    NEW
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Riyadh, Saudi Arabia</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">SAR 3,000</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">3+ yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">Contract</span>
                  <span className="text-gray-500 text-xs">Posted 1 day ago</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/riyadh/electrician" className="block w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <WrenchScrewdriverIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">Plumber</h3>
                      <p className="text-green-600 font-medium text-sm">Al Ain Water Company</p>
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-bold">
                    HOT
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Abu Dhabi, UAE</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">AED 2,800</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">2+ yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Full-time</span>
                  <span className="text-gray-500 text-xs">Posted 3 hours ago</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/abu-dhabi/plumber" className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Cleaner</h3>
                      <p className="text-purple-600 font-medium text-sm">Kuwait Towers Mall</p>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    APPLY NOW
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Kuwait City, Kuwait</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">KWD 180</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">1+ yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">Part-time</span>
                  <span className="text-gray-500 text-xs">Posted 6 hours ago</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/kuwait-city/cleaner" className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Job Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Security Guard</h3>
                      <p className="text-indigo-600 font-medium text-sm">Bahrain Bay Security</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">
                    PREMIUM
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Manama, Bahrain</span>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">BHD 220</div>
                    <div className="text-xs text-gray-600">Min Salary</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">2+ yrs</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Job Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-medium">Shifts</span>
                  <span className="text-gray-500 text-xs">Posted 1 week ago</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <Link href="/manama/security-guard" className="block w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* View All Jobs Button */}
          <div className="text-center">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <BriefcaseIcon className="h-5 w-5" />
              View All Job Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Choose Go Get Hires Now?
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
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 border-t pt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-navy-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.company}</div>
                    <div className="text-gray-500 text-xs mt-1">{testimonial.location}</div>
                  </div>
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
            Join thousands of employers who trust Go Get Hires Now for their staffing needs
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
