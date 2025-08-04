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
  StarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  'UAE': { currency: 'AED', currencySymbol: 'AED', phoneCode: '+971' },
  'Qatar': { currency: 'QAR', currencySymbol: 'QAR', phoneCode: '+974' },
  'Saudi Arabia': { currency: 'SAR', currencySymbol: 'SAR', phoneCode: '+966' },
  'Oman': { currency: 'OMR', currencySymbol: 'OMR', phoneCode: '+968' },
  'Kuwait': { currency: 'KWD', currencySymbol: 'KWD', phoneCode: '+965' },
  'Bahrain': { currency: 'BHD', currencySymbol: 'BHD', phoneCode: '+973' }
}

const languages = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Bengali', 'Tamil', 'Malayalam', 
  'Telugu', 'Punjabi', 'Gujarati', 'Marathi', 'Nepali', 'Sinhalese',
  'Tagalog', 'Indonesian', 'Thai', 'French', 'German', 'Spanish', 'Russian'
]

export default function CreateProfile() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues, trigger } = useForm<WorkerFormData>({
    mode: 'onChange',
    defaultValues: {
      languagesSpoken: [],
      yearsExperience: 1,
      expectedSalary: 2000
    }
  })

  // Check if user already has a profile and redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingProfile = localStorage.getItem('userProfile')
      const isLoggedIn = localStorage.getItem('isLoggedIn')

      if (existingProfile && isLoggedIn) {
        // User already has a profile, redirect to dashboard
        router.push('/dashboard')
        return
      }
    }
  }, [router])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [showCustomJobTitle, setShowCustomJobTitle] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [duplicateError, setDuplicateError] = useState<string>('')
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const selectedJobTitle = watch('jobTitle')
  const selectedCountry = watch('country')
  const selectedLanguages = watch('languagesSpoken') || []

  // Watch all form values for real-time validation
  const watchedValues = watch()

  // Set default location (disabled auto-detection to prevent fetch errors)
  useEffect(() => {
    const setDefaults = () => {
      // Try timezone-based detection first (no fetch required)
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        let detectedCountry: Country = 'UAE'

        if (timezone.includes('Qatar') || timezone.includes('Doha')) detectedCountry = 'Qatar'
        else if (timezone.includes('Riyadh') || timezone.includes('Saudi')) detectedCountry = 'Saudi Arabia'
        else if (timezone.includes('Muscat') || timezone.includes('Oman')) detectedCountry = 'Oman'
        else if (timezone.includes('Kuwait')) detectedCountry = 'Kuwait'
        else if (timezone.includes('Bahrain') || timezone.includes('Manama')) detectedCountry = 'Bahrain'
        else if (timezone.includes('Dubai') || timezone.includes('UAE')) detectedCountry = 'UAE'

        const info = countryInfo[detectedCountry]
        setLocationInfo({
          country: detectedCountry,
          currency: info.currency,
          currencySymbol: info.currencySymbol,
          phoneCode: info.phoneCode,
          detectedFromIP: false
        })

        setValue('country', detectedCountry)
        setValue('phoneNumber', info.phoneCode)

        console.log('✅ Location set based on timezone:', detectedCountry)
      } catch (error) {
        // Fallback to UAE default
        console.log('Using UAE as default location')
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

    // Set defaults immediately
    setDefaults()
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

  // Check for duplicate entries
  const checkDuplicate = async (field: 'phoneNumber' | 'email', value: string) => {
    if (!value) {
      setDuplicateError('')
      return false
    }

    try {
      // Check existing profiles in localStorage
      const existingProfiles = JSON.parse(localStorage.getItem('allUserProfiles') || '[]')
      const isDuplicate = existingProfiles.some((profile: any) =>
        profile[field] === value
      )

      if (isDuplicate) {
        const message = field === 'phoneNumber'
          ? `⚠️ This mobile number is already registered. Please use a different number or sign in to your existing account.`
          : `⚠️ This email address is already registered. Please use a different email or sign in to your existing account.`
        setDuplicateError(message)
        return true
      }

      setDuplicateError('')
      return false
    } catch (error) {
      console.error('Error checking duplicates:', error)
      setDuplicateError('')
      return false
    }
  }

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
    trigger('languagesSpoken')
  }

  const handleFieldFocus = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev.add(fieldName)))
    
    // Auto-scroll to field on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const element = document.activeElement as HTMLElement
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          })
        }
      }, 100)
    }
  }

  const validateStep = (step: number): boolean => {
    const values = getValues()
    switch (step) {
      case 1:
        // Check basic validation first
        const hasBasicFields = !!(values.fullName && values.phoneNumber && values.email)
        // Check email format
        const isValidEmail = values.email ? /^\S+@\S+$/i.test(values.email) : false
        // Check if there's no duplicate error
        return hasBasicFields && isValidEmail && !duplicateError
      case 2:
        return !!(values.jobTitle && values.yearsExperience && values.visaStatus)
      case 3:
        return !!(values.country && values.city && values.expectedSalary)
      case 4:
        return !!(values.languagesSpoken?.length > 0) // aboutMe is now optional
      default:
        return false
    }
  }

  const getFieldError = (fieldName: string, value: any): boolean => {
    if (!touchedFields.has(fieldName) && !value) return false
    
    switch (fieldName) {
      case 'fullName':
        return !value || value.length < 2
      case 'phoneNumber':
        return !value || value.length < 8
      case 'email':
        return !value || !/^\S+@\S+$/i.test(value)
      case 'jobTitle':
        return !value
      case 'yearsExperience':
        return !value || value < 1
      case 'visaStatus':
        return !value
      case 'country':
        return !value
      case 'city':
        return !value
      case 'expectedSalary':
        return !value || value < 500
      case 'languagesSpoken':
        return !value || value.length === 0
      default:
        return false
    }
  }

  const handleStepChange = (step: number) => {
    if (step < currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step)
    }
  }

  const handleNext = async () => {
    // Trigger validation for current step fields
    await trigger()

    if (currentStep === 1) {
      // Check for duplicates before proceeding
      const phoneValue = getValues('phoneNumber')
      const emailValue = getValues('email')

      // Only check for duplicates if the basic validation passes
      if (phoneValue && emailValue && /^\S+@\S+$/i.test(emailValue)) {
        const phoneIsDuplicate = await checkDuplicate('phoneNumber', phoneValue)
        const emailIsDuplicate = await checkDuplicate('email', emailValue)

        if (phoneIsDuplicate || emailIsDuplicate) {
          return
        }
      } else {
        // Show validation errors if fields are empty or invalid
        setTouchedFields(new Set(['fullName', 'phoneNumber', 'email']))
        return
      }
    }

    if (validateStep(currentStep)) {
      setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep])
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
        // Auto-scroll to top on mobile
        if (window.innerWidth < 768) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    } else {
      // Mark fields as touched to show validation errors
      if (currentStep === 1) {
        setTouchedFields(new Set(['fullName', 'phoneNumber', 'email']))
      } else if (currentStep === 2) {
        setTouchedFields(prev => new Set([...prev, 'jobTitle', 'yearsExperience', 'visaStatus']))
      } else if (currentStep === 3) {
        setTouchedFields(prev => new Set([...prev, 'country', 'city', 'expectedSalary']))
      } else if (currentStep === 4) {
        setTouchedFields(prev => new Set([...prev, 'languagesSpoken']))
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Auto-scroll to top on mobile
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const onSubmit = async (data: WorkerFormData) => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    
    try {
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

      // Set login state
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('authProvider', 'profile')

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
      {/* Compact Header for Mobile */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Create Your Profile
              </h1>
              <p className="text-gray-600 text-sm mt-1">Join 15,000+ workers</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Step {currentStep}/4</div>
              <div className="flex space-x-1 mt-1">
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
          </div>
        </div>
      </div>

      {/* Compact Progress Steps for Desktop */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
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
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </button>
                  
                  {/* Step Info */}
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
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
        </div>
      </div>

      {/* Form Content - Optimized for Mobile */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Duplicate Error Alert */}
          {duplicateError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 animate-pulse">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-800 text-sm font-medium">{duplicateError}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href="/login"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
                    >
                      Sign In Instead →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDuplicateError('')}
                      className="text-amber-600 hover:text-amber-800 text-sm underline"
                    >
                      Use Different Email/Phone
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-6 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                    <UserIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Personal Information</h2>
                    <p className="text-blue-100 text-sm mt-1">Your basic details</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {profilePicturePreview ? (
                        <img 
                          src={profilePicturePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer shadow-lg transition-colors">
                      <CloudArrowUpIcon className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-xs text-blue-600 font-medium">Optional</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-green-600 font-medium">+80% more responses</span>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <IdentificationIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'Full name is required' })}
                    onFocus={() => handleFieldFocus('fullName')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('fullName', watchedValues.fullName) 
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.fullName 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <PhoneIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      onChange: (e) => {
                        if (duplicateError.includes('mobile number')) {
                          setDuplicateError('')
                        }
                      }
                    })}
                    onFocus={() => handleFieldFocus('phoneNumber')}
                    onBlur={(e) => checkDuplicate('phoneNumber', e.target.value)}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('phoneNumber', watchedValues.phoneNumber) || duplicateError.includes('mobile number')
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.phoneNumber 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500'
                      }`}
                    placeholder="+971 XX XXX XXXX"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.phoneNumber.message}
                    </p>
                  )}
                  {locationInfo && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      Auto-detected: {locationInfo.country}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      },
                      onChange: (e) => {
                        if (duplicateError.includes('email')) {
                          setDuplicateError('')
                        }
                      }
                    })}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={(e) => checkDuplicate('email', e.target.value)}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('email', watchedValues.email) || duplicateError.includes('email')
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.email 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500'
                      }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Job Information */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 py-6 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                    <BriefcaseIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Job Information</h2>
                    <p className="text-green-100 text-sm mt-1">Your professional skills</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                {/* Job Title */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <BriefcaseIcon className="h-4 w-4 mr-2 text-green-600" />
                    Job Title *
                  </label>
                  <select
                    {...register('jobTitle', { required: 'Job title is required' })}
                    onFocus={() => handleFieldFocus('jobTitle')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('jobTitle', watchedValues.jobTitle)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.jobTitle 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                      }`}
                  >
                    <option value="">🔍 Select your job title</option>
                    {jobTitles.map(title => (
                      <option key={title} value={title}>
                        {title === 'Other' ? '✨ Other (specify below)' : `👷 ${title}`}
                      </option>
                    ))}
                  </select>
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
                
                {/* Custom Job Title */}
                {showCustomJobTitle && (
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                      <SparklesIcon className="h-4 w-4 mr-2 text-green-600" />
                      Specify Your Job Title *
                    </label>
                    <input
                      type="text"
                      {...register('customJobTitle', { 
                        required: showCustomJobTitle ? 'Please specify your job title' : false 
                      })}
                      onFocus={() => handleFieldFocus('customJobTitle')}
                      className="w-full px-3 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-base bg-white"
                      placeholder="e.g., Solar Panel Installer, Hotel Manager"
                    />
                    {errors.customJobTitle && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {errors.customJobTitle.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Years of Experience */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <StarIcon className="h-4 w-4 mr-2 text-green-600" />
                    Years of Experience *
                  </label>
                  <select
                    {...register('yearsExperience', { required: 'Experience is required' })}
                    onFocus={() => handleFieldFocus('yearsExperience')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('yearsExperience', watchedValues.yearsExperience)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.yearsExperience 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                      }`}
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
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.yearsExperience.message}
                    </p>
                  )}
                </div>

                {/* Visa Status */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <IdentificationIcon className="h-4 w-4 mr-2 text-green-600" />
                    Visa Status *
                  </label>
                  <select
                    {...register('visaStatus', { required: 'Visa status is required' })}
                    onFocus={() => handleFieldFocus('visaStatus')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('visaStatus', watchedValues.visaStatus)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.visaStatus 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                      }`}
                  >
                    <option value="">Select visa status</option>
                    <option value="Work Visa">🟢 Work Visa</option>
                    <option value="Visit Visa">🟡 Visit Visa</option>
                    <option value="Freelance Visa">🔵 Freelance Visa</option>
                    <option value="Expired Visa">🟠 Expired Visa</option>
                    <option value="No Visa">🔴 No Visa</option>
                  </select>
                  {errors.visaStatus && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.visaStatus.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Salary */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-6 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                    <MapPinIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Location & Salary</h2>
                    <p className="text-purple-100 text-sm mt-1">Where you work and expectations</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                {/* Country */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <GlobeAltIcon className="h-4 w-4 mr-2 text-purple-600" />
                    Country *
                  </label>
                  <select
                    {...register('country', { required: 'Country is required' })}
                    onFocus={() => handleFieldFocus('country')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('country', watchedValues.country)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.country 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500'
                      }`}
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
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-2 text-purple-600" />
                    City *
                  </label>
                  <select
                    {...register('city', { required: 'City is required' })}
                    onFocus={() => handleFieldFocus('city')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('city', watchedValues.city)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : watchedValues.city 
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500'
                      }`}
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
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Expected Salary */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2 text-purple-600" />
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
                      onFocus={() => handleFieldFocus('expectedSalary')}
                      className={`w-full px-3 py-3 pr-16 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200 text-base
                        ${getFieldError('expectedSalary', watchedValues.expectedSalary)
                          ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                          : watchedValues.expectedSalary 
                            ? 'border-green-500 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500'
                        }`}
                      placeholder="3000"
                      min="500"
                      max="20000"
                      step="100"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm">
                      {locationInfo?.currencySymbol || 'AED'}
                    </div>
                  </div>
                  {errors.expectedSalary && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.expectedSalary.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Research market rates for your position
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: About You */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 sm:px-6 py-6 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h2 className="text-xl sm:text-2xl font-bold">About You</h2>
                    <p className="text-orange-100 text-sm mt-1">Final touches to complete</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                {/* Languages */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-orange-600" />
                    Languages You Speak * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {languages.map(language => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageToggle(language)}
                        className={`
                          px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium
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
                  {selectedLanguages.length === 0 && touchedFields.has('languagesSpoken') && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      Please select at least one language
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">
                    Selected: {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* About Me */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <UserIcon className="h-4 w-4 mr-2 text-orange-600" />
                    About Me (Optional)
                  </label>
                  <textarea
                    {...register('aboutMe')}
                    rows={4}
                    onFocus={() => handleFieldFocus('aboutMe')}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 text-base bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell employers about your experience and skills (optional but recommended for better job matches)"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {watch('aboutMe')?.length || 0} characters
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Fixed at bottom for mobile */}
          <div className="sticky bottom-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mx-[-1rem] sm:mx-0 sm:relative">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`
                  px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm
                  ${currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                ← Previous
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">
                  {currentStep}/4
                </span>
              </div>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep) || duplicateError !== ''}
                  className={`
                    px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm relative
                    ${validateStep(currentStep) && !duplicateError
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {duplicateError ? (
                    <span className="flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      Fix Issues
                    </span>
                  ) : validateStep(currentStep) ? (
                    <span className="flex items-center gap-1">
                      Next →
                      <CheckCircleIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    'Complete Form'
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !validateStep(4)}
                  className={`
                    px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 text-sm
                    ${validateStep(4) && !isSubmitting
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Complete</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Success Animation */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center max-w-sm mx-4">
            <div className="animate-bounce mb-4">
              <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Creating Your Profile!</h3>
            <p className="text-gray-600 text-sm">Setting up your account...</p>
          </div>
        </div>
      )}
    </div>
  )
}
