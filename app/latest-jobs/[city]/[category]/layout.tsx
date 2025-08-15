import { Metadata } from 'next'
import { getCityDisplayName, getCategoryDisplayName } from '../../../../utils/companiesData'

interface Props {
  params: {
    category: string
    city: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityDisplay = getCityDisplayName(params.city)
  const categoryDisplay = getCategoryDisplayName(params.category)
  
  const title = `Latest ${categoryDisplay} Jobs Opening in ${cityDisplay} | Apply online`
  const description = `Find the latest ${categoryDisplay.toLowerCase()} job openings in ${cityDisplay}. Apply online to top companies hiring now. Start your career today with verified employers.`
  
  return {
    title,
    description,
    keywords: `${categoryDisplay} jobs ${cityDisplay}, job openings ${cityDisplay}, ${categoryDisplay.toLowerCase()} careers, apply online jobs UAE, latest jobs ${cityDisplay}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Go Get Hires Now',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.gogethires.com/latest-jobs/${params.city}/${params.category}`
    }
  }
}

export default function JobListingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
