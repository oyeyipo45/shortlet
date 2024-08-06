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
