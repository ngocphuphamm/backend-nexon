import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
import { ToDoUser } from '@core/domain/todo/entity/ToDoUser';
export type CreateToDorEntityPayload = {
  id?:string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: ToDoStatus;
  priority: ToDoPriority;
  user: ToDoUser;
  createdAt?: Date;
  updatedAt?: Date;
};
