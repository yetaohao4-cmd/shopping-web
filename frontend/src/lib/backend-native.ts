import type {
  BackendItem,
  BackendProduct,
  BackendProductCategory,
  BackendValue,
} from "../types/backend"

export function unwrapBackendValue<T>(value: BackendValue<T>): T {
  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value
  ) {
    return value.value
  }
  return value
}

export function backendSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function formatBackendMoney(amount: number, currency = "CNY"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function backendCategoryName(category: BackendProductCategory): string {
  return unwrapBackendValue(category.name)
}

export function backendProductName(product: BackendProduct): string {
  return unwrapBackendValue(product.name)
}

export function backendProductSlug(product: BackendProduct): string {
  return backendSlug(backendProductName(product))
}

export function backendProductPrice(product: BackendProduct): number {
  return unwrapBackendValue(product.price)
}

export function backendProductAvailableCount(product: BackendProduct): number {
  return unwrapBackendValue(product.available_item_count)
}

export function backendLineTotal(item: BackendItem): number {
  return unwrapBackendValue(item.price) * unwrapBackendValue(item.quantity)
}
