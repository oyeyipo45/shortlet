import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { API_PATH } from '@ExternalAPI/constants';
import { QueryResponse } from '@Common/types';
import { Country } from '@Countries/types/country.type';
import { RegionInterface } from '@Regions/types';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { Languages } from '@Languages/types';

@Injectable()
export class ExternalAPIService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(region?: string): Promise<QueryResponse<Country[]>> {
    try {
      if (region) {
        const regionsResponse = await this.httpService.axiosRef.get<Country[]>(
          `region/${region.toLowerCase()}`,
        );
        return { data: regionsResponse.data, error: null };
      }

      const countriesResponse = await this.httpService.axiosRef.get<Country[]>(
        `${API_PATH.ALL}`,
      );

      return { data: countriesResponse.data, error: null };
    } catch (error) {
      console.log(error);

      this._coreExceptionLogger(error);
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
      this._coreExceptionLogger(error);
      return { data: null, error };
    }
  }

  async getRegions(): Promise<QueryResponse<RegionInterface[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<RegionInterface[]>(
        `/all?fields=region,population,name`,
      );

      return { data, error: null };
    } catch (error) {
      this._coreExceptionLogger(error);
      return { data: null, error };
    }
  }

  async getLanguagedAndSpeakers(): Promise<QueryResponse<Languages[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<Languages[]>(
        `all?fields=languages,name,population`,
      );

      return { data, error: null };
    } catch (error) {
      this._coreExceptionLogger(error);
      return { data: null, error };
    }
  }

  /**** EXTERNAL API LOGGER ****/
  private _coreExceptionLogger(error: unknown): void {
    Logger.error(
      (<Error | AxiosError>error).message,
      JSON.stringify({
        response: (<AxiosError>error)?.response?.data,
        verbose: <Error | AxiosError>error,
      }),
      'CoreException',
    );
  }
}
