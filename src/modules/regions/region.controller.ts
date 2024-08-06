import { Controller, Get, Inject} from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionService } from '@/modules/regions/region.service';
import { RegionInterface } from '@/modules/regions/types';

@ApiTags('Regions')
@Controller({ version: '1' })
export class RegionController {
  constructor(
    private readonly RegionService: RegionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get regions' })
  @Get('/api/regions')
  async getRegions(): Promise<APIResponse<RegionInterface[]>> {
    return this.RegionService.getRegions();
  }
}
