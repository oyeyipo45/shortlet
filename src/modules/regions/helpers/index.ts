import { RegionInterface } from '@/modules/regions/types';

export const calculateTotalPopulationByRegion = (
  data: RegionInterface[],
): RegionInterface[] => {
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
