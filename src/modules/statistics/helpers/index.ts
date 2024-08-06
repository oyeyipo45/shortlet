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

export const findLargestArea = (data: Country[]): string => {
  const largestCountry = data.reduce((largest, current) => {
    return current.area > largest.area ? current : largest;
  }, data[0]);

  return largestCountry.name.common;
};


export const findSmallestPopulation = (data: Country[]): string => {
  return data.reduce((smallest, current) =>
    current.population < smallest.population ? current : smallest,
  ).name.common;
}

// function findExtremes(data: Country[]) {
//   const initialValue = data[0];
//   const { largestArea, smallestPopulation } = data.reduce(
//     (acc, curr) => ({
//       largestArea: curr.area > acc.largestArea ? curr : acc.largestArea,
//       smallestPopulation:
//         curr.population < acc.smallestPopulation
//           ? curr
//           : acc.smallestPopulation,
//     }),
//     {
//       largestArea: initialValue,
//       smallestPopulation: initialValue,
//     },
//   );

//   return {
//     largestArea: largestArea.area,
//     smallestPopulation: smallestPopulation.population,
//   };
// }