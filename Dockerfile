FROM postgres:15.2-alpine

LABEL author="Jesus G"
LABEL description="Postgres Image T3MantineClerkAuth"
LABEL version="1.0"

COPY *.sql /docker-entrypoint-initdb.d/
