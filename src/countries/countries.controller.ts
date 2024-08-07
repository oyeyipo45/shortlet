import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CountriesService } from '@/countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Country } from '@/countries/types/country.type';

@ApiTags('Countries')
@Controller({ version: '1' })
export class CountriesController {
  constructor(
    private readonly CountriesService: CountriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get countries' })
  @Get('/api/countries')
  @ApiQuery({
    name: 'region',
    required: false,
    description: 'Region to filter by',
    type: 'string',
  })
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
  async getCountries(
    @Query() query: QueryFilterParams,
  ): Promise<APIResponse<PaginateDataInterface | Country>> {
    return this.CountriesService.getCountries(query);
  }

  @ApiOperation({ summary: 'Get single country' })
  @Get('/api/countries/:country')
  @ApiParam({
    name: 'country',
    required: true,
    description: 'Country name',
    type: 'string',
  })
  async getCountry(
    @Param('country') country: string,
  ): Promise<APIResponse<Country[]>> {
    return this.CountriesService.getCountry(country);
  }
}

// TODO
// Add rate limiting
// Make response type reuseable
// Move cache to check before call to external data service for data
// Add query examples
// add response examples
