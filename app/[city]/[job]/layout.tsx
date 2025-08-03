import { Metadata } from 'next'

function formatCityName(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function formatJobTitle(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

interface LayoutProps {
  params: {
    city: string
    job: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const cityName = formatCityName(params.city)
  const jobTitle = formatJobTitle(params.job)

  return {
    title: `Hire Verified ${jobTitle}s in ${cityName} | Go Get Hire`,
    description: `Find experienced ${jobTitle.toLowerCase()}s in ${cityName} with Go Get Hire. Browse verified profiles, check reviews, and hire skilled professionals for your business needs.`,
    keywords: `${jobTitle.toLowerCase()}, ${cityName.toLowerCase()}, hire, jobs, workers, gulf, go get hire`,
  }
}

export default function CityJobLayout({ children }: LayoutProps) {
  return <>{children}</>
}
