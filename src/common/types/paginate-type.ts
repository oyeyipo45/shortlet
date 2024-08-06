import { Country } from '@/countries/types/country.type';

export interface PaginateDataInterface {
  results: Country[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
