import { Country } from '@/countries/types';
import { Language } from '@/Modules/languages/types';

export const GetLanguagesAndSpeakers = (data: Country[]): Language[] => {
  const languageCounts: Record<string, Language> = {};

  data.forEach((country) => {
    const { languages } = country;
    Object.entries(languages).forEach(([code, name]) => {
      console.log(code, name);
      console.log(languages[code], 'languages[code]');
      console.log(languageCounts[code], 'languageCounts[code]');

      languageCounts[code] = languages[code] || {
        code,
        name,
        speakers: 0,
        countries: [],
      };
      languageCounts[code].speakers += country.population;
      languageCounts[code].countries.push(country.cca2);
    });
  });

  return Object.values(languageCounts);
};
