import { Module } from '@nestjs/common';
import { CountriesController } from '@/countries/countries.controller';
import { CountriesService } from '@/countries/countries.service';
import { ExternalAPIModule } from '../modules/externalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
