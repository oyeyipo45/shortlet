import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { toBeOneOf } from 'jest-extended';

describe('CountriesController (e2e)', () => {
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

  it('It should return a list of countries (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/countries?page=1&limit=10',
    );

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('It should return a selected country matching search parameter (GET)', async () => {
    const country = 'nigeria';
    const response = await request(app.getHttpServer()).get(
      `/api/countries/${country}`,
    );

    expect(response.status).toBe(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
