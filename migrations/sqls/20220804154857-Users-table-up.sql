CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY ,
     firstName VARCHAR(10) NOT NULL UNIQUE,
     lastName VARCHAR(10) NOT NULL,
     password VARCHAR NOT NULL UNIQUE
     );