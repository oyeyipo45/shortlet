import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@Modules/externalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StatisticsInterface } from '@Modules/statistics/types';
import {
  findLargestArea,
  findSmallestPopulation,
} from '@Modules/statistics/helpers';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getStatistics(): Promise<APIResponse<StatisticsInterface>> {
    // Check cache
    const cachedStatistics =
      await this.cacheManager.get<StatisticsInterface>('statistics');

    if (cachedStatistics) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Statistics retrieved successfully',
        data: cachedStatistics,
      };
    } else {
      // Fetch statistics
      const { data, error } = await this.externalAPIService.getStatistics();

      if (error) {
        throw new HttpException(
          'Unable to retrieve statistics',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (!data) {
        throw new HttpException(
          'No statistics data available',
          HttpStatus.NOT_FOUND,
        );
      }

      const totalCountries = data?.length;
      const largestCountryArea = findLargestArea(data);
      const smallestPopulation = findSmallestPopulation(data);
      const mostWidelySpokenLanguage = null;

      const calculatedStatistics = {
        totalCountries,
        largestCountryArea,
        smallestPopulation,
        mostWidelySpokenLanguage,
      };

      // Cache statistics
      await this.cacheManager.set('statistics', calculatedStatistics, 3600);

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Statistics retrieved successfully',
        data: calculatedStatistics,
      };
    }
  }
}
