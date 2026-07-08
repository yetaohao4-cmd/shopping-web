# Online Shopping System

Ecommerce workspace with a FastAPI backend and a Next.js storefront frontend.

## Project layout

- `backend/online_shopping/domain/entities`: business entities
- `backend/online_shopping/domain/value_objects`: validated value objects
- `backend/online_shopping/domain/enums`: status enums
- `backend/online_shopping/domain/interfaces`: domain contracts
- `backend/online_shopping/services`: application services
- `backend/online_shopping/api`: FastAPI app, schemas, routers, and in-memory API store
- `frontend`: Next.js storefront
- `docs/design`: PlantUML design documents

## Run locally

Use two terminals: one for FastAPI and one for Next.js.

### Backend

```powershell
cd backend
python -m pip install -r requirements.txt
$env:PYTHONPATH = "."
python main.py
```

The FastAPI app is exposed as `online_shopping.api.app:app` and runs on port `8001`.

API docs: `http://localhost:8001/docs`

### Frontend

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
corepack enable
corepack yarn install
corepack yarn dev
```

Storefront: `http://localhost:8000/cn`

## Run with Docker Compose

Start PostgreSQL first if you want the database container available:

```cmd
docker compose -f docker-compose.postgres.yml up -d
```

Start the FastAPI backend:

```cmd
docker compose -f docker-compose.backend.yml up -d
```

Start the Next.js frontend:

```cmd
docker compose -f docker-compose.frontend.yml up -d
```

Docker URLs:

- Frontend: `http://localhost:8000/cn`
- Backend docs: `http://localhost:8001/docs`
- PostgreSQL: `localhost:5432`

Stop containers:

```cmd
docker compose -f docker-compose.frontend.yml down
docker compose -f docker-compose.backend.yml down
docker compose -f docker-compose.postgres.yml down
```

## Backend-Native API

The backend keeps the existing OOP/domain model under `backend/online_shopping/domain`.
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
