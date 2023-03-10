-- create Tasks table
CREATE TABLE Tasks (
  id CHAR(36) NOT NULL,
  title VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
  task_description TEXT COLLATE utf8_unicode_ci NOT NULL,
  due_date DATE NOT NULL,
  finish_date DATE NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL,
);

-- create Users table
CREATE TABLE Users (
  id CHAR(36) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL,
);

-- create Task_Assignments table
CREATE TABLE Task_Assignments (
  id CHAR(36) NOT NULL,
  task_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  created_at TIMESTAMP NOT NULL,
);

CREATE TABLE Api_Keys (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    key_value VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    permissions ENUM('GENERAL', 'VIP') NOT NULL,
    comments TEXT,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



-- add primary key to Tasks table
ALTER TABLE Tasks
ADD PRIMARY KEY (id);

-- add primary key to Users table
ALTER TABLE Users
ADD PRIMARY KEY (id);

-- add foreign key constraint to Task_Assignments table
ALTER TABLE Task_Assignments
ADD CONSTRAINT fk_task_id
FOREIGN KEY (task_id)
REFERENCES Tasks(id);

-- add foreign key constraint to Task_Assignments table
ALTER TABLE Task_Assignments
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES Users(id);
