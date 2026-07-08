"use server"

import {
  getRegion as getBackendRegion,
  listRegions as listBackendRegions,
} from "../../api/backend"

export const listRegions = async (..._args: any[]): Promise<any[]> => {
  return listBackendRegions()
}

export const retrieveRegion = async (id: string): Promise<any | null> => {
  try {
    return await getBackendRegion(id)
  } catch {
    return null
  }
}

export const getRegion = async (countryCode: string): Promise<any | null> => {
  const regions = await listRegions()
  return (
    regions.find((region) =>
      region.countries.some((country: any) => country.country_code === countryCode)
    ) ?? null
  )
}
