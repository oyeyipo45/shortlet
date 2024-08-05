import { Module } from '@nestjs/common';
import { RegionController } from '@/modules/region/region.controller';
import { RegionService } from '@/modules/region/region.service';
import { ExternalAPIModule } from '@ExternalAPI/externalAPI.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalAPIModule, CacheModule.register()],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
