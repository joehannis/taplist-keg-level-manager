ALTER ROLE postgres WITH PASSWORD 'postgres';
DROP DATABASE IF EXISTS "taplist-keg-level-manager";
CREATE DATABASE "taplist-keg-level-manager" WITH OWNER = postgres;
CREATE TABLE auth_info (
  id SERIAL PRIMARY KEY,
  venue VARCHAR(255) NOT NULL,
  auth_token VARCHAR(255) NOT NULL
);
