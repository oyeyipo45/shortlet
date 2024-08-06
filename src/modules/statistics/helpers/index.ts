import { Country } from '@/countries/types';
import { StatisticsInterface } from '@Statistics/types';

export const findLargestArea = (data: Country[]): string => {
  const largestCountry = data.reduce((largest, current) => {
    return current.area > largest.area ? current : largest;
  }, data[0]);

  return largestCountry?.name?.common;
};

export const findSmallestPopulation = (data: Country[]): string => {
  return data.reduce((smallest, current) =>
    current.population < smallest.population ? current : smallest,
  )?.name?.common;
};
export const aggregateStatistics = (data: Country[]): StatisticsInterface => {
  const totalCountries = data?.length;
  const largestCountryArea = findLargestArea(data);
  const smallestPopulation = findSmallestPopulation(data);
  const mostWidelySpokenLanguage = null;

  return {
    totalCountries,
    largestCountryArea,
    smallestPopulation,
    mostWidelySpokenLanguage,
  };
};
