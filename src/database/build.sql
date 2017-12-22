BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (name,email, password) VALUES (name, email, password)


DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    todo VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id)
  );

  INSERT INTO todos (todo, user_id) VALUES
  ('sleep', '2'),
  ('eat', '1');



COMMIT;
