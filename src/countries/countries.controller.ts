import { Controller, Get } from '@nestjs/common';
import { CountriesService } from '@Countries/countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @Get()
  getHello(): string {
    return this.CountriesService.getHello();
  }
}
