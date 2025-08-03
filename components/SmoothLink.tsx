'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SmoothLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function SmoothLink({ href, children, className = "", onClick }: SmoothLinkProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (onClick) {
      onClick()
    }

    // Add a small delay for visual feedback
    setTimeout(() => {
      router.push(href)
      setIsLoading(false)
    }, 200)
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={`${className} ${isLoading ? 'opacity-70 pointer-events-none' : ''} transition-all duration-200`}
    >
      <span className="flex items-center gap-2">
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        )}
        {children}
      </span>
    </Link>
  )
}
