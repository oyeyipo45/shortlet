import { Controller, Get, Inject } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StatisticsService } from '@Statistics/statistics.service';
import { StatisticsInterface } from '@Statistics/types';

@ApiTags('Statistics')
@Controller({ version: '1' })
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get statistics' })
  @Get('/api/statistics')
  async getStatistics(): Promise<APIResponse<StatisticsInterface>> {
    return this.statisticsService.getStatistics();
  }
}
