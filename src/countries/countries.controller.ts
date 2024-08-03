import { Controller, Get, Version } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { Country } from '@Countries/types/country.type';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller()
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @Version('1')
  @ApiOperation({ summary: 'Get countries' })
  @Get('countries')
  async getCountries(): Promise<APIResponse<Country[]>> {
    return this.CountriesService.getCountries();
  }
}
