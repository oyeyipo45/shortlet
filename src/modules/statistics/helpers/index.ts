import { Country } from '@/countries/types';

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
