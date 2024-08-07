import { CountriesModule } from '@/countries/countries.module';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@Config/index';
import { HealthModule } from '@Health/health.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { Environment } from './common/types/env.enums';
import { configValidator } from '@Config/env.validation';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RegionModule } from '@/modules/regions/region.module';
import { LanguageModule } from '@Languages/languages.module';
import { StatisticsModule } from '@Statistics/statistics.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerInterceptor } from '@Common/logger.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

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
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
