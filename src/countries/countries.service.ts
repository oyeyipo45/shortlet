import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';
import { GetCountriesParams } from './types/country-filter-params';
import { paginateData } from '@Common/paginate';
import { PaginateDataInterface } from '@Common/types/types';

@Injectable()
export class CountriesService {
  constructor(private readonly externalAPIService: ExternalAPIService) {}

  async getCountries(
    params: GetCountriesParams,
  ): Promise<APIResponse<PaginateDataInterface>> {
    const { page, limit } = params;

    // Fetch data from exteral data service
    const { data: response, error } =
      await this.externalAPIService.getCountries(params);

    if (error) {
      throw new HttpException(
        'Unable to retrieve countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!response) {
      throw new HttpException(
        'No country data available',
        HttpStatus.NOT_FOUND,
      );
    }

    // Add pagination
    const paginatedData = paginateData(response, page, limit);

    const apiResponse: APIResponse<PaginateDataInterface> = {
      success: true,
      status: HttpStatus.OK,
      message: 'Countries retrieved successfully',
      data: paginatedData,
    };
    return apiResponse;
  }
}
