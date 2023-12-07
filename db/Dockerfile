FROM postgres AS db
RUN mkdir -p /docker-entrypoint-initdb.d/
COPY ./schema.sql /docker-entrypoint-initdb.d/schema.sql
VOLUME pgdata:/var/lib/postgresql/data
