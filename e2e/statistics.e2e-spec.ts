import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { toBeOneOf } from 'jest-extended';

describe('StatisticsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(() => {
    expect.extend({ toBeOneOf });
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('It should calculated statistics', async () => {
    const response = await request(app.getHttpServer()).get('/api/statistics');

    expect(response.status).toBe(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
