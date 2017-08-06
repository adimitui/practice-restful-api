DROP DATABASE IF EXISTS kittens;
CREATE DATABASE kittens;

\c kittens;

CREATE TABLE kits (
	ID SERIAL PRIMARY KEY,
	name VARCHAR,
	breed VARCHAR,
	age INTEGER,
	sex VARCHAR
);

INSERT INTO kits (name, breed, age, sex)
	VALUES ('Garfield', 'Tabby', 3, 'M');