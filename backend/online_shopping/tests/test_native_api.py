from fastapi.testclient import TestClient

from online_shopping.api.app import app


client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_native_regions() -> None:
    response = client.get("/regions")
    assert response.status_code == 200
    region = response.json()[0]
    assert region["region_id"] == "reg_cny"
    assert region["currency_code"] == "cny"
    assert region["countries"][0]["country_code"] == "cn"


def test_native_products() -> None:
    response = client.get("/products")
    assert response.status_code == 200
    product = response.json()[0]
    assert product["name"] == "Everyday Tote"
    assert product["available_item_count"] >= 0
    assert product["category"]["name"] == "Bags"


def test_native_cart_and_order_flow() -> None:
    add_response = client.post(
        "/cart/items",
        json={"product_name": "Everyday Tote", "quantity": 2},
    )
    assert add_response.status_code == 201
    cart = add_response.json()
    assert cart["total_quantity"] >= 2
    assert cart["subtotal"] > 0

    order_response = client.post("/orders", json={})
    assert order_response.status_code == 201
    order = order_response.json()
    assert order["order_number"].startswith("ORD-")
    assert order["items"]
