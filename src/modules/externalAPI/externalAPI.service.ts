import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { API_PATH } from '@Modules/externalAPI/constants';
import { QueryResponse } from '@Common/types';
import { Country } from '@/Modules/countries/types/country.type';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { RegionInterface } from '@Modules/regions/types';
import { StatisticsInterface } from '@Modules/statistics/types';

@Injectable()
export class ExternalAPIService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(
    params: QueryFilterParams,
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

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getCountry(country: string): Promise<QueryResponse<Country[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<Country[]>(
        `/name/${country.toLowerCase()}`,
      );

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getRegions(): Promise<QueryResponse<RegionInterface[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<RegionInterface[]>(
        `/all?fields=region,population`,
      );

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getRegion(region: string): Promise<QueryResponse<Country[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<Country[]>(
        `/region/${region.toLowerCase()}`,
      );

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getStatistics(): Promise<QueryResponse<StatisticsInterface[]>> {
    try {
      const { data } =
        await this.httpService.axiosRef.get<StatisticsInterface[]>(`/region`);

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}
