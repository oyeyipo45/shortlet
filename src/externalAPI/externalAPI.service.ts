import { QueryResponse } from '@Common/types/query-response.type';
import { Country } from '@Countries/types/country.type';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { API_PATH } from '@ExternalAPI/constants';

@Injectable()
export class ExternalAPIService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<QueryResponse<Country[]>> {
    try {
      const { data } = await this.httpService.axiosRef.get<Country[]>(
        API_PATH.ALL,
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}
