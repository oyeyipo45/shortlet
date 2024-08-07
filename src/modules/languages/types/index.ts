export interface CountryLa {
  name: { common: string };
  languages: Record<string, string>;
}

export interface Languages {
  name: Name;
  languages: Record<string, string>;
  population: number;
}

export interface LanguageMap {
  [languageCode: string]: LanguageData;
}

export interface Name {
  common: string;
  official: string;
  nativeName: LanguageMap;
}

export interface LanguageData {
  language: string;
  countries: string[];
}
