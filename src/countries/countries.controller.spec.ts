import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from '@Countries/countries.controller';
import { CountriesService } from '@Countries/countries.service';
import { HttpStatus } from '@nestjs/common';

describe('CountriesController', () => {
  let countriesController: CountriesController;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
    }).compile();

    countriesController = app.get<CountriesController>(CountriesController);
  });

  describe('findCountries', () => {
    it('should return list of all countries', async () => {
      const result = {
        data: [
          {
            name: {
              common: 'South Georgia',
              official: 'South Georgia and the South Sandwich Islands',
              nativeName: {
                eng: {
                  official: 'South Georgia and the South Sandwich Islands',
                  common: 'South Georgia',
                },
              },
            },
            tld: ['.gs'],
            cca2: 'GS',
            ccn3: '239',
            cca3: 'SGS',
            independent: false,
            status: 'officially-assigned',
            unMember: false,
            currencies: {
              SHP: {
                name: 'Saint Helena pound',
                symbol: '£',
              },
            },
            idd: {
              root: '+5',
              suffixes: ['00'],
            },
            capital: ['King Edward Point'],
            altSpellings: [
              'GS',
              'South Georgia and the South Sandwich Islands',
            ],
            region: 'Antarctic',
            languages: {
              eng: 'English',
            },
            translations: {
              ara: {
                official: 'جورجيا الجنوبية وجزر ساندوتش الجنوبية',
                common: 'جورجيا الجنوبية',
              },
            },
            latlng: [-54.5, -37],
            landlocked: false,
            area: 3903,
            demonyms: {
              eng: {
                f: 'South Georgian South Sandwich Islander',
                m: 'South Georgian South Sandwich Islander',
              },
            },
            flag: '🇬🇸',
            maps: {
              googleMaps: 'https://goo.gl/maps/mJzdaBwKBbm2B81q9',
              openStreetMaps: 'https://www.openstreetmap.org/relation/1983629',
            },
            population: 30,
            car: {
              signs: [''],
              side: 'right',
            },
            timezones: ['UTC-02:00'],
            continents: ['Antarctica'],
            flags: {
              png: 'https://flagcdn.com/w320/gs.png',
              svg: 'https://flagcdn.com/gs.svg',
            },
            coatOfArms: {},
            startOfWeek: 'monday',
            capitalInfo: {
              latlng: [-54.28, -36.5],
            },
          },
        ],
        success: true,
        status: HttpStatus.OK,
        message: 'Countries retrieved successfully',
      };

      expect(await countriesController.getCountries()).toBe(result);
    });
  });
});
