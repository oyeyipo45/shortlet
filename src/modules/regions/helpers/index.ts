import { Country } from '@Countries/types';

export const calculateTotalPopulationByRegion = (countries: Partial<Country>[]) => {
  const regionData = countries.reduce(
    (acc, country) => {
      const { region, population } = country;
      const existingRegion = acc.find((r) => r.region === region);

      if (existingRegion) {
        existingRegion.population += population;
        existingRegion.countries.push(country.name.common);
      } else {
        acc.push({
          region,
          population,
          countries: [country.name.common],
        });
      }

      return acc;
    },
    [] as { region: string; population: number; countries: string[] }[],
  );

  return regionData;
};