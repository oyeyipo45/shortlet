import { Module } from '@nestjs/common';
import { StatisticsController } from '@Modules/statistics/statistics.controller';
import { StatisticsService } from '@Modules/statistics/statistics.service';
import { ExternalAPIModule } from '@Modules/externalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class statisticModule {}
