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
    ('885bf6cc-2cf2-457d-a2a0-08b16c30c2de', '日本語のタイトル', 'こんにちは、元気ですか? 僕は元気です。', 'mahata'),
    ('17e6529d-2ae1-49c8-9c39-d2eb00ef39e1', 'title by mahata', 'kenshiro', 'mahata'),
    ('65c4bd90-2112-43a4-8227-27caedbc0a00', 'title by ymahata', 'raou', 'ymahata');
