import type {
  BackendAccount,
  BackendLoginPayload,
  BackendOrder,
  BackendOrderPayload,
  BackendProduct,
  BackendProductCategory,
  BackendProductFormPayload,
  BackendRegion,
  BackendRegisterAccountPayload,
  BackendShoppingCart,
} from "../types/backend"

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8001"

async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${path}`)
  }

  return response.json() as Promise<T>
}

export async function listRegions(): Promise<BackendRegion[]> {
  return backendFetch<BackendRegion[]>("/regions")
}

export async function getRegion(regionId: string): Promise<BackendRegion> {
  return backendFetch<BackendRegion>(`/regions/${regionId}`)
}

export async function listProducts(): Promise<BackendProduct[]> {
  return backendFetch<BackendProduct[]>("/products")
}

export async function getProduct(productName: string): Promise<BackendProduct> {
  return backendFetch<BackendProduct>(
    `/products/${encodeURIComponent(productName)}`
  )
}

export async function createProduct(
  payload: BackendProductFormPayload
): Promise<BackendProduct> {
  return backendFetch<BackendProduct>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function listCategories(): Promise<BackendProductCategory[]> {
  return backendFetch<BackendProductCategory[]>("/products/categories")
}

export async function getCart(): Promise<BackendShoppingCart> {
  return backendFetch<BackendShoppingCart>("/cart")
}

export async function addCartItem(payload: {
  product_name: string
  quantity: number
}): Promise<BackendShoppingCart> {
  return backendFetch<BackendShoppingCart>("/cart/items", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function updateCartItem(
  productName: string,
  quantity: number
): Promise<BackendShoppingCart> {
  return backendFetch<BackendShoppingCart>(
    `/cart/items/${encodeURIComponent(productName)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }
  )
}

export async function deleteCartItem(
  productName: string
): Promise<BackendShoppingCart> {
  return backendFetch<BackendShoppingCart>(
    `/cart/items/${encodeURIComponent(productName)}`,
    { method: "DELETE" }
  )
}

export async function placeOrder(
  payload: BackendOrderPayload = {}
): Promise<BackendOrder> {
  return backendFetch<BackendOrder>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function listOrders(): Promise<BackendOrder[]> {
  return backendFetch<BackendOrder[]>("/orders")
}

export async function getOrder(orderNumber: string): Promise<BackendOrder> {
  return backendFetch<BackendOrder>(`/orders/${encodeURIComponent(orderNumber)}`)
}

export async function login(
  _payload: BackendLoginPayload
): Promise<BackendAccount> {
  throw new Error("Backend-native login endpoint is not implemented yet.")
}

export async function registerAccount(
  _payload: BackendRegisterAccountPayload
): Promise<BackendAccount> {
  throw new Error("Backend-native register endpoint is not implemented yet.")
}
