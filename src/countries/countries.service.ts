import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country } from '@Countries/types/country.type';
import { APIResponse } from '@Common/types/api-response.type';
import { ExternalAPIService } from '@ExternalAPI/externalAPI.service';

@Injectable()
export class CountriesService {
  constructor(private readonly externalAPIService: ExternalAPIService) {}

  async getCountries(): Promise<APIResponse<Country[]>> {
    const { data, error } = await this.externalAPIService.getCountries();

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

    const apiResponse: APIResponse<Country[]> = {
      success: true,
      status: HttpStatus.OK,
      message: 'Countries retrieved successfully',
      data,
    };
    return apiResponse;
  }
}
