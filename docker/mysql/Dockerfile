FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=123
ENV MYSQL_MAX_CONNECTIONS=1000

COPY docker-entrypoint.sh /docker-entrypoint-initdb.d/docker-entrypoint.sh

CMD ["mysqld"]
