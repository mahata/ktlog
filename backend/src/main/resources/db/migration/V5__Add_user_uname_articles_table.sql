ALTER TABLE articles
    ADD COLUMN user_uname VARCHAR(255),
    ADD FOREIGN KEY (user_uname) REFERENCES users(uname);
