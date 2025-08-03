'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PhotoIcon, UserIcon, CloudArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline'
import { JobTitle, City, Country } from '../../types'

interface WorkerFormData {
  fullName: string
  profilePicture: File | string | null
  jobTitle: JobTitle
  yearsExperience: number
  city: City
  country: Country
  languagesSpoken: string[]
  expectedSalary: number
  visaStatus: 'Available' | 'Not Available'
  aboutMe: string
  phoneNumber: string
  email: string
  availability: boolean
}

const jobTitles: JobTitle[] = [
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
  'Loading Worker', 'Moving Helper', 'Cleaning Supervisor', 'Maintenance Supervisor'
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
  'English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog', 'Bengali', 'Tamil', 'Malayalam', 'French', 'Spanish'
]

export default function EditProfile() {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [customLanguage, setCustomLanguage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<Country | ''>('')
  const [loading, setLoading] = useState(true)
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, setError, clearErrors, reset } = useForm<WorkerFormData>()

  useEffect(() => {
    // Load existing profile data
    const profileData = localStorage.getItem('userProfile')
    if (profileData) {
      const profile = JSON.parse(profileData)
      reset({
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        jobTitle: profile.jobTitle,
        yearsExperience: profile.yearsExperience,
        expectedSalary: profile.expectedSalary,
        visaStatus: profile.visaStatus,
        country: profile.country,
        city: profile.city,
        aboutMe: profile.aboutMe,
        availability: profile.availability
      })
      setSelectedLanguages(profile.languagesSpoken || [])
      setSelectedCountry(profile.country)
      setImagePreview(profile.profilePicture)
    }
    setLoading(false)
  }, [reset])

  const handleLanguageToggle = (language: string) => {
    let newLanguages: string[]
    if (selectedLanguages.includes(language)) {
      newLanguages = selectedLanguages.filter(l => l !== language)
    } else {
      newLanguages = [...selectedLanguages, language]
    }
    setSelectedLanguages(newLanguages)
    setValue('languagesSpoken', newLanguages)
    
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
      
      if (newLanguages.length > 0) {
        clearErrors('languagesSpoken')
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('profilePicture', { message: 'Please select a valid image file' })
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('profilePicture', { message: 'Image size must be less than 5MB' })
        return
      }
      
      setProfileImage(file)
      setValue('profilePicture', file)
      clearErrors('profilePicture')
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value as Country
    setSelectedCountry(country)
    setValue('country', country)
    setValue('city', '' as City)
    clearErrors('country')
  }

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
    if (selectedLanguages.length === 0) {
      setError('languagesSpoken', { message: 'Please select at least one language' })
      return
    }

    setIsSubmitting(true)
    try {
      // Update profile data
      const updatedProfile = {
        ...data,
        languagesSpoken: selectedLanguages,
        profilePicture: imagePreview,
        id: Date.now().toString(),
        updatedAt: new Date()
      }
      
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      router.push('/dashboard')
    } catch (error) {
      alert('Error updating profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Edit Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Update your information to attract more employers
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { 
                    required: 'Full name is required',
                    validate: validateFullName
                  })}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Profile Picture Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
                      <PhotoIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image"
                    />
                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <CloudArrowUpIcon className="h-4 w-4" />
                      Change Photo
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG up to 5MB. Professional photo recommended.
                    </p>
                  </div>
                </div>
                {errors.profilePicture && (
                  <p className="text-red-500 text-sm mt-1">{errors.profilePicture.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    validate: validateEmail
                  })}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber', { 
                    required: 'Phone number is required',
                    validate: validatePhoneNumber
                  })}
                  className="input-field"
                  placeholder="+971 50 123 4567"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">
              Job Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <select
                  {...register('jobTitle', { required: 'Job title is required' })}
                  className="input-field"
                >
                  <option value="">Select a job title</option>
                  {jobTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
                {errors.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="input-field"
                  placeholder="5"
                />
                {errors.yearsExperience && (
                  <p className="text-red-500 text-sm mt-1">{errors.yearsExperience.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly Salary (AED) *
                </label>
                <input
                  type="number"
                  min="500"
                  max="50000"
                  step="100"
                  {...register('expectedSalary', { 
                    required: 'Expected salary is required',
                    min: { value: 500, message: 'Minimum salary should be 500 AED' },
                    max: { value: 50000, message: 'Maximum salary should be 50,000 AED' },
                    valueAsNumber: true
                  })}
                  className="input-field"
                  placeholder="3000"
                />
                {errors.expectedSalary && (
                  <p className="text-red-500 text-sm mt-1">{errors.expectedSalary.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visa Status *
                </label>
                <select
                  {...register('visaStatus', { required: 'Visa status is required' })}
                  className="input-field"
                >
                  <option value="">Select visa status</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                {errors.visaStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.visaStatus.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Status
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('availability')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">I am currently available for work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">
              Location
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  onChange={handleCountryChange}
                  className="input-field"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  {...register('city', { required: 'City is required' })}
                  className="input-field"
                  disabled={!selectedCountry}
                >
                  <option value="">{selectedCountry ? 'Select city' : 'Select country first'}</option>
                  {selectedCountry && citiesByCountry[selectedCountry]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">
              Languages Spoken *
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
                className="input-field flex-1"
                placeholder="Add another language"
              />
              <button
                type="button"
                onClick={addCustomLanguage}
                className="btn-secondary"
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
              <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken.message}</p>
            )}
          </div>

          {/* About Me */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Me
            </label>
            <textarea
              {...register('aboutMe', {
                maxLength: { value: 500, message: 'About me must be less than 500 characters' }
              })}
              rows={4}
              className="input-field"
              placeholder="Tell employers about your skills, experience, and what makes you a great hire..."
            />
            {errors.aboutMe && (
              <p className="text-red-500 text-sm mt-1">{errors.aboutMe.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary text-lg px-8 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary text-lg px-8 py-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
