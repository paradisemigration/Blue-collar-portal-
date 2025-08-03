'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface MetaTag {
  name: string
  content: string
  property?: string
}

export default function DebugMetaTags() {
  const [isOpen, setIsOpen] = useState(false)
  const [metaTags, setMetaTags] = useState<MetaTag[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (isOpen) {
      // Get page title
      setTitle(document.title)

      // Get all meta tags
      const metaElements = document.querySelectorAll('meta')
      const tags: MetaTag[] = []

      metaElements.forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property') || ''
        const content = meta.getAttribute('content') || ''
        
        if (name && content) {
          tags.push({
            name,
            content,
            property: meta.getAttribute('property') || undefined
          })
        }
      })

      setMetaTags(tags.filter(tag => 
        tag.name.includes('description') || 
        tag.name.includes('keywords') || 
        tag.name.includes('title') ||
        tag.name.includes('og:') ||
        tag.name.includes('twitter:')
      ))
    }
  }, [isOpen])

  const keyboardShortcut = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcut)
    return () => document.removeEventListener('keydown', keyboardShortcut)
  }, [])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors"
        title="Debug Meta Tags (Ctrl+Shift+M)"
      >
        <InformationCircleIcon className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Page Meta Tags Debug</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Page Title */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Title</h3>
            <div className="bg-gray-50 p-3 rounded border">
              <p className="font-mono text-sm">{title}</p>
            </div>
          </div>

          {/* Meta Tags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Tags</h3>
            <div className="space-y-4">
              {metaTags.map((tag, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded border">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {tag.property ? 'property' : 'name'}: {tag.name}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-gray-700 break-words">
                    {tag.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current URL */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current URL</h3>
            <div className="bg-gray-50 p-3 rounded border">
              <p className="font-mono text-sm break-all">{window.location.href}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">How to use:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use keyboard shortcut: <kbd className="px-2 py-1 bg-blue-200 rounded text-xs">Ctrl+Shift+M</kbd></li>
              <li>• Click the info button in bottom-right corner</li>
              <li>• Navigate to different pages to check their meta tags</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
