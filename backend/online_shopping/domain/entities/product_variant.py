from online_shopping.domain.value_objects.product_values import (
    CurrencyCode,
    Price,
    ProductCount,
    ProductVariantId,
    ProductVariantName,
    Sku,
)


class ProductVariant:
    def __init__(
        self,
        variant_id: ProductVariantId,
        name: ProductVariantName,
        sku: Sku,
        price: Price,
        inventory_count: ProductCount,
        currency_code: CurrencyCode = CurrencyCode("cny"),
        manages_inventory: bool = True,
        allows_backorder: bool = False,
    ) -> None:
        self.__variant_id = variant_id
        self.__name = name
        self.__sku = sku
        self.__price = price
        self.__inventory_count = inventory_count
        self.__currency_code = currency_code
        self.__manages_inventory = manages_inventory
        self.__allows_backorder = allows_backorder

    @property
    def variant_id(self) -> ProductVariantId:
        return self.__variant_id

    @property
    def name(self) -> ProductVariantName:
        return self.__name

    @property
    def sku(self) -> Sku:
        return self.__sku

    @property
    def price(self) -> Price:
        return self.__price

    @property
    def inventory_count(self) -> ProductCount:
        return self.__inventory_count

    @property
    def currency_code(self) -> CurrencyCode:
        return self.__currency_code

    @property
    def manages_inventory(self) -> bool:
        return self.__manages_inventory

    @property
    def allows_backorder(self) -> bool:
        return self.__allows_backorder

    def is_available(self, requested_quantity: int = 1) -> bool:
        if requested_quantity <= 0:
            return False
        if self.__allows_backorder or not self.__manages_inventory:
            return True
        return self.__inventory_count.value >= requested_quantity
