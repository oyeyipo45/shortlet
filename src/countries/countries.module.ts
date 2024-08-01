import { Module } from '@nestjs/common';
import { CountriesController } from '@Countries/countries.controller';
import { CountriesService } from '@Countries/countries.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';

@Module({
  imports: [ExternalAPIModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
