import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionInterface } from '@/modules/regions/types';
import { calculateTotalPopulationByRegion } from '@/modules/regions/helpers';

@Injectable()
export class RegionService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRegions(): Promise<APIResponse<RegionInterface[]>> {
    // Check cache
    const cachedRegions = await this.cacheManager.get<RegionInterface[]>(
      'totalRegionsPopulations',
    );

    // Send cached results
    if (cachedRegions) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Regions retrieved successfully',
        data: cachedRegions,
      };
    }

    // Fetch regions
    const { data, error } = await this.externalAPIService.getRegions();

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
