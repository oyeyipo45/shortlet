import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionInterface } from '@Modules/region/types';
import { PaginateDataInterface } from '@Common/types';
import { paginateData } from '@Common/paginate';
import { calculateTotalPopulationByRegion } from '@Modules/region/helpers';

@Injectable()
export class RegionService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRegions(): Promise<APIResponse<RegionInterface[]>> {
    // Fetch regions
    const { data, error } = await this.externalAPIService.getRegions();

    // Check cache
    const cachedRegions = await this.cacheManager.get<RegionInterface[]>(
      'totalRegionsPopulations',
    );

    if (cachedRegions) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Regions retrieved successfully',
        data: cachedRegions,
      };
    }

    if (error) {
      throw new HttpException(
        'Unable to retrieve regions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException('No region data available', HttpStatus.NOT_FOUND);
    }

    const totalRegionsPopulations = calculateTotalPopulationByRegion(data);

    // Cache regions
    await this.cacheManager.set(
      'totalRegionsPopulations',
      totalRegionsPopulations,
      3600,
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Regions retrieved successfully',
      data: totalRegionsPopulations,
    };
  }
}
