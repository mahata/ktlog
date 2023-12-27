ALTER TABLE users
    DROP CONSTRAINT users_pkey,
    ADD CONSTRAINT email_unique UNIQUE (email),
    ADD PRIMARY KEY (uname);
