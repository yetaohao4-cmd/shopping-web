from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP
import re


@dataclass(frozen=True)
class ProductId:
    value: int

    def __post_init__(self) -> None:
        if not isinstance(self.value, int) or self.value <= 0:
            raise ValueError("Product ID must be a positive integer.")


@dataclass(frozen=True)
class ProductName:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product name cannot be empty.")
        value = self.value.strip()
        if len(value) > 160:
            raise ValueError("Product name cannot exceed 160 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class ProductSlug:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product slug cannot be empty.")
        value = self.value.strip().lower()
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", value):
            raise ValueError("Product slug must contain lowercase letters, numbers, and hyphens.")
        object.__setattr__(self, "value", value)

    @classmethod
    def from_name(cls, name: ProductName) -> "ProductSlug":
        value = re.sub(r"[^a-z0-9]+", "-", name.value.lower()).strip("-")
        return cls(value or "product")


@dataclass(frozen=True)
class Price:
    value: float

    def __post_init__(self) -> None:
        if not isinstance(self.value, (int, float, Decimal)) or self.value <= 0:
            raise ValueError("Price must be greater than zero.")
        value = Decimal(str(self.value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        object.__setattr__(self, "value", float(value))

    @property
    def minor_units(self) -> int:
        return int((Decimal(str(self.value)) * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP))


@dataclass(frozen=True)
class CurrencyCode:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str):
            raise TypeError("Currency code must be a string.")
        value = self.value.strip().lower()
        if not re.fullmatch(r"[a-z]{3}", value):
            raise ValueError("Currency code must be a three-letter ISO code.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class ProductDescription:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str):
            raise TypeError("Description must be a string.")
        value = self.value.strip()
        if len(value) > 500:
            raise ValueError("Description cannot exceed 500 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class ProductCount:
    value: int

    def __post_init__(self) -> None:
        if not isinstance(self.value, int) or self.value < 0:
            raise ValueError("Product count cannot be negative.")


@dataclass(frozen=True)
class CategoryId:
    value: int

    def __post_init__(self) -> None:
        if not isinstance(self.value, int) or self.value <= 0:
            raise ValueError("Category ID must be a positive integer.")


@dataclass(frozen=True)
class CategoryName:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Category name cannot be empty.")
        value = self.value.strip()
        if len(value) > 120:
            raise ValueError("Category name cannot exceed 120 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class CategorySlug:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Category slug cannot be empty.")
        value = self.value.strip().lower()
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", value):
            raise ValueError("Category slug must contain lowercase letters, numbers, and hyphens.")
        object.__setattr__(self, "value", value)

    @classmethod
    def from_name(cls, name: CategoryName) -> "CategorySlug":
        value = re.sub(r"[^a-z0-9]+", "-", name.value.lower()).strip("-")
        return cls(value or "category")


@dataclass(frozen=True)
class CategoryDescription:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str):
            raise TypeError("Category description must be a string.")
        value = self.value.strip()
        if len(value) > 500:
            raise ValueError("Category description cannot exceed 500 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class Quantity:
    value: int

    def __post_init__(self) -> None:
        if not isinstance(self.value, int) or self.value <= 0:
            raise ValueError("Quantity must be a positive integer.")


@dataclass(frozen=True)
class ProductVariantId:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product variant ID cannot be empty.")
        object.__setattr__(self, "value", self.value.strip())


@dataclass(frozen=True)
class ProductVariantName:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product variant name cannot be empty.")
        object.__setattr__(self, "value", self.value.strip())


@dataclass(frozen=True)
class Sku:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("SKU cannot be empty.")
        value = self.value.strip()
        if len(value) > 64:
            raise ValueError("SKU cannot exceed 64 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class ProductImageId:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product image ID cannot be empty.")
        object.__setattr__(self, "value", self.value.strip())


@dataclass(frozen=True)
class ProductImageUrl:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Product image URL cannot be empty.")
        value = self.value.strip()
        if not (value.startswith("/") or value.startswith("http://") or value.startswith("https://")):
            raise ValueError("Product image URL must be absolute or root-relative.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class Rating:
    value: int

    def __post_init__(self) -> None:
        if not isinstance(self.value, int) or not 1 <= self.value <= 5:
            raise ValueError("Rating must be between 1 and 5.")


@dataclass(frozen=True)
class ReviewContent:
    value: str

    def __post_init__(self) -> None:
        if not isinstance(self.value, str) or not self.value.strip():
            raise ValueError("Review content cannot be empty.")
        value = self.value.strip()
        if len(value) > 1000:
            raise ValueError("Review content cannot exceed 1000 characters.")
        object.__setattr__(self, "value", value)


@dataclass(frozen=True)
class ProductNameMap:
    value: dict[str, list[object]]


@dataclass(frozen=True)
class ProductCategoryMap:
    value: dict[str, list[object]]
