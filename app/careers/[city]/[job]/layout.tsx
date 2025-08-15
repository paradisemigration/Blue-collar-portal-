import { Metadata } from 'next'
import { getCityDisplayName, getJobDisplayName, getCityCountry } from '../../../../utils/companiesData'

interface Props {
  params: {
    job: string
    city: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityDisplay = getCityDisplayName(params.city)
  const jobDisplay = getJobDisplayName(params.job)
  const country = getCityCountry(cityDisplay)
  
  const title = `Latest ${jobDisplay} Jobs Opening in ${cityDisplay} | Apply online`
  const description = `Find the latest ${jobDisplay.toLowerCase()} job openings in ${cityDisplay}, ${country}. Apply online to top companies hiring now. Start your career today with verified employers.`
  
  return {
    title,
    description,
    keywords: `${jobDisplay} jobs ${cityDisplay}, job openings ${cityDisplay}, ${jobDisplay.toLowerCase()} careers, apply online jobs ${country}, latest jobs ${cityDisplay}`,
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
      canonical: `https://www.gogethires.com/careers/${params.city}/${params.job}`
    }
  }
}

export default function IndividualJobLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
