import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { GetCountriesParams } from '@Countries/types/country-filter-params';
import { paginateData } from '@Common/paginate';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Country } from './types';

@Injectable()
export class CountriesService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountries(
    params: GetCountriesParams,
  ): Promise<APIResponse<PaginateDataInterface>> {
    const { page, limit } = params;

    // Check cache
    const cachedCountries = await this.cacheManager.get<Country[]>('countries');

    if (cachedCountries) {
      const paginatedData = paginateData(cachedCountries, page, limit);
      return this.createApiResponse(paginatedData);
    }

    // Fetch countries
    const { data, error } = await this.externalAPIService.getCountries(params);

    if (error) {
      throw new HttpException(
        'Unable to retrieve countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException(
        'No country data available',
        HttpStatus.NOT_FOUND,
      );
    }

    // Paginate data
    const paginatedData = paginateData(data, page, limit);
    await this.cacheManager.set('countries', data, 3600); // Cache for 1 hour

    return this.createApiResponse(paginatedData);
  }

  private createApiResponse(
    paginatedData: PaginateDataInterface,
  ): APIResponse<PaginateDataInterface> {
    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Countries retrieved successfully',
      data: paginatedData,
    };
  }
}
