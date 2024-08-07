import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GetLanguagesAndSpeakers, LanguageMap } from '@Languages/helpers';
import { APIResponseTypes, createApiResponse } from '@Common/api-response';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly externalAPIService: ExternalAPIService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getLanguages(): Promise<APIResponse<APIResponseTypes>> {
    // Check cache
    const cachedRegions = await this.cacheManager.get<LanguageMap>(
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

    // Fetch languages
    const { data, error } = await this.externalAPIService.getCountries();

    if (error) {
      throw new HttpException(
        'Unable to retrieve languages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException(
        'No language data available',
        HttpStatus.NOT_FOUND,
      );
    }

    // Aggregate languages and countries
    const languages = GetLanguagesAndSpeakers(data);

    // Cache regions
    await this.cacheManager.set('totalRegionsPopulations', languages, 3600);

    return createApiResponse(languages, 'Languages');
  }
}
