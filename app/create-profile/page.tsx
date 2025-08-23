'use client'

import { useState, useEffect, useRef } from 'react'
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
import ProfileSuccessPopup from '../../components/ProfileSuccessPopup'

interface WorkerFormData {
  fullName: string
  profilePicture: File | null
  jobCategory: string
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

// Helper function to create profile in localStorage
const createProfileInLocalStorage = async (data: WorkerFormData) => {
  const profileId = `worker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Convert profile picture File to base64 data URL if it exists
  let profilePictureUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'

  if (data.profilePicture && data.profilePicture instanceof File) {
    try {
      // Convert File to base64 data URL
      const reader = new FileReader()
      profilePictureUrl = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(data.profilePicture!)
      })
    } catch (error) {
      console.warn('Error converting profile picture to base64:', error)
      // Keep default image if conversion fails
    }
  }

  const profileData = {
    id: profileId,
    fullName: data.fullName,
    profilePicture: profilePictureUrl,
    jobCategory: data.jobCategory,
    jobTitle: data.jobTitle,
    customJobTitle: data.customJobTitle,
    jobProfile: data.jobProfile,
    yearsExperience: data.yearsExperience,
    city: data.city,
    country: data.country,
    languagesSpoken: data.languagesSpoken,
    expectedSalary: data.expectedSalary,
    visaStatus: data.visaStatus,
    availability: true,
    aboutMe: data.aboutMe,
    phoneNumber: data.phoneNumber,
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Save individual profile
  localStorage.setItem('userProfile', JSON.stringify(profileData))
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('authProvider', 'localStorage')

  // Update allUserProfiles array
  const existingProfiles = JSON.parse(localStorage.getItem('allUserProfiles') || '[]')

  // Remove any existing profile with same email
  const filteredProfiles = existingProfiles.filter((p: any) => p.email !== data.email)

  // Add new profile
  filteredProfiles.push(profileData)

  localStorage.setItem('allUserProfiles', JSON.stringify(filteredProfiles))

  console.log('✅ Profile saved to localStorage:', profileData.fullName)
  return profileData
}

// Database health check function
const checkDatabaseHealth = async () => {
  try {
    console.log('🏥 Checking database health...')
    const response = await fetch('/api/health')
    const healthData = await response.json()

    let message = `🏥 DATABASE HEALTH CHECK:\n\n`
    message += `Status: ${healthData.status.toUpperCase()}\n\n`

    const dbCheck = healthData.checks?.database
    if (dbCheck) {
      message += `Database: ${dbCheck.status.toUpperCase()}\n`
      message += `Message: ${dbCheck.message}\n`

      if (dbCheck.details?.connectionString) {
        message += `Connection: ${dbCheck.details.connectionString}\n`
      }
    }

    const envCheck = healthData.checks?.environment
    if (envCheck) {
      message += `\nEnvironment: ${envCheck.status.toUpperCase()}\n`
      message += `Database URL: ${envCheck.details?.DATABASE_URL || 'Not configured'}\n`
    }

    if (healthData.status === 'unhealthy') {
      message += `\n❌ Database issues detected!\n`
      message += `💡 Profiles will be saved to localStorage until database is fixed.`
    } else {
      message += `\n✅ Database is working properly!`
    }

    alert(message)
  } catch (error) {
    console.error('Health check failed:', error)
    alert(`❌ Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\n💡 This likely means the database is not connected.\nProfiles will be saved locally.`)
  }
}

const jobCategories = {
  'Domestic & Personal Care Workers': {
    emoji: '🏠',
    jobs: [
      'Nanny (Childcare Worker)',
      'Housemaid',
      'Cook (Home-based)',
      'Elderly Caregiver',
      'Babysitter',
      'Domestic Helper',
      'Governess (Live-in Tutor/Nanny)',
      'Housekeeper (Residential)',
      'Personal Attendant',
      'Live-in Maid'
    ]
  },
  'Construction & Infrastructure': {
    emoji: '🚧',
    jobs: [
      'Construction Laborer',
      'Mason',
      'Carpenter',
      'Electrician',
      'Plumber',
      'Welder',
      'Painter',
      'Steel Fixer',
      'Scaffold Worker',
      'Tile Setter',
      'HVAC Technician',
      'Crane Operator',
      'Heavy Equipment Operator',
      'Site Supervisor',
      'Road Construction Worker'
    ]
  },
  'Mechanical & Technical': {
    emoji: '🛠️',
    jobs: [
      'Auto Mechanic',
      'Diesel Mechanic',
      'Machine Operator',
      'CNC Machine Operator',
      'Fitter',
      'Maintenance Technician',
      'Elevator Technician',
      'AC Technician',
      'Forklift Operator',
      'Lathe Machine Operator'
    ]
  },
  'Manufacturing & Factory': {
    emoji: '🧰',
    jobs: [
      'Factory Worker',
      'Assembly Line Worker',
      'Packer',
      'Warehouse Associate',
      'Quality Checker',
      'Production Supervisor',
      'Fabricator',
      'Loader/Unloader'
    ]
  },
  'Transport & Logistics': {
    emoji: '����',
    jobs: [
      'Truck Driver',
      'Delivery Driver',
      'Bus Driver',
      'Light Vehicle Driver',
      'Logistics Assistant',
      'Dispatch Coordinator',
      'Heavy Vehicle Driver'
    ]
  },
  'Cleaning & Maintenance': {
    emoji: '🧹',
    jobs: [
      'Cleaner',
      'Housekeeping Staff',
      'Janitor',
      'Building Maintenance Worker',
      'Car Wash Attendant',
      'Office Cleaner'
    ]
  },
  'Hospitality & Food': {
    emoji: '🧑‍🍳',
    jobs: [
      'Cook',
      'Kitchen Helper',
      'Waiter',
      'Dishwasher',
      'Restaurant Cleaner',
      'Barista',
      'Food Delivery Rider'
    ]
  },
  'Security & General Services': {
    emoji: '👷‍♂️',
    jobs: [
      'Security Guard',
      'Watchman',
      'Lifeguard',
      'Maintenance Helper',
      'General Helper'
    ]
  },
  'Garments & Tailoring': {
    emoji: '🧵',
    jobs: [
      'Tailor',
      'Ironing Staff',
      'Textile Factory Worker'
    ]
  },
  'Agriculture & Farming': {
    emoji: '🧑‍🌾',
    jobs: [
      'Farm Worker',
      'Livestock Handler',
      'Greenhouse Worker'
    ]
  },
  'Other Common Jobs': {
    emoji: '���',
    jobs: [
      'Petrol Pump Attendant',
      'Office Boy',
      'Tea Boy',
      'Baggage Handler',
      'Laundry Worker',
      'Pest Control Worker'
    ]
  }
}

// Create a flat array of all job titles for backward compatibility
const allJobTitles = Object.values(jobCategories).flatMap(category => category.jobs)
const jobTitles: (string)[] = [...allJobTitles, 'Other']

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
      expectedSalary: 2000,
      jobCategory: '',
      jobTitle: undefined as JobTitle | 'Other' | undefined
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
  const [isFormInitialized, setIsFormInitialized] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [createdUserData, setCreatedUserData] = useState<{fullName: string, email: string} | null>(null)
  const photoUploadRef = useRef<HTMLInputElement>(null)

  const selectedJobTitle = watch('jobTitle')
  const selectedJobCategory = watch('jobCategory')
  const selectedCountry = watch('country')
  const selectedLanguages = watch('languagesSpoken') || []

  // Watch all form values for real-time validation
  const watchedValues = watch()

  // Get available jobs for selected category
  const getAvailableJobs = (category: string): string[] => {
    if (!category || category === '') return []
    const categoryData = jobCategories[category as keyof typeof jobCategories]
    return categoryData ? categoryData.jobs : []
  }

  // Clear job title when category changes
  useEffect(() => {
    if (selectedJobCategory && watchedValues.jobTitle) {
      const availableJobs = getAvailableJobs(selectedJobCategory)
      if (!availableJobs.includes(watchedValues.jobTitle) && watchedValues.jobTitle !== 'Other') {
        // Use first available job as default instead of empty string
        const defaultJob = availableJobs.length > 0 ? availableJobs[0] as JobTitle : 'Other'
        setValue('jobTitle', defaultJob)
      }
    }
  }, [selectedJobCategory, setValue, watchedValues.jobTitle])

  // Enhanced location detection
  useEffect(() => {
    const detectLocation = async () => {
      let detectedCountry: Country = 'UAE'
      let detectedFromIP = false

      try {
        // Try multiple IP-based detection APIs
        const apis = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/',
          'https://geolocation-db.com/json/'
        ]

        for (const apiUrl of apis) {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 3000)

            console.log('�� Trying location detection from:', apiUrl)
            const response = await fetch(apiUrl, {
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
              }
            })
            clearTimeout(timeoutId)

            if (response.ok) {
              const data = await response.json()
              console.log('📍 Location API response:', data)

              // Handle different API response formats
              let countryCode = data.country_code || data.countryCode || data.country_code

              // Map country codes to our supported countries
              const countryMapping: Record<string, Country> = {
                'AE': 'UAE',
                'QA': 'Qatar',
                'SA': 'Saudi Arabia',
                'OM': 'Oman',
                'KW': 'Kuwait',
                'BH': 'Bahrain'
              }

              if (countryCode && countryMapping[countryCode.toUpperCase()]) {
                detectedCountry = countryMapping[countryCode.toUpperCase()]
                detectedFromIP = true
                console.log('✅ Location detected from IP via', apiUrl, ':', detectedCountry)
                break // Exit loop on success
              } else {
                console.log('⚠️ Country not in Gulf region:', countryCode, 'from', apiUrl)
              }
            }
          } catch (apiError) {
            console.log('❌ API failed:', apiUrl, apiError)
            continue // Try next API
          }
        }
      } catch (error) {
        console.log('❌ All IP detection failed, trying timezone...', error)

        // Fallback to timezone-based detection
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

          if (timezone.includes('Qatar') || timezone.includes('Doha')) detectedCountry = 'Qatar'
          else if (timezone.includes('Riyadh') || timezone.includes('Saudi')) detectedCountry = 'Saudi Arabia'
          else if (timezone.includes('Muscat') || timezone.includes('Oman')) detectedCountry = 'Oman'
          else if (timezone.includes('Kuwait')) detectedCountry = 'Kuwait'
          else if (timezone.includes('Bahrain') || timezone.includes('Manama')) detectedCountry = 'Bahrain'
          else if (timezone.includes('Dubai') || timezone.includes('UAE')) detectedCountry = 'UAE'

          console.log('✅ Location detected from timezone:', detectedCountry)
        } catch (tzError) {
          console.log('Using UAE as default location')
        }
      }

      const info = countryInfo[detectedCountry]
      setLocationInfo({
        country: detectedCountry,
        currency: info.currency,
        currencySymbol: info.currencySymbol,
        phoneCode: info.phoneCode,
        detectedFromIP
      })

      setValue('country', detectedCountry)
      setValue('phoneNumber', info.phoneCode)

      // Mark form as initialized after location is set
      setTimeout(() => {
        setIsFormInitialized(true)
        // Focus on photo upload area after initialization
        if (photoUploadRef.current) {
          photoUploadRef.current.focus()
        }
      }, 500)
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

        // Smooth scroll to error section
        setTimeout(() => {
          const errorElement = document.querySelector('[data-duplicate-error]')
          if (errorElement) {
            errorElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            })
          }
        }, 100)

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
      console.log('📷 File selected:', {
        name: file.name,
        size: file.size,
        type: file.type,
        sizeInMB: (file.size / 1024 / 1024).toFixed(2)
      })

      setValue('profilePicture', file)
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        console.log('🔄 File converted to base64:', {
          length: result.length,
          type: typeof result,
          isDataURL: result.startsWith('data:'),
          mimeType: result.split(',')[0],
          sizeInKB: (result.length / 1024).toFixed(2)
        })
        setProfilePicturePreview(result)
      }
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLanguageToggle = (language: string) => {
    const current = selectedLanguages
    const updated = current.includes(language)
      ? current.filter(l => l !== language)
      : [...current, language]

    console.log('🌐 Language toggle:', {
      language,
      current,
      updated,
      isAdding: !current.includes(language)
    })

    setValue('languagesSpoken', updated)
    trigger('languagesSpoken')

    // Verify the value was set
    setTimeout(() => {
      const newValue = getValues('languagesSpoken')
      console.log('✅ Language value after toggle:', newValue)
    }, 50)
  }

  const clearLocalStorageAndRetry = () => {
    if (confirm('This will clear all stored profile data and refresh the page. Are you sure?')) {
      try {
        // Clear profile-related localStorage
        localStorage.removeItem('userProfile')
        localStorage.removeItem('allUserProfiles')
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('authProvider')
        localStorage.removeItem('hasCleanedSampleData')

        console.log('🧹 localStorage cleared successfully')
        alert('Storage cleared! The page will refresh and you can try creating your profile again.')

        // Refresh the page
        window.location.reload()
      } catch (error) {
        console.error('Error clearing localStorage:', error)
        alert('Unable to clear storage. Please manually clear your browser cache and refresh the page.')
      }
    }
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
        return !!(values.jobCategory && values.jobTitle && values.yearsExperience && values.visaStatus)
      case 3:
        return !!(values.country && values.city && values.expectedSalary)
      case 4: {
      // Enhanced debugging for step 4 validation
      const languages = values.languagesSpoken || []
      const hasLanguages = languages.length > 0

      console.log('🔍 Step 4 validation check:')
      console.log('  - Languages array:', languages)
      console.log('  - Languages count:', languages.length)
      console.log('  - Has languages:', hasLanguages)
      console.log('  - About me:', values.aboutMe)
      console.log('  - Form initialized:', isFormInitialized)
      console.log('  - All form values:', values)

      return hasLanguages // aboutMe is optional
    }
      default:
        return false
    }
  }

  const getFieldError = (fieldName: string, value: any): boolean => {
    // Don't show errors until form is properly initialized
    if (!isFormInitialized) return false

    // Don't show errors for phone number on initial load
    if (fieldName === 'phoneNumber' && !touchedFields.has('phoneNumber')) {
      return false
    }

    if (!touchedFields.has(fieldName) && !value) return false

    switch (fieldName) {
      case 'fullName':
        return !value || value.length < 2
      case 'phoneNumber':
        return !value || value.length < 8
      case 'email':
        return !value || !/^\S+@\S+$/i.test(value)
      case 'jobCategory':
        return !value
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
        setTouchedFields(prev => new Set([...Array.from(prev), 'jobCategory', 'jobTitle', 'yearsExperience', 'visaStatus']))
      } else if (currentStep === 3) {
        setTouchedFields(prev => new Set([...Array.from(prev), 'country', 'city', 'expectedSalary']))
      } else if (currentStep === 4) {
        setTouchedFields(prev => new Set([...Array.from(prev), 'languagesSpoken']))
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
    console.log('🚀 onSubmit triggered with data:', data)

    // Enhanced validation check with detailed logging
    const isValidStep4 = validateStep(4)
    console.log('✅ Step 4 validation result:', isValidStep4)

    if (!isValidStep4) {
      const currentValues = getValues()
      console.error('❌ Step 4 validation failed. Current values:', currentValues)
      console.error('❌ Languages selected:', currentValues.languagesSpoken)
      alert('Please ensure all required fields are filled:\n• Select at least one language\n• Complete any missing information')
      return
    }

    setIsSubmitting(true)

    try {
      console.log('📝 Attempting to create user and worker profile...')

      // Try database first, fall back to localStorage
      let profileCreatedInDatabase = false

      try {
        // Step 1: Register user
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            phone: data.phoneNumber,
            fullName: data.fullName,
            userType: 'worker'
          })
        })

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json()
          if (registerResponse.status === 409) {
            // User already exists, try to login
            console.log('👤 User already exists, attempting login...')
            const loginResponse = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email
              })
            })

            if (!loginResponse.ok) {
              throw new Error('Login failed for existing user')
            }
          } else if (registerResponse.status === 503 && errorData.fallback) {
            // Database not configured, skip to localStorage fallback
            console.log('����️ Database not configured, skipping to localStorage fallback')
            throw new Error('Database not configured - using localStorage')
          } else {
            throw new Error(errorData.error || 'Failed to register user')
          }
        }

        console.log('✅ User registration/login successful')

        // Step 2: Create worker profile
        console.log('🔍 Step 2: Creating worker profile...')
        console.log('🖼️ Profile picture debug:', {
          hasPreview: !!profilePicturePreview,
          type: typeof profilePicturePreview,
          length: profilePicturePreview ? profilePicturePreview.length : 0,
          isDataURL: profilePicturePreview?.startsWith('data:'),
          start: profilePicturePreview?.substring(0, 50)
        })

        const profileResponse = await fetch('/api/profiles/workers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for session
          body: JSON.stringify({
            jobCategory: data.jobCategory,
            jobTitle: data.jobTitle,
            customJobTitle: data.customJobTitle,
            jobProfile: data.jobProfile,
            yearsExperience: data.yearsExperience,
            city: data.city,
            country: data.country,
            expectedSalary: data.expectedSalary,
            visaStatus: data.visaStatus,
            languagesSpoken: data.languagesSpoken,
            aboutMe: data.aboutMe,
            profilePictureUrl: profilePicturePreview || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
          })
        })

        if (profileResponse.ok) {
          console.log('✅ Worker profile created successfully in database')
          profileCreatedInDatabase = true

          // Update localStorage for backward compatibility
          try {
            const profileData = await profileResponse.json()
            console.log('📄 Profile data received from database:', {
              fullName: profileData.profile?.fullName,
              hasProfilePicture: !!profileData.profile?.profilePicture,
              profilePictureType: typeof profileData.profile?.profilePicture,
              profilePictureLength: profileData.profile?.profilePicture?.length,
              profilePictureStart: profileData.profile?.profilePicture?.substring(0, 50)
            })

            localStorage.setItem('userProfile', JSON.stringify(profileData.profile))
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('authProvider', 'database')
            console.log('✅ localStorage updated for compatibility')
          } catch (storageError) {
            console.warn('⚠️ localStorage update failed, but profile is saved in database:', storageError)
          }
        } else if (profileResponse.status === 503) {
          // Database not configured, this will trigger the fallback
          const errorData = await profileResponse.json()
          console.log('🗄️ Database not configured for profile creation, using localStorage fallback')
          throw new Error('Database not configured - using localStorage')
        } else {
          const errorData = await profileResponse.json()
          throw new Error(errorData.error || 'Database profile creation failed')
        }

      } catch (databaseError) {
        console.warn('⚠️ Database creation failed, falling back to localStorage:', databaseError)

        // Fallback: Create profile in localStorage
        console.log('📝 Creating profile in localStorage as fallback...')
        console.log('🖼️ Profile picture for localStorage:', {
          hasFile: !!data.profilePicture,
          isFile: data.profilePicture instanceof File,
          hasPreview: !!profilePicturePreview,
          previewType: typeof profilePicturePreview,
          previewStart: profilePicturePreview?.substring(0, 50)
        })
        await createProfileInLocalStorage(data)
        console.log('✅ Profile created successfully in localStorage')
      }

      // Dispatch auth state change event to update header
      console.log('📡 Dispatching auth state change event...')
      window.dispatchEvent(new Event('authStateChanged'))

      console.log('🎉 Profile creation successful! Sending welcome email and showing success popup...')

      // Set user data for popup
      setCreatedUserData({
        fullName: data.fullName,
        email: data.email
      })

      // Try to send welcome email
      try {
        console.log('📧 Attempting to send welcome email...')
        const emailResponse = await fetch('/api/auth/send-welcome-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'temp_user_id', // This will be replaced with actual user ID from database
            fullName: data.fullName,
            email: data.email,
            jobTitle: data.jobTitle,
            city: data.city,
            country: data.country
          })
        })

        if (emailResponse.ok) {
          console.log('✅ Welcome email sent successfully')
        } else {
          const emailError = await emailResponse.json()
          console.warn('⚠️ Welcome email failed:', emailError)
          // Continue to show popup even if email fails
        }
      } catch (emailError) {
        console.warn('⚠️ Error sending welcome email:', emailError)
        // Continue to show popup even if email fails
      }

      // Show success popup
      setShowSuccessPopup(true)

    } catch (error) {
      console.error('❌ Error creating profile:', error)

      // Final fallback: try localStorage even if everything else failed
      try {
        console.log('🔄 Final fallback: Attempting to save profile in localStorage...')
        await createProfileInLocalStorage(data)

        // Success with localStorage fallback
        console.log('✅ Profile created successfully in localStorage fallback')

        // Dispatch auth state change
        window.dispatchEvent(new Event('authStateChanged'))

        // Set user data for popup
        setCreatedUserData({
          fullName: data.fullName,
          email: data.email
        })

        // Show success popup (email sending might not work in fallback mode)
        setShowSuccessPopup(true)

        return // Exit successfully
      } catch (localStorageError) {
        console.error('❌ Final localStorage fallback also failed:', localStorageError)
      }

      // More specific error messages
      let errorMessage = 'Error creating profile. Please try again.'

      if (error instanceof Error) {
        if (error.message.includes('register') || error.message.includes('login')) {
          errorMessage = `Account Error: ${error.message}\n\nTry refreshing the page or check if the database is connected.`
        } else if (error.message.includes('profile')) {
          errorMessage = `Profile Error: ${error.message}\n\nThe profile data is valid but couldn't be saved. Please try again.`
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error: Please check your internet connection and try again.\n\nIf the problem persists, the database may be unavailable.'
        } else {
          errorMessage = `Profile creation failed: ${error.message}\n\nTip: Try connecting to the Neon database in admin panel.`
        }
      }

      // Add troubleshooting info
      errorMessage += '\n\n🔧 Troubleshooting:\n• Check if database is connected\n• Try refreshing the page\n• Contact support if issue persists'

      alert(errorMessage)
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
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <UserIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Create Profile</span>
          </nav>
        </div>
      </div>

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
            <div
              data-duplicate-error
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-800 text-sm font-medium">{duplicateError}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-3">
                    <Link
                      href="/login"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 w-full sm:w-auto justify-center"
                    >
                      Sign In Instead →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDuplicateError('')}
                      className="text-amber-600 hover:text-amber-800 text-sm underline w-full sm:w-auto text-center"
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
                {/* Profile Picture - Prominent Upload */}
                <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300">
                  <label className="relative cursor-pointer group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-blue-200 shadow-lg group-hover:border-blue-400 transition-all duration-200">
                      {profilePicturePreview ? (
                        <img
                          src={profilePicturePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <CloudArrowUpIcon className="h-10 w-10 text-blue-400 mx-auto mb-1" />
                          <span className="text-xs text-blue-600 font-medium">Click to upload</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors group-hover:scale-110">
                      <PhotoIcon className="h-4 w-4" />
                    </div>
                    <input
                      ref={photoUploadRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <div className="text-center">
                    <p className="text-sm font-bold text-blue-700">Upload Your Photo</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-xs text-blue-600 font-medium">Optional</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-green-600 font-bold">+80% more responses!</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
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
                      {locationInfo.detectedFromIP ? 'Auto-detected from IP' : 'Auto-detected'}: {locationInfo.country}
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
                {/* Job Category */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <BriefcaseIcon className="h-4 w-4 mr-2 text-green-600" />
                    Job Category *
                  </label>
                  <select
                    {...register('jobCategory', { required: 'Job category is required' })}
                    onFocus={() => handleFieldFocus('jobCategory')}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base
                      ${getFieldError('jobCategory', watchedValues.jobCategory)
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : watchedValues.jobCategory
                          ? 'border-green-500 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                      }`}
                  >
                    <option value="">📋 Select job category first</option>
                    {Object.entries(jobCategories).map(([categoryName, categoryData]) => (
                      <option key={categoryName} value={categoryName}>
                        {categoryData.emoji} {categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.jobCategory && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.jobCategory.message}
                    </p>
                  )}
                </div>

                {/* Job Title */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <BriefcaseIcon className="h-4 w-4 mr-2 text-green-600" />
                    Job Title *
                  </label>
                  <select
                    {...register('jobTitle', { required: 'Job title is required' })}
                    onFocus={() => handleFieldFocus('jobTitle')}
                    disabled={!selectedJobCategory}
                    className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base
                      ${!selectedJobCategory
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : getFieldError('jobTitle', watchedValues.jobTitle)
                          ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                          : watchedValues.jobTitle
                            ? 'border-green-500 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                      }`}
                  >
                    <option value="">
                      {!selectedJobCategory
                        ? '🔒 Select category first'
                        : '🔍 Select your job title'
                      }
                    </option>
                    {selectedJobCategory && getAvailableJobs(selectedJobCategory).map(job => (
                      <option key={job} value={job}>
                        👷 {job}
                      </option>
                    ))}
                    {selectedJobCategory && (
                      <option value="Other">✨ Other (specify below)</option>
                    )}
                  </select>
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {errors.jobTitle.message}
                    </p>
                  )}
                  {selectedJobCategory && !watchedValues.jobTitle && (
                    <p className="text-green-600 text-xs mt-1">
                      ✅ {getAvailableJobs(selectedJobCategory).length} jobs available in {selectedJobCategory}
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
                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <IdentificationIcon className="h-4 w-4 mr-2 text-green-600" />
                    Visa Status *
                  </label>
                  <div className="relative">
                    <select
                      {...register('visaStatus', { required: 'Visa status is required' })}
                      onFocus={() => handleFieldFocus('visaStatus')}
                      className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200 text-base appearance-none bg-white
                        ${getFieldError('visaStatus', watchedValues.visaStatus)
                          ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                          : watchedValues.visaStatus
                            ? 'border-green-500 bg-green-50 focus:border-green-500'
                            : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500'
                        }`}
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="">Select visa status</option>
                      <option value="Work Visa">🟢 Work Visa</option>
                      <option value="Visit Visa">🟡 Visit Visa</option>
                      <option value="Freelance Visa">🔵 Freelance Visa</option>
                      <option value="Expired Visa">🟠 Expired Visa</option>
                      <option value="No Visa">🔴 No Visa</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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
                    <option value="Kuwait">🇰��� Kuwait</option>
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
                <div className="space-y-3">
                  {/* Debug Buttons (Development only) */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          const values = getValues()
                          console.log('🔧 DEBUG - Current form values:', values)
                          console.log('🔧 DEBUG - Languages:', values.languagesSpoken)
                          console.log('🔧 DEBUG - Validation step 4:', validateStep(4))
                          console.log('🔧 DEBUG - Touched fields:', Array.from(touchedFields))
                          console.log('🔧 DEBUG - Duplicate error:', duplicateError)

                          // Check localStorage state
                          const userProfile = localStorage.getItem('userProfile')
                          const allProfiles = localStorage.getItem('allUserProfiles')
                          console.log('🔧 DEBUG - localStorage userProfile:', userProfile ? 'EXISTS' : 'MISSING')
                          console.log('🔧 DEBUG - localStorage allUserProfiles:', allProfiles ? 'EXISTS' : 'MISSING')

                          alert(`Debug Info:\nLanguages: ${values.languagesSpoken?.length || 0} selected\nStep 4 valid: ${validateStep(4)}\nuserProfile: ${userProfile ? 'EXISTS' : 'MISSING'}\nallUserProfiles: ${allProfiles ? 'EXISTS' : 'MISSING'}\n\nCheck console for detailed logs`)
                        }}
                        className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        🔧 Debug Form & Storage
                      </button>

                      <button
                        type="button"
                        onClick={clearLocalStorageAndRetry}
                        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        🧹 Clear Storage & Refresh
                      </button>

                      <button
                        type="button"
                        onClick={checkDatabaseHealth}
                        className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        🏥 Check Database Health
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !validateStep(4)}
                    className={`
                      w-full px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm
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
                </div>
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

      {/* Success Popup */}
      <ProfileSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false)
          router.push('/dashboard')
        }}
        userEmail={createdUserData?.email || ''}
        userName={createdUserData?.fullName || ''}
      />
    </div>
  )
}
