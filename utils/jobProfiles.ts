import { CITY_JOB_PROFILES, JobProfile } from './companiesData'

export function getJobProfilesForCity(city: string): JobProfile[] {
  return CITY_JOB_PROFILES[city] || []
}
