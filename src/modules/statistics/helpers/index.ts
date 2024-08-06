import { Country } from '@/Modules/countries/types';
import { StatisticsInterface } from '@Modules/statistics/types';

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