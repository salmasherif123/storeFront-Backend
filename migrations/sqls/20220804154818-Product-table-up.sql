CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR (30) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(20));