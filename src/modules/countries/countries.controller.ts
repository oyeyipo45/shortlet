import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { Country } from '@Countries/types/country.type';
import { APIResponseTypes } from '@Common/api-response';

@ApiTags('Countries')
@Controller({ version: '1' })
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @ApiOperation({
    summary: 'Retrieve a paginated list of all the countries in the world',
  })
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
  ): Promise<APIResponse<APIResponseTypes>> {
    return this.CountriesService.getCountries(query);
  }

  @ApiOperation({
    summary: `Retrieve detailed information for a specific country, including its languages,
population, area, and bordering countries.`,
  })
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
