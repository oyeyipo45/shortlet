import { Controller, Get } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';
import { APIResponse } from '@Common/types/api-response.type';
import { Country } from '@Countries/types/country.type';

@Controller()
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @Get('countries')
  async getCountries(): Promise<APIResponse<Country[]>> {
    return this.CountriesService.getCountries();
  }
}
