import { Module } from '@nestjs/common';
import { RegionsController } from '@/modules/regions/region.controller';
import { RegionService } from '@/modules/regions/region.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [RegionsController],
  providers: [RegionService],
})
export class RegionModule {}
