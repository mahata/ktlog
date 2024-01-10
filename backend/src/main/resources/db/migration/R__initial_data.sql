--- users table

TRUNCATE TABLE users CASCADE;

INSERT INTO users (uname, email)
VALUES
    ('mahata', 'mahata777@gmail.com'),
    ('ymahata', 'mahata.yasunori.ma@alumni.tsukuba.ac.jp');

--- articles table

TRUNCATE TABLE articles CASCADE;

INSERT INTO articles (id, title, content, user_uname)
VALUES
    ('17e6529d-2ae1-49c8-9c39-d2eb00ef39e1', 'this is a blog title', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci aspernatur consectetur debitis dolore dolores ea enim eveniet impedit iste, maiores, natus, praesentium quas quis temporibus! Accusamus at beatae delectus eius, enim esse eveniet, excepturi libero optio quia sed voluptatem.', 'mahata'),
    ('65c4bd90-2112-43a4-8227-27caedbc0a00', 'this is yet another blog title', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci aspernatur consectetur debitis dolore dolores ea enim eveniet impedit iste, maiores, natus, praesentium quas quis temporibus! Accusamus at beatae delectus eius, enim esse eveniet, excepturi libero optio quia sed voluptatem.', 'ymahata');
