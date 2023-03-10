import { Module } from '@nestjs/common';
import { AuthModule } from './AuthModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
@Module({
  imports: [AuthModule, InfrastructureModule],
})
export class RootModule {}
