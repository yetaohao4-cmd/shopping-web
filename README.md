# Online Shopping System

Ecommerce workspace with a FastAPI backend and a Next.js storefront frontend.

## Project layout

- `backend/src/online_shopping/domain/entities`: business entities
- `backend/src/online_shopping/domain/value_objects`: validated value objects
- `backend/src/online_shopping/domain/enums`: status enums
- `backend/src/online_shopping/domain/interfaces`: domain contracts
- `backend/src/online_shopping/services`: application services
- `backend/src/online_shopping/api`: FastAPI app, schemas, routers, and in-memory API store
- `frontend`: Next.js storefront
- `docs/design`: PlantUML design documents

## Run backend

```powershell
cd backend
$env:PYTHONPATH = "src"
python main.py
```

The FastAPI app is exposed as `online_shopping.api.app:app` and defaults to port `8001`.

Backend URL:

```text
http://localhost:8001
```

Interactive API docs:

```text
http://localhost:8001/docs
```

## Run frontend

Create a local env file from the example:

```powershell
Copy-Item frontend\.env.local.example frontend\.env.local
```

Required local values:

```text
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=cn
```

Start the storefront:

```powershell
cd frontend
corepack yarn dev
```

Frontend URL:

```text
http://localhost:8000/cn
```

## Backend-Native API

The backend keeps the existing OOP/domain model under `backend/src/online_shopping/domain`.
The frontend uses backend-native field names and calls FastAPI routes directly.

Core routes include:

- `GET /regions`
- `GET /products`
- `GET /products/{product_name}`
- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/{product_name}`
- `DELETE /cart/items/{product_name}`
- `GET /orders`
- `POST /orders`
- `GET /orders/{order_number}`
- `POST /payments/process`
