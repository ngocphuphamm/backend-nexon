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
