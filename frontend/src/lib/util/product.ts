import type { BackendNativeHttpTypes as HttpTypes } from "types/backend-native-compat";

export const isSimpleProduct = (product: HttpTypes.StoreProduct): boolean => {
    return product.options?.length === 1 && product.options[0].values?.length === 1;
}