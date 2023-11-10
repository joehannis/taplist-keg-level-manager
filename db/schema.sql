DO $$
BEGIN
  CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'password';
  CREATE DATABASE "Taplist Integration" WITH OWNER = postgres;
  CREATE TABLE IF NOT EXISTS auth_info (
    id SERIAL PRIMARY KEY,
    venue VARCHAR(255) NOT NULL,
    auth_token VARCHAR(255) NOT NULL
  );
END $$;


```