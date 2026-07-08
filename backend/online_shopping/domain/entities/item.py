from online_shopping.domain.entities.product import Product
from online_shopping.domain.value_objects.product_values import (
    Price,
    ProductVariantId,
    Quantity,
)
from online_shopping.domain.value_objects.store_values import CartItemId


class Item:
    def __init__(
        self,
        quantity: Quantity,
        price: Price,
        product: Product,
        item_id: CartItemId | None = None,
        product_variant_id: ProductVariantId | None = None,
    ) -> None:
        self.__item_id = item_id
        self.__quantity = quantity
        self.__price = price
        self.__product = product
        self.__product_variant_id = (
            product_variant_id or product.get_default_variant().variant_id
        )

    @property
    def item_id(self) -> CartItemId | None:
        return self.__item_id

    @property
    def quantity(self) -> Quantity:
        return self.__quantity

    @property
    def price(self) -> Price:
        return self.__price

    @property
    def product(self) -> Product:
        return self.__product

    @property
    def product_variant_id(self) -> ProductVariantId:
        return self.__product_variant_id

    @property
    def subtotal(self) -> float:
        return round(self.__price.value * self.__quantity.value, 2)

    def update_quantity(self, quantity: Quantity) -> bool:
        if not self.__product.is_available(quantity.value):
            return False
        self.__quantity = quantity
        return True
