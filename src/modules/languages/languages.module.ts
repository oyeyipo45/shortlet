import { Module } from '@nestjs/common';
import { RegionController } from '@Modules/regions/region.controller';
import { RegionService } from '@Modules/regions/region.service';
import { ExternalAPIModule } from '@Modules/externalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [RegionController],
  providers: [RegionService],
})
export class LanguageModule {}
