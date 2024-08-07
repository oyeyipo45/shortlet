import { Controller, Get} from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { RegionService } from '@Regions/region.service';
import { APIResponseTypes } from '@Common/api-response';

@ApiTags('Regions')
@Controller({ version: '1' })
export class RegionsController {
  constructor(
    private readonly RegionService: RegionService,
  ) {}

  @ApiOperation({ summary: `Retrieve a list of regions and the countries within each
region, with additional aggregated data such as the total population of the
region` })
  @Get('/api/regions')
  async getRegions(): Promise<APIResponse<APIResponseTypes>> {
    return this.RegionService.getRegions();
  }
}
