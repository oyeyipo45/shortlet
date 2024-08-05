import { Country } from '@/Modules/countries/types';
import { StatisticsInterface } from '@Modules/statistics/types';

export const calculateTotalStastics = (
  data: Country[],
): StatisticsInterface => {
  const CountriesTotals = data.reduce(
    (acc, curr) => {
      const { name, population } = curr;
      acc['name'] = (acc['name'] || 0) + population;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalCountries = data.length;
  const largestCountryArea = '';
  const smallestPopulation = '';
  const mostWidelySpokenLanguage = '';

  return {
    totalCountries,
    largestCountryArea,
    smallestPopulation,
    mostWidelySpokenLanguage,
  };
};
