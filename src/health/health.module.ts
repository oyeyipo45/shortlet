import { HealthController } from '@Health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule],
  controllers: [HealthController],
})
export class HealthModule {}
