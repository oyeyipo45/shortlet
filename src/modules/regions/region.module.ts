import { Module } from '@nestjs/common';
import { RegionsController } from '@Regions/region.controller';
import { RegionService } from '@Regions/region.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [RegionsController],
  providers: [RegionService],
})
export class RegionModule {}
