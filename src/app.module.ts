import { CountriesModule } from '@Countries/countries.module';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@Config/index';
import { configValidator } from '@Config/env.validation';
import { Environment } from '@Common/types/env.enum';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [configuration],
      validate: configValidator,
      envFilePath: configuration().nodeENV === Environment.TEST ? '.env.local' : '.env',
    }),
    CountriesModule,
    ExternalAPIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
