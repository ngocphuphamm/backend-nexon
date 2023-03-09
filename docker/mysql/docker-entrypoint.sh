#!/usr/bin/env bash

set -e

mysqld --user="$MYSQL_USER" --password="$MYSQL_PASSWORD" --database="$MYSQL_DATABASE" <<-EOSQL
    CREATE TABLE IF NOT EXISTS `mytable` (
        `id` CHAR(36) NOT NULL DEFAULT UUID(),
        `name` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
EOSQL
