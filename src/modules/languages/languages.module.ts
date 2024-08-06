import { Module } from '@nestjs/common';
import { LanguagesController } from '@Languages/languages.controller';
import { LanguagesService } from '@Languages/languages.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguageModule {}
