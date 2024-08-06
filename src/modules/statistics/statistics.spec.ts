import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '@/Modules/statistics/statistics.controller';
import { HttpStatus } from '@nestjs/common';
describe('StasticsController', () => {
  let statisticsController: StatisticsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
    }).compile();

    statisticsController = app.get<StatisticsController>(StatisticsController);
  });

  describe('Statistics', () => {
    it('should return calculated statistics', async () => {
      const result = {
        data: {
          totalCountries: 250,
          largestCountryArea: 'Russia',
          smallestPopulation: 'Bouvet Island',
          mostWidelySpokenLanguage: null,
        },
        success: true,
        status: HttpStatus.OK,
        message: 'Statistics retrieved successfully',
      };
      expect(await statisticsController.getStatistics()).toBe(result);
    });
  });
});
