"use server"

import { listCategories as listBackendCategories } from "../../api/backend"
import { backendSlug, unwrapBackendValue } from "@lib/backend-native"

export const listCategories = async (..._args: any[]) => {
  const product_categories = await listBackendCategories()
  return { product_categories, count: product_categories.length }
}

export const listCategoriesQuery = listCategories
export const getCategoryByHandle = async (categoryPath: string[] | string): Promise<any | null> => {
  const handle = Array.isArray(categoryPath)
    ? categoryPath[categoryPath.length - 1]
    : categoryPath
  const { product_categories } = await listCategories()

  return (
    product_categories.find(
      (category: any) => backendSlug(unwrapBackendValue(category.name)) === handle
    ) ?? null
  )
}
export const getCategoriesList = listCategories
