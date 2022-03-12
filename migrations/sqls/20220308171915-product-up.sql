CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name NOT NULL VARCHAR(100),
    price NOT NULL INTEGER ,
    category VARCHAR (100)
);