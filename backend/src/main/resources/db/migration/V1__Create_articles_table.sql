CREATE TABLE articles
(
    id                     UUID NOT NULL DEFAULT gen_random_uuid(),
    title                  TEXT NOT NULL,
    content                TEXT NOT NULL,
    CONSTRAINT uuid_table_pkey PRIMARY KEY (id)
)
