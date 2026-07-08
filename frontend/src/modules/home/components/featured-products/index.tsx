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
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: BackendCollection[]
  region: BackendRegion
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} />
    </li>
  ))
}
