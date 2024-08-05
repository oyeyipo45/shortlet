export interface QueryFilterParams {
  region?: string;
  population?: number;
  page: number;
  limit: number;
}

export interface Filter {
  filter: string;
}
