from online_shopping.domain.value_objects.product_values import (
    CategoryDescription,
    CategoryId,
    CategoryName,
    CategorySlug,
)


class ProductCategory:
    def __init__(
        self,
        name: CategoryName,
        description: CategoryDescription,
        category_id: CategoryId | None = None,
        slug: CategorySlug | None = None,
    ) -> None:
        self.__category_id = category_id
        self.__name = name
        self.__description = description
        self.__slug = slug or CategorySlug.from_name(name)

    @property
    def category_id(self) -> CategoryId | None:
        return self.__category_id

    @property
    def name(self) -> CategoryName:
        return self.__name

    @property
    def description(self) -> CategoryDescription:
        return self.__description

    @property
    def slug(self) -> CategorySlug:
        return self.__slug
