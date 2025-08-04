'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple authentication - in production this would be more secure
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store auth state (in production use secure tokens)
      localStorage.setItem('adminAuth', 'true')
      router.push('/admin')
    } else {
      alert('Invalid credentials. Please try:\nUsername: admin\nPassword: admin123')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
            <LockClosedIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-navy-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the administrative dashboard
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3"
              >
                Sign in to Admin
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Admin Access:</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>Contact system administrator for login credentials.</p>
              <p>Admin access is restricted and requires proper authorization.</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
