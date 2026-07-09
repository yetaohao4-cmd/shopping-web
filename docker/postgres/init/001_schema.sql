CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 用户账号表（核心表）
CREATE TABLE IF NOT EXISTS accounts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name       VARCHAR(20)  NOT NULL UNIQUE,
    password_hash   TEXT         NOT NULL,                -- bcrypt/pbkdf2 hash
    status          VARCHAR(32)  NOT NULL DEFAULT 'active', -- active|blocked|banned|compromised|archived|unknown
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone_country_code VARCHAR(16),
    phone_number       VARCHAR(64),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_accounts_email  ON accounts(email);

-- 收货地址表
CREATE TABLE IF NOT EXISTS addresses (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id           UUID         NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    street               VARCHAR(255) NOT NULL,
    city                 VARCHAR(120) NOT NULL,
    state                VARCHAR(120) NOT NULL,
    postal_code          VARCHAR(32)  NOT NULL,
    country              VARCHAR(120) NOT NULL,
    is_default_shipping  BOOLEAN      NOT NULL DEFAULT false,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_addresses_account ON addresses(account_id);

-- 商品分类表
CREATE TABLE IF NOT EXISTS product_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(120) NOT NULL UNIQUE,
    description TEXT         NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- 商品表（核心：product_hash 是商品与 MinIO 图片的唯一绑定标识）
CREATE TABLE IF NOT EXISTS products (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_hash         CHAR(64)      NOT NULL UNIQUE,   -- SHA-256，商品与图片的一一对应标识
    category_id          UUID          REFERENCES product_categories(id) ON DELETE SET NULL,
    name                 VARCHAR(160)  NOT NULL UNIQUE,
    slug                 VARCHAR(200)  NOT NULL UNIQUE,
    description          TEXT          NOT NULL DEFAULT '',
    price                NUMERIC(12,2) NOT NULL CHECK (price > 0),
    available_item_count INTEGER       NOT NULL DEFAULT 0 CHECK (available_item_count >= 0),
    metadata_json        JSONB         DEFAULT '{}'::jsonb,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug     ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_hash     ON products(product_hash);

-- 商品图片引用表（实际图片存储在 MinIO，通过 product_hash 定位）
CREATE TABLE IF NOT EXISTS product_images (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID         NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url  VARCHAR(512) NOT NULL,              -- MinIO 对象路径，基于 product_hash
    rank       INTEGER      NOT NULL DEFAULT 0,   -- 展示排序
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_images_product ON product_images(product_id);

-- 商品变体表 (SKU)
CREATE TABLE IF NOT EXISTS product_variants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID         NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id_str  VARCHAR(100) NOT NULL UNIQUE,
    name            VARCHAR(160) NOT NULL,
    sku             VARCHAR(64)  NOT NULL UNIQUE,
    price           NUMERIC(12,2) NOT NULL CHECK (price > 0),
    inventory_count INTEGER      NOT NULL DEFAULT 0 CHECK (inventory_count >= 0),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id   UUID         REFERENCES accounts(id) ON DELETE SET NULL,
    order_number VARCHAR(64)  NOT NULL UNIQUE,
    status       VARCHAR(32)  NOT NULL DEFAULT 'pending',
    order_date   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_account ON orders(account_id);
CREATE INDEX IF NOT EXISTS idx_orders_number  ON orders(order_number);

-- 订单明细表
CREATE TABLE IF NOT EXISTS order_items (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     UUID         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id   UUID         REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(160) NOT NULL,
    quantity     INTEGER      NOT NULL CHECK (quantity > 0),
    price        NUMERIC(12,2) NOT NULL CHECK (price > 0),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- 支付表
CREATE TABLE IF NOT EXISTS payments (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id   UUID         REFERENCES orders(id) ON DELETE SET NULL,
    status     VARCHAR(32)  NOT NULL DEFAULT 'pending',
    amount     NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    currency   CHAR(3)      NOT NULL DEFAULT 'CNY',
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);