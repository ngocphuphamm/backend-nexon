import { Module } from '@nestjs/common';
import { AuthModule } from './AuthModule';
import { ToDoModule } from './ToDoModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
@Module({
  imports: [AuthModule, InfrastructureModule],
})
export class RootModule {}
