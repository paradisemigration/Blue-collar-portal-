'use client'

import { useState } from 'react'
import { MapPinIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Country } from '../types'

interface LocationSelectorProps {
  onLocationSelect: (country: Country) => void
  currentCountry?: Country
}

const countryInfo: Record<Country, { flag: string; currency: string; phoneCode: string }> = {
  'UAE': { flag: '🇦🇪', currency: 'AED', phoneCode: '+971' },
  'Qatar': { flag: '🇶🇦', currency: 'QAR', phoneCode: '+974' },
  'Saudi Arabia': { flag: '🇸🇦', currency: 'SAR', phoneCode: '+966' },
  'Oman': { flag: '🇴🇲', currency: 'OMR', phoneCode: '+968' },
  'Kuwait': { flag: '🇰🇼', currency: 'KWD', phoneCode: '+965' },
  'Bahrain': { flag: '🇧🇭', currency: 'BHD', phoneCode: '+973' }
}

export default function LocationSelector({ onLocationSelect, currentCountry }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (country: Country) => {
    onLocationSelect(country)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
      >
        <MapPinIcon className="h-4 w-4 text-blue-600" />
        <span className="text-sm text-blue-700">
          {currentCountry ? `${countryInfo[currentCountry].flag} ${currentCountry}` : 'Select Location'}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                Select your country
              </div>
              {Object.entries(countryInfo).map(([country, info]) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => handleSelect(country as Country)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors ${
                    currentCountry === country ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{info.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{country}</div>
                      <div className="text-xs text-gray-500">
                        {info.phoneCode} • {info.currency}
                      </div>
                    </div>
                  </div>
                  {currentCountry === country && (
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
