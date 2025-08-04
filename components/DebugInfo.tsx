'use client'

import { useState } from 'react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface DebugInfoProps {
  data?: any
  label?: string
}

export default function DebugInfo({ data, label = 'Debug Info' }: DebugInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full shadow-lg z-40 transition-colors"
        title={label}
      >
        <InformationCircleIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{label}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
