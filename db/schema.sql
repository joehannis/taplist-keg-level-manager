ALTER ROLE postgres WITH PASSWORD 'postgres';

SELECT
  pg_terminate_backend(pid)
FROM
  pg_stat_activity
WHERE
  datname = 'taplist-keg-level-manager'
  AND
  leader_pid IS NULL;


CREATE DATABASE IF NOT EXISTS "taplist-keg-level-manager" WITH OWNER = postgres;
CREATE TABLE IF NOT EXISTS auth_info (
  id SERIAL PRIMARY KEY,
  venue VARCHAR(255) NOT NULL,
  auth_token VARCHAR(255) NOT NULL
);
