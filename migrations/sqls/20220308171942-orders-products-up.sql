CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    quantity NOT NULL INTEGER,
    order_id NOT NULL BIGINT REFERENCES orders(id),
    product_id NOT NULL BIGINT REFERENCES product(id)
);