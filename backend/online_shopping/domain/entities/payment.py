from online_shopping.domain.enums.payment_status import PaymentStatus
from online_shopping.domain.value_objects.payment_values import (
    Amount,
    PaymentCurrencyCode,
)


class Payment:
    def __init__(
        self,
        status: PaymentStatus | int = PaymentStatus.PENDING,
        amount: Amount | float | None = None,
        currency: PaymentCurrencyCode | str | None = None,
    ) -> None:
        if not isinstance(status, PaymentStatus):
            status = PaymentStatus.PENDING
        if isinstance(amount, (int, float)):
            amount = Amount(amount)
        if isinstance(currency, str):
            currency = PaymentCurrencyCode(currency)
        self.__status = status
        self.__amount = amount
        self.__currency = currency

    @property
    def amount(self) -> Amount | None:
        return self.__amount

    @property
    def currency(self) -> PaymentCurrencyCode | None:
        return self.__currency

    @property
    def status(self) -> PaymentStatus:
        return self.__status

    def process_payment(self) -> PaymentStatus:
        self.__status = PaymentStatus.COMPLETED
        return self.__status
