"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type {
  BackendAddress,
  BackendCart,
  BackendCartLineItem,
  BackendCollection,
  BackendCustomer,
  BackendOrder,
  BackendOrderLineItem,
  BackendPaymentSession,
  BackendPrice,
  BackendProduct,
  BackendProductCategory,
  BackendProductImage,
  BackendProductListParams,
  BackendProductOption,
  BackendProductVariant,
  BackendPromotion,
  BackendRecord,
  BackendRegion,
  BackendShippingOption,
} from "types/backend"

type SummaryProps = {
  cart: BackendCart & {
    promotions: BackendPromotion[]
  }
}

function getCheckoutStep(cart: BackendCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
