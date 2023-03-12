import { Module } from '@nestjs/common';
import { AuthModule } from './AuthModule';
import { ToDoModule } from './ToDoModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
@Module({
  imports: [AuthModule, InfrastructureModule,ToDoModule],
})
export class RootModule {}
