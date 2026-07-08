"use server"

const standardShippingOption = {
  id: "backend_standard_shipping",
  name: "Standard Shipping",
  price_type: "flat",
  amount: 0,
  data: {},
}

export const listCartShippingMethods = async (..._args: any[]) => {
  return [standardShippingOption] as any[]
}

export const calculatePriceForShippingOption = async (..._args: any[]) => {
  return standardShippingOption as any
}
