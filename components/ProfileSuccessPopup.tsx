'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon, XMarkIcon, EnvelopeIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface ProfileSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  userName: string
}

export default function ProfileSuccessPopup({ isOpen, onClose, userEmail, userName }: ProfileSuccessPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for animation to complete
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className={`relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Close button */}
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Profile Created Successfully! 🎉
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Congratulations <strong>{userName}</strong>! Your worker profile has been created successfully.
                </p>
              </div>
            </div>
          </div>

          {/* Email notification section */}
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <EnvelopeIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Login Credentials Sent via Email
                </h4>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Your login ID and password have been sent to:
                  </p>
                  <p className="font-medium mt-1 break-all">
                    📧 {userEmail}
                  </p>
                  <p className="text-xs mt-2 text-blue-600">
                    Please check your inbox (and spam folder) for your login credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">
                  What's Next?
                </h4>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your email for login credentials</li>
                    <li>Use the credentials to sign in to your account</li>
                    <li>Complete your profile to attract more employers</li>
                    <li>Start browsing job opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto transition-colors"
              onClick={handleClose}
            >
              Continue to Dashboard
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
              onClick={() => window.open(`mailto:${userEmail}`, '_blank')}
            >
              Open Email App
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
