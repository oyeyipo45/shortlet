import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionInterface } from '@Regions/types';
import { calculateTotalPopulationByRegion } from '@Regions/helpers';
import { getCachedData } from '@Common/get-cached-data';
import { APIResponseTypes, createApiResponse } from '@Common/api-response';

@Injectable()
export class RegionService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRegions(): Promise<APIResponse<APIResponseTypes>> {
    // Check cache
    const cachedRegions = await getCachedData<RegionInterface[]>(
      this.cacheManager,
      'totalRegionsPopulations',
    );

    // Send cached results
    if (cachedRegions) {
      return createApiResponse(cachedRegions, 'Regions');
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
      3600000,
    );

    return createApiResponse(totalRegionsPopulations, 'Regions');
  }
}
