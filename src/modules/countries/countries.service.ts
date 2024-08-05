import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@Modules/externalAPI/externalAPI.service';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { paginateData } from '@Common/paginate';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Country } from '@/modules/countries/types';

@Injectable()
export class CountriesService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountries(
    params: QueryFilterParams,
  ): Promise<APIResponse<PaginateDataInterface | Country>> {
    const { page, limit } = params;

    // Check cache
    const cachedCountries = await this.cacheManager.get<Country[]>('countries');

    // Use cached response
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

    // Cache country data
    await this.cacheManager.set('countries', data, 3600);

    // Paginate data
    const paginatedData = paginateData(data, page, limit);

    return this.createApiResponse(paginatedData);
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
      message: 'Countries retrieved successfully',
      data,
    };
  }

  private createApiResponse(
    response: PaginateDataInterface | Country,
  ): APIResponse<PaginateDataInterface | Country> {
    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Countries retrieved successfully',
      data: response,
    };
  }
}
