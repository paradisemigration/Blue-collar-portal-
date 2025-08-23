'use client'

import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel Error</h2>
        <p className="text-gray-600 mb-6">
          The admin panel encountered an error while loading. This might be due to network issues or server problems.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Error Details:</h3>
          <p className="text-sm text-red-600 font-mono break-all">
            {error.message}
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reload Page
          </button>
          <a
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Back to Home
          </a>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Troubleshooting:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear browser cache and cookies</li>
            <li>• Check if the database is connected</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Admin page error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
