import { Country } from '@/modules/countries/types/country.type';

export interface PaginateDataInterface {
  results: Country[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
