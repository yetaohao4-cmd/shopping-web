from online_shopping.domain.entities.payment import Payment
from online_shopping.domain.enums.payment_status import PaymentStatus
from online_shopping.domain.value_objects.payment_values import Amount, PaymentCurrencyCode


def test_payment_defaults_to_pending() -> None:
    assert Payment(1, 20.0, "CNY").status == PaymentStatus.PENDING


def test_payment_normalizes_amount_and_currency() -> None:
    payment = Payment(PaymentStatus.PENDING, 20.126, "CNY")

    assert payment.amount == Amount(20.13)
    assert payment.currency == PaymentCurrencyCode("cny")
    assert payment.process_payment() == PaymentStatus.COMPLETED
