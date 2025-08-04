import { 
  MapPinIcon, 
  BriefcaseIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline'
import { JobPost } from '../../types'

// Mock job postings data
const mockJobs: JobPost[] = [
  {
    id: '1',
    employerId: 'emp1',
    title: 'Experienced Driver Needed',
    description: 'Looking for a reliable and experienced driver for a private family. Must have clean driving record and excellent customer service skills.',
    jobTitle: 'Driver',
    city: 'Dubai',
    salaryRange: { min: 3000, max: 4000 },
    requirements: [
      'Valid UAE driving license',
      'Minimum 5 years experience',
      'Clean driving record',
      'English and Arabic speaking'
    ],
    benefits: [
      'Health insurance',
      'Annual leave',
      'Performance bonus',
      'Accommodation provided'
    ],
    createdAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '2',
    employerId: 'emp2',
    title: 'Professional Maid Required',
    description: 'Seeking a professional and trustworthy maid for household cleaning and maintenance. Previous experience in similar role preferred.',
    jobTitle: 'Maid',
    city: 'Abu Dhabi',
    salaryRange: { min: 2200, max: 2800 },
    requirements: [
      'Previous housekeeping experience',
      'Attention to detail',
      'Trustworthy and reliable',
      'Basic English communication'
    ],
    benefits: [
      'Competitive salary',
      'Weekly day off',
      'Health insurance',
      'Transportation provided'
    ],
    createdAt: new Date('2024-01-18'),
    isActive: true
  },
  {
    id: '3',
    employerId: 'emp3',
    title: 'Certified Electrician for Commercial Project',
    description: 'We are looking for a certified electrician to join our team for a major commercial construction project in Doha.',
    jobTitle: 'Electrician',
    city: 'Doha',
    salaryRange: { min: 4500, max: 6000 },
    requirements: [
      'Electrical certification',
      'Minimum 8 years experience',
      'Commercial project experience',
      'Safety training certification'
    ],
    benefits: [
      'Excellent salary package',
      'Project completion bonus',
      'Health and life insurance',
      'Professional development opportunities'
    ],
    createdAt: new Date('2024-01-20'),
    isActive: true
  }
]

export const metadata = {
  title: 'Job Postings - Gulf Hiring Platform',
  description: 'Browse the latest job opportunities for blue-collar workers across the Gulf region. Find your next career opportunity.',
}

export default function Jobs() {
  const handleApplyNow = (jobId: string) => {
    // Redirect to create profile if not logged in, otherwise show application modal
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      alert('Application submitted! We will notify the employer about your interest.')
    } else {
      window.location.href = '/create-profile'
    }
  }

  const handleSaveJob = (jobId: string) => {
    if (typeof window !== 'undefined') {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId)
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
        alert('Job saved to your favorites!')
      } else {
        alert('Job is already in your saved list!')
      }
    }
  }

  const handleShareJob = (job: JobPost) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} in ${job.city}`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Job link copied to clipboard!')
    }
  }

  const handlePostJob = () => {
    window.location.href = '/employer-login'
  }

  const handleCreateProfile = () => {
    window.location.href = '/create-profile'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Latest Job Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities across the Gulf region. 
            Connect with top employers and advance your career.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{mockJobs.length}</div>
            <div className="text-gray-600">Active Job Posts</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-gray-600">Job Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Hiring Companies</div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              {/* Job Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-navy-900 mb-2">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <BriefcaseIcon className="h-4 w-4" />
                      <span>{job.jobTitle}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{job.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="h-4 w-4" />
                      <span>AED {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{job.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>

              {/* Job Description */}
              <p className="text-gray-700 mb-4">{job.description}</p>

              {/* Requirements and Benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Requirements:</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Benefits:</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleApplyNow(job.id)}
                  className="btn-primary flex-1 sm:flex-none"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => handleSaveJob(job.id)}
                  className="btn-secondary flex-1 sm:flex-none"
                >
                  Save Job
                </button>
                <button
                  onClick={() => handleShareJob(job)}
                  className="btn-secondary flex-1 sm:flex-none"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for Employers */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-navy-800 text-white rounded-lg p-8 text-center">
          <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 text-gold-400" />
          <h2 className="text-2xl font-bold mb-4">Looking to Hire?</h2>
          <p className="text-lg mb-6 text-gray-200">
            Post your job openings and connect with skilled workers across the Gulf region
          </p>
          <button
            onClick={handlePostJob}
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Post a Job
          </button>
        </div>

        {/* For Workers CTA */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-8 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">New to the Platform?</h2>
          <p className="text-gray-600 mb-6">
            Create your worker profile today and get discovered by top employers
          </p>
          <button
            onClick={handleCreateProfile}
            className="btn-primary"
          >
            Create Worker Profile
          </button>
        </div>
      </div>
    </div>
  )
}
