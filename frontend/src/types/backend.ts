export type ValueObject<T> = {
  value: T
}

export type BackendValue<T> = T | ValueObject<T>

export type BackendRecord = Record<string, any>

export type BackendAccountStatus =
  | "active"
  | "blocked"
  | "banned"
  | "compromised"
  | "archived"
  | "unknown"

export type BackendOrderStatus =
  | "unshipped"
  | "pending"
  | "shipped"
  | "complete"
  | "canceled"
  | "refund_applied"

export type BackendPaymentStatus =
  | "unpaid"
  | "pending"
  | "completed"
  | "failed"
  | "declined"
  | "canceled"
  | "abandoned"
  | "settling"
  | "settled"
  | "refunded"

export type BackendShipmentStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "on_hold"

export type BackendName = {
  first_name: string
  last_name: string
}

export type BackendPhone = {
  country_code: string
  number: string
}

export type BackendAddress = BackendRecord & {
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  company?: string
  country_code?: string
  province?: string
  phone?: string
}

export type BackendProductCategory = BackendRecord & {
  name: string
  description: string
  category_children?: BackendProductCategory[]
  parent_category?: BackendProductCategory | null
  products?: BackendProduct[]
}

export type BackendRegion = BackendRecord & {
  region_id: string
  name: string
  currency_code: string
  countries: Array<{
    country_code: string
    iso_2?: string
    display_name: string
  }>
}

export type BackendProductVariant = BackendRecord & {
  options?: BackendRecord[]
}

export type BackendProductOption = BackendRecord
export type BackendProductImage = BackendRecord
export type BackendProductListParams = Record<string, any>

export type BackendProduct = BackendRecord & {
  name: string
  description: string
  price: number
  available_item_count: number
  category: BackendProductCategory
  variants?: BackendProductVariant[]
  options?: BackendProductOption[]
  tags?: BackendRecord[]
  images?: BackendProductImage[]
}

export type BackendProductReview = {
  rating: number
  review: string
  product: BackendProduct
}

export type BackendItem = BackendRecord & {
  quantity: number
  price: number
  product: BackendProduct
}

export type BackendCartLineItem = BackendRecord & {
  quantity: number
  price?: number
  product?: BackendProduct
  variant?: BackendProductVariant
}

export type BackendOrderLineItem = BackendCartLineItem

export type BackendPromotion = BackendRecord
export type BackendPaymentSession = BackendRecord
export type BackendPrice = BackendRecord & {
  price_rules?: BackendRecord[]
}

export type BackendFreeShippingPrice = BackendPrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}
export type BackendShippingOption = BackendRecord & {
  rules?: BackendRecord[]
}
export type BackendCollection = BackendRecord & {
  products?: BackendProduct[]
}

export type BackendShoppingCart = BackendRecord & {
  items: BackendItem[]
  total_quantity?: number
  subtotal?: number
  currency_code: string
  promotions?: BackendPromotion[]
  shipping_methods?: BackendRecord[]
  payment_collection?: BackendRecord & {
    payment_sessions?: BackendPaymentSession[]
  }
}

export type BackendCart = BackendShoppingCart

export type BackendPayment = {
  status: BackendPaymentStatus
  amount?: BackendValue<number> | null
  currency?: string | null
}

export type BackendShipmentLog = {
  status: BackendShipmentStatus
  creation_date: BackendValue<string>
}

export type BackendShipment = {
  shipment_date: BackendValue<string>
  estimated_arrival: BackendValue<string>
  shipment_method: BackendValue<string>
  shipment_logs?: BackendShipmentLog[]
}

export type BackendOrderLog = {
  creation_date: string
  status: BackendOrderStatus
}

export type BackendOrder = BackendRecord & {
  order_number: string
  status: BackendOrderStatus
  order_date?: BackendValue<string> | null
  items: BackendItem[]
  order_logs?: BackendOrderLog[]
  shipments?: BackendShipment[]
  payment?: BackendPayment | null
  currency_code: string
  shipping_methods?: BackendRecord[]
}

export type BackendAccount = BackendRecord & {
  user_name: string
  status: BackendAccountStatus
  name: BackendName
  shipping_address: BackendAddress
  email: string
  phone: any
  addresses: BackendRecord[]
}

export type BackendCustomer = BackendAccount

export type BackendNotification = {
  notification_id: BackendValue<number>
  created_on: BackendValue<string>
  content: BackendValue<string>
}

export type BackendProductFormPayload = {
  name: string
  description: string
  price: number
  available_item_count: number
  category: {
    name: string
    description: string
  }
}

export type BackendAddressPayload = BackendAddress

export type BackendLoginPayload = {
  user_name: string
  password: string
}

export type BackendRegisterAccountPayload = BackendLoginPayload & {
  name: BackendName
  shipping_address: BackendAddress
  email: string
  phone: BackendPhone
}

export type BackendOrderPayload = {
  order_number?: string
  items?: Array<{
    product_name: string
    quantity: number
  }>
  payment?: BackendPayment
}
