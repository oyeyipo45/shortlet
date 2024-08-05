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
import { LanguageModule } from '@Modules/languages/languages.module';

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
    LanguageModule,
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
