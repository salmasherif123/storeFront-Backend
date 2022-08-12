CREATE TABLE Ordered_Products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES Users(user_id),
    product_id INTEGER REFERENCES Products(product_id)
);