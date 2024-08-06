import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { RegionsController } from '@Regions/region.controller';


describe('RegionsController', () => {
  let regionsController: RegionsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
    }).compile();

    regionsController = app.get<RegionsController>(RegionsController);
  });

  describe('rEGIONS', () => {
    it('should return aggregated regions, population and countries in a each region', async () => {
      const result = {
        data: [
          {
            region: 'Antarctic',
            population: 1430,
            countries: [
              'South Georgia',
              'Antarctica',
              'Bouvet Island',
              'French Southern and Antarctic Lands',
              'Heard Island and McDonald Islands',
            ],
          },
        ],
        success: true,
        status: HttpStatus.OK,
        message: 'Regions retrieved successfully',
      };
      expect(await regionsController.getRegions()).toBe(result);
    });
  });
});
