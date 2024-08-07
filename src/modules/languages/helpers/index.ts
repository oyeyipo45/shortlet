import { Country } from '@/countries/types';
import { LanguageMap } from '@Languages/types';


export const GetLanguagesAndSpeakers = (data: Country[]):LanguageMap => {
  const result: LanguageMap = {};

  data.forEach((country) => {
    const { languages } = country;
    for (const languageCode in languages) {
      const language = languages[languageCode];
      if (!result[language]) {
        result[language] = {
          language,
          countries: [],
        };
      }
      result[language].countries.push(country.name.common);
    }
  });

  return result;
};
