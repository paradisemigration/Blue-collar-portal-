'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PhotoIcon, UserIcon } from '@heroicons/react/24/outline'
import { JobTitle, City, Country } from '../../types'

interface WorkerFormData {
  fullName: string
  profilePicture: string
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
}

const jobTitles: JobTitle[] = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
  'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy'
]

const cities: City[] = [
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
  'Doha', 'Al Rayyan', 'Al Wakrah', 'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina',
  'Muscat', 'Salalah', 'Sohar', 'Kuwait City', 'Hawalli', 'Manama', 'Riffa'
]

const countries: Country[] = ['UAE', 'Qatar', 'Saudi Arabia', 'Oman', 'Kuwait', 'Bahrain']

const commonLanguages = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog', 'Bengali', 'Tamil', 'Malayalam'
]

export default function CreateProfile() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [customLanguage, setCustomLanguage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<WorkerFormData>()

  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language))
    } else {
      setSelectedLanguages([...selectedLanguages, language])
    }
    setValue('languagesSpoken', selectedLanguages)
  }

  const addCustomLanguage = () => {
    if (customLanguage && !selectedLanguages.includes(customLanguage)) {
      setSelectedLanguages([...selectedLanguages, customLanguage])
      setCustomLanguage('')
      setValue('languagesSpoken', [...selectedLanguages, customLanguage])
    }
  }

  const onSubmit = async (data: WorkerFormData) => {
    setIsSubmitting(true)
    try {
      // Here you would normally send to your API
      console.log('Profile data:', { ...data, languagesSpoken: selectedLanguages })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Profile created successfully! You will be redirected to your profile page.')
    } catch (error) {
      alert('Error creating profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Create Your Worker Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands of skilled workers and get hired by top employers
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
                  {...register('fullName', { required: 'Full name is required' })}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  {...register('profilePicture')}
                  className="input-field"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
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
                  {...register('phoneNumber', { required: 'Phone number is required' })}
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
                    min: { value: 0, message: 'Experience cannot be negative' }
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
                  step="100"
                  {...register('expectedSalary', { 
                    required: 'Expected salary is required',
                    min: { value: 500, message: 'Minimum salary should be 500 AED' }
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
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
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
              Languages Spoken
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
            
            <div className="flex gap-2">
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
          </div>

          {/* About Me */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Me
            </label>
            <textarea
              {...register('aboutMe')}
              rows={4}
              className="input-field"
              placeholder="Tell employers about your skills, experience, and what makes you a great hire..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary text-lg px-8 py-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            By creating a profile, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
