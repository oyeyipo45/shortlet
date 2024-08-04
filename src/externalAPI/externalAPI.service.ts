import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { API_PATH } from '@ExternalAPI/constants';
import { QueryResponse } from '@Common/types';
import { Country } from '@Countries/types/country.type';
import { GetCountriesParams } from '@Countries/types/country-filter-params';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExternalAPIService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountries(
    params: GetCountriesParams,
  ): Promise<QueryResponse<Country[]>> {
    const filterParams = [];

    const { region, population, page, limit } = params;

    if (page) filterParams.push(`page=${page}`);
    if (limit) filterParams.push(`limit=${limit}`);
    if (region) filterParams.push(`region=${region}`);
    if (population) filterParams.push(`population=${population}`);
    const filter = `${
      filterParams.length > 0 ? `?${filterParams.join('&')}` : ''
    }`;

    try {
      const { data } = await this.httpService.axiosRef.get<Country[]>(
        `${API_PATH.ALL}/${filter}`,
      );

      const gg = await this.cacheManager.set('countries', data);

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}
