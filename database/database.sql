DROP DATABASE todolist;
CREATE DATABASE todolist;
use todolist;

CREATE TABLE todos (
  id CHAR(36) NOT NULL,
  title VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
  description TEXT COLLATE utf8_unicode_ci NOT NULL,
  startTime DATETIME,
  endTime DATETIME,
  status ENUM('to do', 'in progress', 'done'),
  priority ENUM('low', 'medium', 'high'),
  userId CHAR(36) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id CHAR(36) NOT NULL,
  username VARCHAR(155) NOT NULL,
  email VARCHAR(155) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE apiKeys (
  id CHAR(36) NOT NULL,
  keyValue VARCHAR(255) NOT NULL,
  version VARCHAR(50) NOT NULL,
  permissions ENUM('general', 'vip') NOT NULL,
  comments TEXT,
  status ENUM('active', 'inactive') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- add primary key to todos table
ALTER TABLE todos
ADD PRIMARY KEY (id);

-- add primary key to users table
ALTER TABLE users
ADD PRIMARY KEY (id);

-- add primary key to apiKeys table
ALTER TABLE apiKeys
ADD PRIMARY KEY (id);

-- add foreign key constraint to todos table
ALTER TABLE todos
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES users(id);






INSERT INTO apiKeys (id, keyValue, version, permissions, comments, status) 
VALUES (UUID(),'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj', '1.0.0', 'general', 'To be used by the high3ar.club vendor', 'active');






