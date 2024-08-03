import { CountriesModule } from '@Countries/countries.module';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@Config/index';
import { HealthModule } from '@Health/health.module';
import { Environment } from '@/Common';
import { configValidator } from '@Config/env.validation';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@Common/http-exception.filter';
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
