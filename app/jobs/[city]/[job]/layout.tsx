import { Metadata } from 'next'
import { 
  getCityDisplayName, 
  getJobDisplayName,
  getCityCountry,
  ALL_CITIES,
  INDIVIDUAL_JOBS_URL_MAP
} from '../../../../utils/companiesData'

interface Props {
  params: {
    city: string
    job: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityDisplay = getCityDisplayName(params.city)
  const jobDisplay = getJobDisplayName(params.job)
  const country = getCityCountry(cityDisplay)

  // Validate parameters
  const validCities = ALL_CITIES.map(city => city.toLowerCase().replace(/\s+/g, '-'))
  const validJobs = Object.values(INDIVIDUAL_JOBS_URL_MAP)
  
  if (!validCities.includes(params.city) || !validJobs.includes(params.job)) {
    return {
      title: 'Job Not Found',
      description: 'The requested job listing could not be found.'
    }
  }

  const title = `Latest ${jobDisplay} Jobs in ${cityDisplay}, ${country} - Apply Online`
  const description = `Find ${jobDisplay.toLowerCase()} job opportunities in ${cityDisplay}, ${country}. Apply to top companies hiring ${jobDisplay.toLowerCase()} with competitive salaries and benefits. Start your career today.`

  return {
    title,
    description,
    keywords: `${jobDisplay.toLowerCase()} jobs ${cityDisplay}, work in ${cityDisplay}, ${jobDisplay.toLowerCase()} ${country}, employment ${cityDisplay}, jobs in ${country}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.gogethires.com/jobs/${params.city}/${params.job}`
    }
  }
}

export default function JobLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
