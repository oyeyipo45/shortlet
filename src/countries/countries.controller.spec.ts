import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from '@Countries/countries.controller';
import { CountriesService } from '@Countries/countries.service';

describe('CountriesController', () => {
  let countryController: CountriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService],
    }).compile();

    countryController = app.get<CountriesController>(CountriesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(countryController.getHello()).toBe('Hello World!');
    });
  });
});
