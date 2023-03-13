import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
export type EditToDoEntityPayload = {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  status?: ToDoStatus;
  priority?: ToDoPriority;
};
