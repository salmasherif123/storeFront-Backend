CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY ,
    user_id INTEGER REFERENCES Users(user_id) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
    );