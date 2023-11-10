ALTER ROLE postgres WITH PASSWORD 'postgres';
CREATE DATABASE IF NOT EXISTS "taplist-keg-level-manager" WITH OWNER = postgres;
CREATE TABLE IF NOT EXISTS auth_info (
  id SERIAL PRIMARY KEY,
  venue VARCHAR(255) NOT NULL,
  auth_token VARCHAR(255) NOT NULL
);
