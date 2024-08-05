import { HttpStatus } from '@nestjs/common';
import { Country } from '@/modules/countries/types';
export interface APIResponse<T = undefined> {
  success: boolean;
  status: HttpStatus;
  message: string;
  data?: T;
  error?: T extends undefined ? unknown : never;
}

// export interface PaginateDataInterface<T> {
//   results: T[];
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// type CountryApiResponse = APIResponse<PaginateDataInterface<Country>>;
// type SingleCountryApiResponse = APIResponse<Country>;

// export type CountriesApiResponse =
//   | CountryApiResponse
//   | SingleCountryApiResponse;
