'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { 
  PhotoIcon, 
  UserIcon, 
  CloudArrowUpIcon, 
  SparklesIcon, 
  GlobeAltIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { JobTitle, City, Country } from '../../types'

interface WorkerFormData {
  fullName: string
  profilePicture: File | null
  jobTitle: JobTitle | 'Other'
  customJobTitle?: string
  jobProfile: string
  yearsExperience: number
  city: City
  country: Country
  languagesSpoken: string[]
  expectedSalary: number
  visaStatus: 'Work Visa' | 'Visit Visa' | 'Freelance Visa' | 'Expired Visa' | 'No Visa'
  aboutMe: string
  phoneNumber: string
  email: string
}

interface LocationInfo {
  country: Country
  currency: string
  currencySymbol: string
  phoneCode: string
  detectedFromIP: boolean
}

const jobTitles: (JobTitle | 'Other')[] = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
  'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy',
  'AC Technician', 'Welder', 'Mason', 'Tile Setter', 'Roofer', 'Glazier',
  'Heavy Equipment Operator', 'Crane Operator', 'Forklift Operator', 'Steel Fixer',
  'Pipe Fitter', 'HVAC Technician', 'Concrete Mixer', 'Excavator Operator',
  'Road Worker', 'Building Maintenance', 'Pool Cleaner', 'Landscaper',
  'Window Cleaner', 'Pest Control Technician', 'Laundry Worker', 'Dishwasher',
  'Food Preparation Worker', 'Kitchen Helper', 'Waiter', 'Barista',
  'Cashier', 'Shop Assistant', 'Inventory Clerk', 'Packer',
  'Loading Worker', 'Moving Helper', 'Cleaning Supervisor', 'Maintenance Supervisor',
  'Other'
]

const citiesByCountry: Record<Country, City[]> = {
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'],
  'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif'],
  'Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi'],
  'Kuwait': ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya'],
  'Bahrain': ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
}

const countryInfo: Record<Country, { currency: string; currencySymbol: string; phoneCode: string }> = {
  'UAE': { currency: 'AED', currencySymbol: 'د.إ', phoneCode: '+971' },
  'Qatar': { currency: 'QAR', currencySymbol: 'ر.ق', phoneCode: '+974' },
  'Saudi Arabia': { currency: 'SAR', currencySymbol: 'ر.س', phoneCode: '+966' },
  'Oman': { currency: 'OMR', currencySymbol: 'ر.ع.', phoneCode: '+968' },
  'Kuwait': { currency: 'KWD', currencySymbol: 'د.ك', phoneCode: '+965' },
  'Bahrain': { currency: 'BHD', currencySymbol: '.د.ب', phoneCode: '+973' }
}

const languages = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Bengali', 'Tamil', 'Malayalam', 
  'Telugu', 'Punjabi', 'Gujarati', 'Marathi', 'Nepali', 'Sinhalese',
  'Tagalog', 'Indonesian', 'Thai', 'French', 'German', 'Spanish', 'Russian'
]

export default function CreateProfile() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<WorkerFormData>({
    defaultValues: {
      languagesSpoken: [],
      yearsExperience: 1,
      expectedSalary: 2000
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [showCustomJobTitle, setShowCustomJobTitle] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const selectedJobTitle = watch('jobTitle')
  const selectedCountry = watch('country')
  const selectedLanguages = watch('languagesSpoken') || []

  // Auto-detect location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        let detectedCountry: Country = 'UAE'
        if (data.country_name?.includes('Qatar')) detectedCountry = 'Qatar'
        else if (data.country_name?.includes('Saudi')) detectedCountry = 'Saudi Arabia'
        else if (data.country_name?.includes('Oman')) detectedCountry = 'Oman'
        else if (data.country_name?.includes('Kuwait')) detectedCountry = 'Kuwait'
        else if (data.country_name?.includes('Bahrain')) detectedCountry = 'Bahrain'

        const info = countryInfo[detectedCountry]
        setLocationInfo({
          country: detectedCountry,
          currency: info.currency,
          currencySymbol: info.currencySymbol,
          phoneCode: info.phoneCode,
          detectedFromIP: true
        })

        setValue('country', detectedCountry)
        setValue('phoneNumber', info.phoneCode)
      } catch (error) {
        console.log('Could not detect location')
        const defaultInfo = countryInfo['UAE']
        setLocationInfo({
          country: 'UAE',
          currency: defaultInfo.currency,
          currencySymbol: defaultInfo.currencySymbol,
          phoneCode: defaultInfo.phoneCode,
          detectedFromIP: false
        })
        setValue('country', 'UAE')
        setValue('phoneNumber', defaultInfo.phoneCode)
      }
    }

    detectLocation()
  }, [setValue])

  // Update location info when country changes
  useEffect(() => {
    if (selectedCountry) {
      const info = countryInfo[selectedCountry]
      setLocationInfo(prev => ({
        country: selectedCountry,
        currency: info.currency,
        currencySymbol: info.currencySymbol,
        phoneCode: info.phoneCode,
        detectedFromIP: prev?.detectedFromIP || false
      }))
      
      const currentPhone = getValues('phoneNumber')
      if (!currentPhone || currentPhone.startsWith('+')) {
        setValue('phoneNumber', info.phoneCode)
      }
    }
  }, [selectedCountry, setValue, getValues])

  // Show custom job title field when "Other" is selected
  useEffect(() => {
    setShowCustomJobTitle(selectedJobTitle === 'Other')
  }, [selectedJobTitle])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('profilePicture', file)
      const reader = new FileReader()
      reader.onload = () => {
        setProfilePicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLanguageToggle = (language: string) => {
    const current = selectedLanguages
    const updated = current.includes(language)
      ? current.filter(l => l !== language)
      : [...current, language]
    setValue('languagesSpoken', updated)
  }

  const validateStep = (step: number): boolean => {
    const values = getValues()
    switch (step) {
      case 1:
        return !!(values.fullName && values.phoneNumber && values.email)
      case 2:
        return !!(values.jobTitle && values.yearsExperience && values.visaStatus)
      case 3:
        return !!(values.country && values.city && values.expectedSalary)
      case 4:
        return !!(values.aboutMe && values.languagesSpoken?.length > 0)
      default:
        return false
    }
  }

  const handleStepChange = (step: number) => {
    if (step < currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step)
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep])
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: WorkerFormData) => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'profilePicture' && value instanceof File) {
          formData.append(key, value)
        } else if (key === 'languagesSpoken' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value))
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        }
      })

      // Create worker profile with unique ID
      const workerProfile = {
        id: `worker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...data,
        profilePicture: profilePicturePreview || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(workerProfile))
      
      // Also save to all profiles list
      const existingProfiles = JSON.parse(localStorage.getItem('allUserProfiles') || '[]')
      const updatedProfiles = [...existingProfiles.filter((p: any) => p.id !== workerProfile.id), workerProfile]
      localStorage.setItem('allUserProfiles', JSON.stringify(updatedProfiles))

      // Success animation
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
      
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Error creating profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { id: 1, title: 'Personal Info', icon: UserIcon, description: 'Basic details' },
    { id: 2, title: 'Job Details', icon: BriefcaseIcon, description: 'Work information' },
    { id: 3, title: 'Location', icon: MapPinIcon, description: 'Where you work' },
    { id: 4, title: 'About You', icon: ChatBubbleLeftRightIcon, description: 'Tell us more' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Create Your Profile
              </h1>
              <p className="text-gray-600 mt-1">Join thousands of workers finding great jobs</p>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-600">Join 15,000+ Workers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const isAccessible = step.id <= currentStep || completedSteps.includes(step.id - 1)
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <button
                    onClick={() => handleStepChange(step.id)}
                    disabled={!isAccessible}
                    className={`
                      relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                        : isCurrent 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-110' 
                          : isAccessible
                            ? 'bg-white border-gray-300 text-gray-400 hover:border-blue-300'
                            : 'bg-gray-100 border-gray-200 text-gray-300'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    
                    {isCurrent && (
                      <div className="absolute -inset-1 bg-blue-400 rounded-full animate-pulse opacity-75"></div>
                    )}
                  </button>
                  
                  {/* Step Info */}
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                  
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 hidden sm:block">
                      <div className="h-0.5 bg-gray-200 relative">
                        <div 
                          className={`h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ${
                            completedSteps.includes(step.id) ? 'w-full' : 'w-0'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Mobile Step Info */}
          <div className="sm:hidden mt-4 text-center">
            <p className="text-sm font-medium text-gray-900">{steps[currentStep - 1].title}</p>
            <p className="text-xs text-gray-500">{steps[currentStep - 1].description}</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <UserIcon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <p className="text-blue-100 mt-1">Let's start with your basic details</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-8">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {profilePicturePreview ? (
                        <img 
                          src={profilePicturePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl cursor-pointer shadow-lg transition-colors">
                      <CloudArrowUpIcon className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                    <p className="text-gray-600 text-sm mb-3">Add a professional photo to increase your chances of getting hired by 80%</p>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Optional but highly recommended</span>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <IdentificationIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <PhoneIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phoneNumber', { required: 'Phone number is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                    placeholder="+971 XX XXX XXXX"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.phoneNumber.message}
                    </p>
                  )}
                  {locationInfo?.detectedFromIP && (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4" />
                      Phone code auto-filled for {locationInfo.country}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Job Information */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <BriefcaseIcon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">Job Information</h2>
                    <p className="text-green-100 mt-1">Tell us about your professional skills</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-8">
                {/* Job Title */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-green-600" />
                    Job Title *
                  </label>
                  <select
                    {...register('jobTitle', { required: 'Job title is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  >
                    <option value="">🔍 Select your job title</option>
                    {jobTitles.map(title => (
                      <option key={title} value={title}>
                        {title === 'Other' ? '✨ Other (specify below)' : `👷 ${title}`}
                      </option>
                    ))}
                  </select>
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.jobTitle.message}
                    </p>
                  )}
                </div>
                
                {/* Custom Job Title */}
                {showCustomJobTitle && (
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                      <SparklesIcon className="h-5 w-5 mr-2 text-green-600" />
                      Specify Your Job Title *
                    </label>
                    <input
                      type="text"
                      {...register('customJobTitle', { 
                        required: showCustomJobTitle ? 'Please specify your job title' : false 
                      })}
                      className="w-full px-4 py-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-lg bg-white"
                      placeholder="e.g., Solar Panel Installer, Hotel Manager"
                    />
                    {errors.customJobTitle && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>{errors.customJobTitle.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Years of Experience */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <StarIcon className="h-5 w-5 mr-2 text-green-600" />
                    Years of Experience *
                  </label>
                  <select
                    {...register('yearsExperience', { required: 'Experience is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select experience level</option>
                    <option value={1}>🌱 1 year (Entry Level)</option>
                    <option value={2}>📈 2 years</option>
                    <option value={3}>💪 3 years</option>
                    <option value={4}>⚡ 4 years</option>
                    <option value={5}>🎯 5 years</option>
                    <option value={6}>🏆 6+ years</option>
                    <option value={7}>🌟 7+ years</option>
                    <option value={8}>💎 8+ years</option>
                    <option value={9}>🔥 9+ years</option>
                    <option value={10}>👑 10+ years (Expert)</option>
                  </select>
                  {errors.yearsExperience && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.yearsExperience.message}
                    </p>
                  )}
                </div>

                {/* Visa Status */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <IdentificationIcon className="h-5 w-5 mr-2 text-green-600" />
                    Visa Status *
                  </label>
                  <select
                    {...register('visaStatus', { required: 'Visa status is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select visa status</option>
                    <option value="Work Visa">🟢 Work Visa</option>
                    <option value="Visit Visa">🟡 Visit Visa</option>
                    <option value="Freelance Visa">🔵 Freelance Visa</option>
                    <option value="Expired Visa">🟠 Expired Visa</option>
                    <option value="No Visa">🔴 No Visa</option>
                  </select>
                  {errors.visaStatus && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.visaStatus.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Salary */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <MapPinIcon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">Location & Salary</h2>
                    <p className="text-purple-100 mt-1">Where you work and your expectations</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-8">
                {/* Country */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <GlobeAltIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Country *
                  </label>
                  <select
                    {...register('country', { required: 'Country is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select your country</option>
                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                    <option value="Qatar">🇶🇦 Qatar</option>
                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    <option value="Oman">🇴🇲 Oman</option>
                    <option value="Kuwait">🇰🇼 Kuwait</option>
                    <option value="Bahrain">🇧🇭 Bahrain</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.country.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
                    City *
                  </label>
                  <select
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                    disabled={!selectedCountry}
                  >
                    <option value="">
                      {!selectedCountry ? 'Select country first' : 'Select your city'}
                    </option>
                    {selectedCountry && citiesByCountry[selectedCountry]?.map(city => (
                      <option key={city} value={city}>🏙️ {city}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.city.message}
                    </p>
                  )}
                </div>

                {/* Expected Salary */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Expected Monthly Salary *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register('expectedSalary', { 
                        required: 'Expected salary is required',
                        min: { value: 500, message: 'Minimum salary is 500' },
                        max: { value: 20000, message: 'Maximum salary is 20,000' }
                      })}
                      className="w-full px-4 py-4 pr-20 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                      placeholder="3000"
                      min="500"
                      max="20000"
                      step="100"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      {locationInfo?.currencySymbol || 'AED'}
                    </div>
                  </div>
                  {errors.expectedSalary && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.expectedSalary.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    💡 Tip: Research market rates for {selectedJobTitle || 'your position'} in {selectedCountry || 'your area'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: About You */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-8 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ChatBubbleLeftRightIcon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">About You</h2>
                    <p className="text-orange-100 mt-1">Final touches to complete your profile</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-8">
                {/* Languages */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-4">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-orange-600" />
                    Languages You Speak * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {languages.map(language => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageToggle(language)}
                        className={`
                          px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
                          ${selectedLanguages.includes(language)
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                          }
                        `}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                  {errors.languagesSpoken && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>Please select at least one language
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-3">
                    Selected: {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* About Me */}
                <div>
                  <label className="flex items-center text-base font-semibold text-gray-800 mb-3">
                    <UserIcon className="h-5 w-5 mr-2 text-orange-600" />
                    About Me *
                  </label>
                  <textarea
                    {...register('aboutMe', { 
                      required: 'Please tell us about yourself',
                      minLength: { value: 50, message: 'Please write at least 50 characters' }
                    })}
                    rows={6}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-lg bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell employers about your experience, skills, and what makes you a great worker. For example: 'I am a dedicated driver with 5 years of experience in Dubai. I am punctual, have a clean driving record, and excellent knowledge of UAE roads...'"
                  />
                  {errors.aboutMe && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>{errors.aboutMe.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    {watch('aboutMe')?.length || 0} characters (minimum 50 recommended)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              ← Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </span>
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all duration-200
                  ${validateStep(currentStep)
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !validateStep(4)}
                className={`
                  px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2
                  ${validateStep(4) && !isSubmitting
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg transform hover:scale-105'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>Complete Profile</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Success Animation */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="animate-bounce mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Creating Your Profile!</h3>
            <p className="text-gray-600">Please wait while we set up your account...</p>
          </div>
        </div>
      )}
    </div>
  )
}
