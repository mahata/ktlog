CREATE TABLE users
(
    email VARCHAR(255) NOT NULL,
    uname VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (email)
);
