export interface LanguageInterface {
  region: string;
  population: number;
}

export interface Language {
  code: string;
  name: string;
  speakers: number;
  countries: string[];
}

export interface LanguageData {
  language: string;
  countries: string[];
}

export interface LanguageMap {
  [languageCode: string]: LanguageData;
}