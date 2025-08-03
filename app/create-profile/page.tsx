'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PhotoIcon, UserIcon, CloudArrowUpIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
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

const countries: Country[] = ['UAE', 'Qatar', 'Saudi Arabia', 'Oman', 'Kuwait', 'Bahrain']

const commonLanguages = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog', 'Bengali', 'Tamil', 'Malayalam'
]

// Location detection helper with fallback
const detectUserLocation = async (): Promise<LocationInfo> => {
  // Default fallback location
  const defaultLocation: LocationInfo = {
    country: 'UAE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    phoneCode: '+971',
    detectedFromIP: false
  }

  try {
    // Create timeout controller
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.log('Location API response not OK:', response.status)
      return defaultLocation
    }

    const data = await response.json()

    if (!data || typeof data !== 'object') {
      console.log('Invalid location API response format')
      return defaultLocation
    }

    const countryCode = data.country_code?.toLowerCase()

    // Map country codes to our supported countries
    const countryMapping: Record<string, LocationInfo> = {
      'ae': { country: 'UAE', currency: 'AED', currencySymbol: 'د.إ', phoneCode: '+971', detectedFromIP: true },
      'qa': { country: 'Qatar', currency: 'QAR', currencySymbol: 'ر.ق', phoneCode: '+974', detectedFromIP: true },
      'sa': { country: 'Saudi Arabia', currency: 'SAR', currencySymbol: 'ر.س', phoneCode: '+966', detectedFromIP: true },
      'om': { country: 'Oman', currency: 'OMR', currencySymbol: 'ر.ع.', phoneCode: '+968', detectedFromIP: true },
      'kw': { country: 'Kuwait', currency: 'KWD', currencySymbol: 'د.ك', phoneCode: '+965', detectedFromIP: true },
      'bh': { country: 'Bahrain', currency: 'BHD', currencySymbol: 'د.ب', phoneCode: '+973', detectedFromIP: true }
    }

    if (countryCode && countryMapping[countryCode]) {
      return countryMapping[countryCode]
    }

    return defaultLocation

  } catch (error) {
    console.log('Location detection failed, using fallback:', error)

    // Try timezone-based detection as fallback
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const timezoneMapping: Record<string, LocationInfo> = {
        'Asia/Dubai': { country: 'UAE', currency: 'AED', currencySymbol: 'د.إ', phoneCode: '+971', detectedFromIP: false },
        'Asia/Qatar': { country: 'Qatar', currency: 'QAR', currencySymbol: 'ر.ق', phoneCode: '+974', detectedFromIP: false },
        'Asia/Riyadh': { country: 'Saudi Arabia', currency: 'SAR', currencySymbol: 'ر.س', phoneCode: '+966', detectedFromIP: false },
        'Asia/Muscat': { country: 'Oman', currency: 'OMR', currencySymbol: 'ر.ع.', phoneCode: '+968', detectedFromIP: false },
        'Asia/Kuwait': { country: 'Kuwait', currency: 'KWD', currencySymbol: 'د.ك', phoneCode: '+965', detectedFromIP: false },
        'Asia/Bahrain': { country: 'Bahrain', currency: 'BHD', currencySymbol: 'د.ب', phoneCode: '+973', detectedFromIP: false }
      }

      if (timezone && timezoneMapping[timezone]) {
        return timezoneMapping[timezone]
      }
    } catch (timezoneError) {
      console.log('Timezone detection also failed:', timezoneError)
    }

    return defaultLocation
  }
}

export default function CreateProfile() {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [customLanguage, setCustomLanguage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<Country | ''>("")
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const [showCustomJobTitle, setShowCustomJobTitle] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, setError, clearErrors } = useForm<WorkerFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      jobTitle: '' as JobTitle,
      customJobTitle: '',
      jobProfile: '',
      yearsExperience: 0,
      expectedSalary: 1500,
      visaStatus: 'Work Visa',
      country: '' as Country,
      city: '' as City,
      aboutMe: '',
      languagesSpoken: [],
      profilePicture: null
    }
  })
  
  const watchedJobTitle = watch('jobTitle')
  
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const location = await detectUserLocation()
        setLocationInfo(location)

        // Auto-fill country and phone code if detected
        if (location.detectedFromIP) {
          setValue('country', location.country)
          setSelectedCountry(location.country)
          setValue('phoneNumber', location.phoneCode + ' ')
        }
      } catch (error) {
        console.error('Failed to initialize location:', error)
        // Set default location
        const defaultLocation: LocationInfo = {
          country: 'UAE',
          currency: 'AED',
          currencySymbol: 'د.إ',
          phoneCode: '+971',
          detectedFromIP: false
        }
        setLocationInfo(defaultLocation)
      } finally {
        setIsLoadingLocation(false)
      }
    }

    initializeLocation()
  }, [setValue])
  
  useEffect(() => {
    setShowCustomJobTitle(watchedJobTitle === 'Other')
  }, [watchedJobTitle])

  const handleLanguageToggle = (language: string) => {
    let newLanguages: string[]
    if (selectedLanguages.includes(language)) {
      newLanguages = selectedLanguages.filter(l => l !== language)
    } else {
      newLanguages = [...selectedLanguages, language]
    }
    setSelectedLanguages(newLanguages)
    setValue('languagesSpoken', newLanguages)
    
    // Clear language validation error if at least one language is selected
    if (newLanguages.length > 0) {
      clearErrors('languagesSpoken')
    }
  }

  const addCustomLanguage = () => {
    if (customLanguage.trim() && !selectedLanguages.includes(customLanguage.trim())) {
      const newLanguages = [...selectedLanguages, customLanguage.trim()]
      setSelectedLanguages(newLanguages)
      setCustomLanguage('')
      setValue('languagesSpoken', newLanguages)
      
      // Clear validation error
      if (newLanguages.length > 0) {
        clearErrors('languagesSpoken')
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('profilePicture', { message: 'Please select a valid image file' })
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('profilePicture', { message: 'Image size must be less than 5MB' })
        return
      }
      
      // Auto-resize image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set target dimensions (max 400x400)
        const maxWidth = 400
        const maxHeight = 400
        let { width, height } = img
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }
        
        // Resize canvas and draw image
        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Convert to blob and create preview
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, { type: file.type })
            setProfileImage(resizedFile)
            setValue('profilePicture', resizedFile)
            clearErrors('profilePicture')
            
            const reader = new FileReader()
            reader.onload = (e) => {
              setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(resizedFile)
          }
        }, file.type, 0.9)
      }
      
      img.src = URL.createObjectURL(file)
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value as Country
    setSelectedCountry(country)
    setValue('country', country)
    setValue('city', '' as City) // Reset city when country changes
    clearErrors('country')
  }

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) || 'Please enter a valid email address'
  }

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/\s/g, '')) || 'Please enter a valid phone number'
  }

  const validateFullName = (name: string) => {
    if (name.length < 2) return 'Name must be at least 2 characters'
    if (name.length > 50) return 'Name must be less than 50 characters'
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces'
    return true
  }

  const onSubmit = async (data: WorkerFormData) => {
    // Additional validation before submit
    if (selectedLanguages.length === 0) {
      setError('languagesSpoken', { message: 'Please select at least one language' })
      return
    }

    if (!profileImage) {
      setError('profilePicture', { message: 'Please upload a profile picture' })
      return
    }
    
    if (data.jobTitle === 'Other' && !data.customJobTitle?.trim()) {
      setError('customJobTitle', { message: 'Please specify your job title' })
      return
    }

    setIsSubmitting(true)
    try {
      // Prepare profile data
      const profileData = {
        ...data,
        jobTitle: data.jobTitle === 'Other' ? data.customJobTitle : data.jobTitle,
        languagesSpoken: selectedLanguages,
        profilePicture: imagePreview,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        availability: true
      }
      
      // In a real app, you would:
      // 1. Upload image to cloud storage
      // 2. Send data to API
      // 3. Send welcome email with login credentials
      console.log('Profile data:', profileData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store profile data
      localStorage.setItem('userProfile', JSON.stringify(profileData))
      
      // Simulate sending email with login credentials
      const loginId = `USER${Date.now().toString().slice(-6)}`
      const tempPassword = Math.random().toString(36).slice(-8).toUpperCase()
      
      localStorage.setItem('userCredentials', JSON.stringify({
        email: data.email,
        loginId,
        tempPassword,
        profileId: profileData.id
      }))
      
      // Show success message
      alert(`🎉 Profile created successfully! 

📧 Login credentials sent to ${data.email}:
🆔 Login ID: ${loginId}
🔑 Password: ${tempPassword}

Please check your email and bookmark these credentials for future login.`)
      
      // Auto redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      alert('Error creating profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Location Detection Banner - Only show when successfully detected */}
      {locationInfo?.detectedFromIP && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm">
              <GlobeAltIcon className="h-4 w-4" />
              <span>📍 Location detected: {locationInfo.country} - Currency set to {locationInfo.currency}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 rounded-full shadow-xl">
                <SparklesIcon className="h-8 sm:h-12 w-8 sm:w-12 text-white" />
              </div>
            </div>



            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-navy-900 to-primary-600 bg-clip-text text-transparent mb-4">
              Create Your Professional Profile
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands of skilled workers and get hired by top employers across the Gulf region
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-white rounded-full px-6 py-2 shadow-lg border">
                <span className="text-sm text-gray-600">🌟 100% Free • Verified Profiles • Instant Matching</span>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
            {/* Form Progress Indicator */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-1">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="font-medium text-gray-700">Personal Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Job Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Complete</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-8">
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6 flex items-center">
                  <div className="bg-primary-600 p-2 rounded-lg mr-3">
                    <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  Personal Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', {
                        required: 'Full name is required',
                        validate: validateFullName
                      })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Professional Profile Picture *
                    </label>
                    <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary-400 transition-colors">
                      <div className="flex flex-col items-center">
                        {imagePreview ? (
                          <div className="mb-4">
                            <img
                              src={imagePreview}
                              alt="Profile preview"
                              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <p className="text-green-600 text-sm mt-2 font-medium">✓ Image uploaded and auto-resized</p>
                          </div>
                        ) : (
                          <div className="mb-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                              <PhotoIcon className="h-10 w-10 text-primary-600" />
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="profile-image"
                        />
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg"
                        >
                          <CloudArrowUpIcon className="h-5 w-5" />
                          {imagePreview ? 'Change Photo' : 'Upload Photo'}
                        </label>
                        <p className="text-sm text-gray-500 mt-3">
                          📸 JPG, PNG up to 5MB • Auto-resized for optimal quality
                        </p>
                      </div>
                    </div>
                    {errors.profilePicture && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.profilePicture.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        validate: validateEmail
                      })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.email.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">📧 Login credentials will be sent to this email</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phoneNumber', { 
                        required: 'Phone number is required',
                        validate: validatePhoneNumber
                      })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      placeholder={locationInfo?.phoneCode ? `${locationInfo.phoneCode} 50 123 4567` : "+971 50 123 4567"}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.phoneNumber.message}
                      </p>
                    )}
                    {locationInfo?.detectedFromIP && (
                      <p className="text-xs text-green-600 mt-1">✓ Phone code auto-filled for {locationInfo.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6 flex items-center">
                  <div className="bg-green-600 p-2 rounded-lg mr-3">
                    <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  Job Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Job Title *
                    </label>
                    <select
                      {...register('jobTitle', { required: 'Job title is required' })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                    >
                      <option value="">Select your job title</option>
                      {jobTitles.map(title => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.jobTitle.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Custom Job Title - Show when Other is selected */}
                  {showCustomJobTitle && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Specify Your Job Title *
                      </label>
                      <input
                        type="text"
                        {...register('customJobTitle', { 
                          required: showCustomJobTitle ? 'Please specify your job title' : false
                        })}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                        placeholder="Enter your specific job title"
                      />
                      {errors.customJobTitle && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="text-red-500">⚠️</span>{errors.customJobTitle.message}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Job Profile Field */}
                  <div className={showCustomJobTitle ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Enter Your Job Profile
                    </label>
                    <textarea
                      {...register('jobProfile')}
                      rows={3}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      placeholder="Describe your job profile, key responsibilities, and expertise..."
                    />
                    <p className="text-xs text-gray-500 mt-1">💼 Help employers understand your specific role and skills</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      {...register('yearsExperience', { 
                        required: 'Experience is required',
                        min: { value: 0, message: 'Experience cannot be negative' },
                        max: { value: 50, message: 'Maximum experience is 50 years' },
                        valueAsNumber: true
                      })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      placeholder="5"
                    />
                    {errors.yearsExperience && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.yearsExperience.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Expected Monthly Salary ({locationInfo?.currencySymbol || 'AED'}) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        {locationInfo?.currencySymbol || 'AED'}
                      </span>
                      <input
                        type="number"
                        min="500"
                        max="50000"
                        step="100"
                        {...register('expectedSalary', { 
                          required: 'Expected salary is required',
                          min: { value: 500, message: `Minimum salary should be 500 ${locationInfo?.currency || 'AED'}` },
                          max: { value: 50000, message: `Maximum salary should be 50,000 ${locationInfo?.currency || 'AED'}` },
                          valueAsNumber: true
                        })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white"
                        placeholder="3000"
                      />
                    </div>
                    {errors.expectedSalary && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.expectedSalary.message}
                      </p>
                    )}
                    {locationInfo?.detectedFromIP && (
                      <p className="text-xs text-green-600 mt-1">✓ Currency auto-set for {locationInfo.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Visa Status *
                    </label>
                    <select
                      {...register('visaStatus', { required: 'Visa status is required' })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                    >
                      <option value="">Select visa status</option>
                      <option value="Work Visa">🟢 Work Visa</option>
                      <option value="Visit Visa">🔵 Visit Visa</option>
                      <option value="Freelance Visa">🟡 Freelance Visa</option>
                      <option value="Expired Visa">🔴 Expired Visa</option>
                      <option value="No Visa">❌ No Visa</option>
                    </select>
                    {errors.visaStatus && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.visaStatus.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  📍 Location
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Country *
                    </label>
                    <select
                      {...register('country', { required: 'Country is required' })}
                      onChange={handleCountryChange}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                    >
                      <option value="">Select country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.country.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      City *
                    </label>
                    <select
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white text-sm sm:text-base"
                      disabled={!selectedCountry}
                    >
                      <option value="">{selectedCountry ? 'Select city' : 'Select country first'}</option>
                      {selectedCountry && citiesByCountry[selectedCountry]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠️</span>{errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  🌐 Languages Spoken *
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {commonLanguages.map(language => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        selectedLanguages.includes(language)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white"
                    placeholder="Add another language"
                  />
                  <button
                    type="button"
                    onClick={addCustomLanguage}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
                
                {selectedLanguages.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected: {selectedLanguages.join(', ')}</p>
                  </div>
                )}
                {errors.languagesSpoken && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>{errors.languagesSpoken.message}
                  </p>
                )}
              </div>

              {/* About Me */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  📝 About Me
                </h2>
                <textarea
                  {...register('aboutMe', {
                    maxLength: { value: 500, message: 'About me must be less than 500 characters' }
                  })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white"
                  placeholder="Tell employers about your skills, experience, and what makes you a great hire..."
                />
                {errors.aboutMe && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>{errors.aboutMe.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Your Profile...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🚀 Create My Professional Profile
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  🔒 Your information is secure and will be verified before going live
                </p>
              </div>
            </div>
          </form>

          {/* Get Hired Promise Banner - Moved to bottom */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              🚀 Get Hired in 7 Working Days!
            </h2>
            <p className="text-green-100 text-base sm:text-lg mb-4">
              Our verified workers get contacted by employers within a week of profile creation
            </p>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm font-medium">✅ 94% of our workers receive their first job contact within 7 days</p>
            </div>
          </div>

          {/* Terms and Benefits */}
          <div className="mt-8 space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-center text-navy-900 mb-4">🌟 What You Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl mb-2">📧</div>
                  <p className="text-sm font-medium text-gray-700">Instant Login Credentials</p>
                  <p className="text-xs text-gray-500">Sent to your email</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">✨</div>
                  <p className="text-sm font-medium text-gray-700">Profile Verification</p>
                  <p className="text-xs text-gray-500">Verified badge</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-medium text-gray-700">Job Matching</p>
                  <p className="text-xs text-gray-500">AI-powered matching</p>
                </div>
              </div>
            </div>
            
            {/* Terms */}
            <div className="text-center text-sm text-gray-600">
              <p>
                By creating a profile, you agree to our{' '}
                <a href="/terms" className="text-primary-600 hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary-600 hover:underline font-medium">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
