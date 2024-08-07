import { Country } from '@Countries/types';

export const filterByRegion = (data: Country[], targetRegion: string): Country[] => {
  return data.filter((country) => country.region === targetRegion);
};