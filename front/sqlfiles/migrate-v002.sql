USE ynov_ci;

CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(255),
    birthDate DATE,
    city VARCHAR(40),
    postalCode VARCHAR(5)
);
