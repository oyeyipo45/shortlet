import { Module } from '@nestjs/common';
import { StatisticsController } from '@Statistics/statistics.controller';
import { StatisticsService } from '@Statistics/statistics.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
