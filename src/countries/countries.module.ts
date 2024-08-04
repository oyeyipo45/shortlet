import { Module } from '@nestjs/common';
import { CountriesController } from '@Countries/countries.controller';
import { CountriesService } from '@Countries/countries.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}

