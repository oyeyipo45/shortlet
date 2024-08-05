import { Controller, Get, Inject, Param, Query, Version } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CountryFilter, GetCountriesParams } from '@Countries/types/country-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Country } from '@Countries/types/country.type';


@ApiTags('Countries')
@Controller({ version: '1' })
export class CountriesController {
  constructor(
    private readonly CountriesService: CountriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get countries' })
  @Get('/api/countries')
  // @ApiQuery({
  //   name: 'region',
  //   required: false,
  //   description: 'Filter by region',
  //   type: 'number',
  // })
  // @ApiQuery({
  //   name: 'population',
  //   required: false,
  //   description: 'filter by population size',
  //   type: 'number',
  // })
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
    @Query() query: GetCountriesParams,
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
    @Param() params: CountryFilter
  ): Promise<APIResponse<Country[]>> {
    return this.CountriesService.getCountry(params);
  }
}

// TODO
// come back to this filters
// Add rate limiting
// Make response type reuseable