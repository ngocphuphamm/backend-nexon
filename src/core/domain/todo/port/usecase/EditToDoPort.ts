import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
export interface EditToDoPort {
  executorId: string;
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  status?: ToDoStatus;
  priority?: ToDoPriority;
  toDoId: string;
}
