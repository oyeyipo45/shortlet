import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@Modules/externalAPI/externalAPI.service';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RegionInterface } from '@Modules/regions/types';
import { PaginateDataInterface } from '@Common/types';
import { paginateData } from '@Common/paginate';
import { calculateTotalPopulationByRegion } from '@Modules/regions/helpers';
import { Country } from '@Modules/countries/types';

@Injectable()
export class LanguageService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getLanguages(): Promise<APIResponse<RegionInterface[]>> {
    // Fetch languages
    const { data, error } = await this.externalAPIService.getLanguages();

    // Check cache
    // const cachedRegions = await this.cacheManager.get<RegionInterface[]>(
    //   'totalRegionsPopulations',
    // );

    // if (cachedRegions) {
    //   return {
    //     success: true,
    //     status: HttpStatus.OK,
    //     message: 'Regions retrieved successfully',
    //     data: cachedRegions,
    //   };
    // }

    if (error) {
      throw new HttpException(
        'Unable to retrieve languages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException('No language data available', HttpStatus.NOT_FOUND);
    }

    // const totalRegionsPopulations = calculateTotalPopulationByRegion(data);

    // // Cache regions
    // await this.cacheManager.set(
    //   'totalRegionsPopulations',
    //   totalRegionsPopulations,
    //   3600,
    // );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Languages retrieved successfully',
      data,
    };
  }

  async getLanguage(
    query: QueryFilterParams,
    language: string,
  ): Promise<APIResponse<PaginateDataInterface>> {
    const { page, limit } = query;

    // Check cache
    const cachedLanguage = await this.cacheManager.get<Country[]>(
      `language-${language}`,
    );

    // Use cached response
    if (cachedLanguage) {
      const paginatedData = paginateData(cachedLanguage, page, limit);
      return this.createApiResponse(paginatedData);
    }

    // Fetch language details
    const { data, error } = await this.externalAPIService.getLanguage(language);

    if (!data && !error) {
      throw new HttpException(
        `Language with name :${language} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!data || data.length === 0) {
      throw new HttpException('No language data available', HttpStatus.NOT_FOUND);
    }

    if (error) {
      throw new HttpException(
        'Unable to retrieve language',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Cache language data
    await this.cacheManager.set(`language-${language}`, data, 3600);

    // Paginate data
    const paginatedData = paginateData(data, page, limit);

    return this.createApiResponse(paginatedData);
  }

  private createApiResponse(
    response: PaginateDataInterface,
  ): APIResponse<PaginateDataInterface> {
    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Languages retrieved successfully',
      data: response,
    };
  }
}
