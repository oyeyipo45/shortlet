import { StatisticsInterface } from '@Modules/statistics/types';

export const calculateTotalPopulationByRegion = (
  data: StatisticsInterface[],
): StatisticsInterface[] => {
  const regionTotals = data.reduce(
    (acc, curr) => {
      const { region, population } = curr;
      acc[region] = (acc[region] || 0) + population;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(regionTotals).map(([region, population]) => ({
    region,
    population,
  }));
};