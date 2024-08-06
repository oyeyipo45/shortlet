import { CountriesModule } from '@/Modules/countries/countries.module';
import { ExternalAPIModule } from '@Modules/externalAPI/externalAPI.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@Config/index';
import { HealthModule } from '@Modules/health/health.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { Environment } from './common/types/env.enums';
import { configValidator } from '@Config/env.validation';
import { APP_FILTER } from '@nestjs/core';
import { RegionModule } from '@Modules/regions/region.module';
import { StatisticModule } from '@Modules/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [configuration],
      validate: configValidator,
      envFilePath:
        configuration().nodeENV === Environment.TEST ? '.env.local' : '.env',
    }),
    CountriesModule,
    ExternalAPIModule,
    HealthModule,
    RegionModule,
    StatisticModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
