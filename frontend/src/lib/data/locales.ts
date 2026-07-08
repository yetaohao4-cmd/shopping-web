"use server"

export type Locale = {
  code: string
  name: string
}

export const listLocales = async (): Promise<Locale[]> => [
  { code: "cn", name: "China" },
  { code: "us", name: "United States" },
]
