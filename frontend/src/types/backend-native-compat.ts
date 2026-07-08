export namespace BackendNativeHttpTypes {
  export type StoreCart = BackendNativeCart
  export type StoreCartAddress = BackendNativeRecord
  export type StoreCartLineItem = BackendNativeLineItem
  export type StoreCartShippingOption = BackendNativeShippingOption
  export type StoreCollection = BackendNativeCollection
  export type StoreCustomer = BackendNativeCustomer
  export type StoreCustomerAddress = BackendNativeRecord
  export type StoreOrder = BackendNativeOrder
  export type StoreOrderLineItem = BackendNativeLineItem
  export type StorePaymentSession = BackendNativeRecord
  export type StorePrice = BackendNativePrice
  export type StoreProduct = BackendNativeProduct
  export type StoreProductCategory = BackendNativeCategory
  export type StoreProductImage = BackendNativeRecord
  export type StoreProductListParams = Record<string, any>
  export type StoreProductOption = BackendNativeRecord
  export type StoreProductVariant = BackendNativeProductVariant
  export type StorePromotion = BackendNativeRecord
  export type StoreRegion = BackendNativeRegion
}

export type BackendNativeRecord = Record<string, any>

export type BackendNativeProductVariant = BackendNativeRecord & {
  options: BackendNativeRecord[]
}

export type BackendNativeProduct = BackendNativeRecord & {
  variants: BackendNativeProductVariant[]
  options: BackendNativeRecord[]
  tags: BackendNativeRecord[]
  images: BackendNativeRecord[]
}

export type BackendNativeCategory = BackendNativeRecord & {
  category_children: BackendNativeCategory[]
  parent_category?: BackendNativeCategory | null
  products: BackendNativeProduct[]
}

export type BackendNativeCollection = BackendNativeRecord & {
  products: BackendNativeProduct[]
}

export type BackendNativeLineItem = BackendNativeRecord & {
  product?: BackendNativeProduct
  variant?: BackendNativeProductVariant
  quantity: number
}

export type BackendNativeCart = BackendNativeRecord & {
  currency_code: string
  items: BackendNativeLineItem[]
  promotions: BackendNativeRecord[]
  shipping_methods: BackendNativeRecord[]
  payment_collection: BackendNativeRecord & {
    payment_sessions: BackendNativeRecord[]
  }
}

export type BackendNativeCustomer = BackendNativeRecord & {
  addresses: BackendNativeRecord[]
}

export type BackendNativeOrder = BackendNativeRecord & {
  currency_code: string
  items: BackendNativeLineItem[]
  shipping_methods: BackendNativeRecord[]
}

export type BackendNativePrice = BackendNativeRecord & {
  price_rules: BackendNativeRecord[]
}

export type BackendNativeShippingOption = BackendNativeRecord & {
  rules: BackendNativeRecord[]
}

export type BackendNativeRegion = BackendNativeRecord & {
  countries: BackendNativeRecord[]
}

export type StoreCart = BackendNativeCart
export type StoreCartShippingOption = BackendNativeShippingOption
export type StoreCustomer = BackendNativeCustomer
export type StorePrice = BackendNativePrice
