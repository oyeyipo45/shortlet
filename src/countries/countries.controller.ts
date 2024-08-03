import { Controller, Get, Query, Version } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetCountriesParams } from '@Countries/types/country-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';

@ApiTags('Countries')
@Controller()
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @Version('1')
  @ApiOperation({ summary: 'Get countries' })
  @Get('countries')
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
  ): Promise<APIResponse<PaginateDataInterface>> {
    return this.CountriesService.getCountries(query);
  }
}

// TODO
// come back to this filters
// Add rate limiting