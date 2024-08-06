import { CountriesModule } from '@/countries/countries.module';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@Config/index';
import { HealthModule } from '@Health/health.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { Environment } from './common/types/env.enums';
import { configValidator } from '@Config/env.validation';
import { APP_FILTER } from '@nestjs/core';
import { RegionModule } from '@/modules/regions/region.module';
import { LanguageModule } from '@Languages/languages.module';
import { StatisticsModule } from '@Statistics/statistics.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'swagger-static'),
    //   serveRoot:
    //     configuration().nodeENV === Environment.PROD ? '/' : '/api-docs',
    // }),
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
    StatisticsModule,
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
