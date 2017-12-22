BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (name,email, password) VALUES
('salam', 'salamco_93@gmail.com', '$2a$10$MxxZOpTkfH2owQ077V30YO6MeoyuDouM.7K.73Mu.23gCnP28p9SO'),
('shahy', 'shahy', '$2a$10$vHJ3E0NBwOm56SA1QiZnuuAFsFbfzvbrt4PXuzooZuO97xj8t5pPq');

DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL,
    description VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users,
    PRIMARY KEY (id, user_id)
);
-- 
-- INSERT INTO todos (description, user_id) VALUES
-- ('sleep', 1),
-- ('eat', 2);

COMMIT;
