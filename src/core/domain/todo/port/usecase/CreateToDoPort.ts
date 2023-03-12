import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';

export interface CreateToDoPort {
  executorId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: ToDoStatus;
  priority: ToDoPriority;
}
