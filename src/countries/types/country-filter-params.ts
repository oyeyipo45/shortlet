export interface GetCountriesParams {
  region?: string;
  population?: number;
  page: number;
  limit: number;
}

export interface CountryFilter {
  country: string;
}
