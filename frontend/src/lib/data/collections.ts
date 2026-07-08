"use server"

export const retrieveCollection = async (..._args: any[]): Promise<any | null> => null

export const listCollections = async (..._args: any[]): Promise<{
  collections: any[]
  count: number
}> => ({
  collections: [],
  count: 0,
})

export const getCollectionByHandle = async (..._args: any[]): Promise<any | null> => null
