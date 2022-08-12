CREATE TABLE Ordered_Products(
    ordered_product_id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL DEFAULT 1,
    user_id INTEGER REFERENCES Users(user_id),
    product_id INTEGER REFERENCES Products(product_id) NOT NULL
);