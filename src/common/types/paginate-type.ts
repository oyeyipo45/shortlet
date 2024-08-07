import { Country } from '@Countries/types/country.type';

export interface PaginateDataInterface {
  results: Country[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
