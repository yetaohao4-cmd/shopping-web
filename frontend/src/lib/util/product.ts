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

export const isSimpleProduct = (product: BackendProduct): boolean => {
    return product.options?.length === 1 && product.options[0].values?.length === 1;
}