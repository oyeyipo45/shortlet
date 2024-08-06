import { Controller, Get} from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { RegionService } from '@/modules/regions/region.service';
import { RegionInterface } from '@/modules/regions/types';

@ApiTags('Regions')
@Controller({ version: '1' })
export class RegionsController {
  constructor(
    private readonly RegionService: RegionService,
  ) {}

  @ApiOperation({ summary: 'Get regions' })
  @Get('/api/regions')
  async getRegions(): Promise<APIResponse<RegionInterface[]>> {
    return this.RegionService.getRegions();
  }
}
