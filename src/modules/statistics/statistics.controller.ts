import { Controller, Get } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatisticsService } from '@Statistics/statistics.service';
import { APIResponseTypes } from '@Common/api-response';

@ApiTags('Statistics')
@Controller({ version: '1' })
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
  ) {}

  @ApiOperation({ summary: `Retrieve aggregated statistics such as the total number of
countries, the largest country by area, the smallest by population, and the
most widely spoken language` })
  @Get('/api/statistics')
  async getStatistics(): Promise<APIResponse<APIResponseTypes>> {
    return this.statisticsService.getStatistics();
  }
}
