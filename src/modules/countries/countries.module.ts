import { Module } from '@nestjs/common';
import { CountriesController } from '@/Modules/countries/countries.controller';
import { CountriesService } from '@/Modules/countries/countries.service';
import { ExternalAPIModule } from '@Modules/externalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
