import { Country } from '@/Modules/countries/types/country.type';
import { PaginateDataInterface } from '@Common/types/paginate-type';

export const paginateData = (
  data: Country[],
  page: number,
  limit: number,
): PaginateDataInterface => {
  // Coerce query type from string to number
  const pageNumber = Number(page) || 1;
  const perPageNumber = Number(limit) || 10;

  const start = (pageNumber - 1) * perPageNumber;
  const end = start + perPageNumber;
  const total = data.length;
  return {
    results: data.slice(start, end),
    total: total,
    pages: Math.ceil(total / perPageNumber),
    page: pageNumber,
    limit: perPageNumber,
  };
};
