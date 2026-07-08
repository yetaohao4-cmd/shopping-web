"use server"

import {
  addCartItem,
  deleteCartItem,
  getCart,
  placeOrder as placeBackendOrder,
  updateCartItem,
} from "../../api/backend"

type CartMutationInput = {
  productName?: string
  lineId?: string
  quantity?: number
}

export async function retrieveCart(): Promise<any | null> {
  return getCart().catch(() => null)
}

export async function getOrSetCart(..._args: any[]): Promise<any> {
  return getCart()
}

export async function updateCart(..._args: any[]) {
  return getCart()
}

export async function addToCart({
  productName,
  variantId,
  quantity,
}: {
  productName?: string
  variantId?: string
  quantity: number
  countryCode?: string
}) {
  const backendProductName = productName || variantId
  if (!backendProductName) {
    return null
  }

  return addCartItem({ product_name: backendProductName, quantity })
}

export async function updateLineItem({
  productName,
  lineId,
  quantity,
}: CartMutationInput) {
  const backendProductName = productName || lineId
  if (!backendProductName || typeof quantity !== "number") {
    return null
  }

  return updateCartItem(backendProductName, quantity)
}

export async function deleteLineItem(productNameOrLineId: string) {
  return deleteCartItem(productNameOrLineId)
}

export async function placeOrder(..._args: any[]) {
  const order = await placeBackendOrder()
  return { type: "order", order }
}

export async function setShippingMethod(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function initiatePaymentSession(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function applyPromotions(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function applyGiftCard(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function removeDiscount(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function removeGiftCard(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function submitPromotionForm(..._args: any[]) {
  return null
}
export async function setAddresses(..._args: any[]): Promise<string | null> {
  await getCart().catch(() => null)
  return null
}
export async function updateRegion(..._args: any[]) {
  return getCart().catch(() => null)
}
export async function listCartOptions(..._args: any[]) {
  return { shipping_options: [] }
}
