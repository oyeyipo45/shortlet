import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StatisticsInterface } from '@Statistics/types';
import { aggregateStatistics } from '@Statistics/helpers';
import { Country } from '@Countries/types';
import { getCachedData } from '@Common/get-cached-data';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getStatistics(): Promise<APIResponse<StatisticsInterface>> {
    // Check cache
    const cachedStatistics = await getCachedData<StatisticsInterface>(
      this.cacheManager,
      'statistics',
    );

    if (cachedStatistics) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Statistics retrieved successfully',
        data: cachedStatistics,
      };
    }

    // Check cache for countries
    const cachedCountries = await getCachedData<Country[]>(
      this.cacheManager,
      'countries',
    );

    // Use cached response
    if (cachedCountries) {
      // Aggregate response
      const calculatedStatistics = aggregateStatistics(cachedCountries);

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Statistics retrieved successfully',
        data: calculatedStatistics,
      };
    }

    // Fetch statistics
    const { data, error } = await this.externalAPIService.getCountries();

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

    // Aggregate response
    const calculatedStatistics = aggregateStatistics(data);

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
