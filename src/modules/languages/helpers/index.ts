import { Country } from '@/countries/types';
import { Language } from '@/Modules/languages/types';

interface LanguageData {
  language: string;
  countries: string[];
}

export interface LanguageMap {
  [languageCode: string]: LanguageData;
}

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
