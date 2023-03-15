import { Module } from '@nestjs/common';
import { AuthModule } from '@application/di/AuthModule';
import { ToDoModule } from '@application/di/ToDoModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
@Module({
  imports: [AuthModule, InfrastructureModule, ToDoModule],
})
export class RootModule {}
