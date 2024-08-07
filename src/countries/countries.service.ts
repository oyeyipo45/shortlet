import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { paginateData } from '@Common/paginate';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Country } from '@/countries/types';
import { getCachedData } from '@Common/get-cached-data';
import { APIResponseTypes, createApiResponse } from '@Common/api-response';

@Injectable()
export class CountriesService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountries(
    params: QueryFilterParams,
  ): Promise<APIResponse<APIResponseTypes>> {
    const { page, limit, region } = params;

    // Conditional cache check
    const cachedData = region
      ? await getCachedData<Country[]>(
          this.cacheManager,
          `filter-region-${region}`,
        )
      : await getCachedData<Country[]>(this.cacheManager, 'countries');

    // Return cached response
    if (cachedData) {
      const paginatedData = paginateData(cachedData, page, limit);
      return createApiResponse(paginatedData, 'Countries');
    }

    // Fetch countries
    const { data, error } = await this.externalAPIService.getCountries(region);

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

    // Conditional cache key
    const cacheKey = region ? `filter-region-${region}` : 'countries';
    //Cache data
    await this.cacheManager.set(cacheKey, data, 3600);

    // Paginate data
    const paginatedData = paginateData(data, page, limit);

    return createApiResponse(paginatedData, 'Countries');
  }

  async getCountry(country: string): Promise<APIResponse<Country[]>> {
    // Fetch country
    const { data, error } = await this.externalAPIService.getCountry(country);

    if (error) {
      throw new HttpException(
        'Unable to retrieve country',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException(
        'No country data available',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Country retrieved successfully',
      data,
    };
  }

  // private createApiResponse(
  //   response: PaginateDataInterface | Country,
  //   context: string,
  // ): APIResponse<PaginateDataInterface | Country> {
  //   return {
  //     success: true,
  //     status: HttpStatus.OK,
  //     message: `${context} retrieved successfully`,
  //     data: response,
  //   };
  // }
}
