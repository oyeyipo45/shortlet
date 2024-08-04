import { CONSTANTS } from '@Common/constants';
import { Config } from '@Common/types/config.type';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { CacheModule } from '@nestjs/cache-manager';



@Module({
  imports: [
    CacheModule.register(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<Config, true>,
      ): Promise<HttpModuleOptions> => ({
        headers: {},
        baseURL: configService.get('EXTERNAL_COUNTRIES_SERVICES_URL'),
      }),
    }),
  ],
  providers: [ExternalAPIService],
  exports: [ExternalAPIService],
})
export class ExternalAPIModule {}
