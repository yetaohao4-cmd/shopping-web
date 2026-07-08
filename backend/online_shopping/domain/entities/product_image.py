from online_shopping.domain.value_objects.product_values import (
    ProductImageId,
    ProductImageUrl,
)


class ProductImage:
    def __init__(
        self,
        image_id: ProductImageId,
        url: ProductImageUrl,
        rank: int = 0,
    ) -> None:
        if not isinstance(rank, int) or rank < 0:
            raise ValueError("Image rank cannot be negative.")
        self.__image_id = image_id
        self.__url = url
        self.__rank = rank

    @property
    def image_id(self) -> ProductImageId:
        return self.__image_id

    @property
    def url(self) -> ProductImageUrl:
        return self.__url

    @property
    def rank(self) -> int:
        return self.__rank
