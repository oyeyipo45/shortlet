import { Module } from '@nestjs/common';
import { CountriesController } from '@Countries/countries.controller';
import { CountriesService } from '@Countries/countries.service';

@Module({
  imports: [],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
