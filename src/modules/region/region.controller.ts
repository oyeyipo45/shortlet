import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionService } from '@Modules/region/region.service';
import { RegionInterface } from './types';

@ApiTags('Regions')
@Controller({ version: '1' })
export class RegionController {
  constructor(
    private readonly RegionService: RegionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get regions' })
  @Get('/api/regions')
  @ApiQuery({
    name: 'regions',
    required: false,
    description: 'Name of region',
    type: 'string',
  })
  async getRegions(): Promise<APIResponse<RegionInterface[]>> {
    return this.RegionService.getRegions();
  }
}
