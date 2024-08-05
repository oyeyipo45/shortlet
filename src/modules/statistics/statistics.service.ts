import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@Modules/externalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StatisticsInterface } from '@Modules/statistics/types';
import { calculateTotalStastics } from '@Modules/statistics/helpers';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getStatistics(): Promise<APIResponse<StatisticsInterface>> {
    // Fetch statistics
    const { data, error } = await this.externalAPIService.getStatistics();

    // // Check cache
    // const cachedStatistics = await this.cacheManager.get<StatisticsInterface[]>(
    //   'totalRegionsPopulations',
    // );

    // if (cachedStatistics) {
    //   return {
    //     success: true,
    //     status: HttpStatus.OK,
    //     message: 'Regions retrieved successfully',
    //     data: cachedStatistics,
    //   };
    // }

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

    // const totalRegionsPopulations = calculateTotalStastics(data);

    // // Cache regions
    // await this.cacheManager.set(
    //   'totalRegionsPopulations',
    //   totalRegionsPopulations,
    //   3600,
    // );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Statistics retrieved successfully',
      data,
    };
  }
}
