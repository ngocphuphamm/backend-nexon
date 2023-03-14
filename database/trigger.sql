-- create trigger
DELIMITER //

CREATE TRIGGER validate_todos_info BEFORE INSERT ON todos
FOR EACH ROW
BEGIN
-- Check if the title and description are not empty
IF (NEW.title = '' OR NEW.description = '') THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Title and description cannot be empty';
END IF;

-- Check if the start time is before the end time
IF (NEW.start_time IS NOT NULL AND NEW.end_time IS NOT NULL AND NEW.start_time > NEW.end_time) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Start time cannot be after end time';
END IF;

-- Check if the status and priority are valid
IF (NEW.status NOT IN ('to do', 'in progress', 'done') OR NEW.priority NOT IN ('low', 'medium', 'high')) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Invalid status or priority value';
END IF;
END//

DELIMITER ;
