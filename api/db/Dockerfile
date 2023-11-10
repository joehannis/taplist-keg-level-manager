FROM postgres AS db
RUN mkdir -p /docker-entrypoint-initdb.d/
COPY ./db/schema.sql /docker-entrypoint-initdb.d/schema.sql
