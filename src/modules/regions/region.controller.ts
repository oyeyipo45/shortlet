import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionService } from '@Modules/regions/region.service';
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

  @ApiOperation({ summary: 'Get single region' })
  @Get('/api/regions/:region')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'current page',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of data per page',
    type: 'number',
  })
  @ApiParam({
    name: 'region',
    required: true,
    description: 'Region name',
    type: 'string',
  })
  async getRegion(
    @Query() query: QueryFilterParams,
    @Param('region') region: string,
  ): Promise<APIResponse<PaginateDataInterface>> {
    return this.RegionService.getRegion(query, region);
  }
}
