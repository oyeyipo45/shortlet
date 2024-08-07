import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { toBeOneOf } from 'jest-extended';
import { APIResponse } from '@Common/types';
import { Country } from '@Countries/types';

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

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.OK);
    expect(success).toBe(true);
    expect(message).toBe('Countries retrieved successfully');
  });

  it('It should return a list of countries (GET) within a region ', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/countries?page=1&limit=10&region=africa',
    );

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.OK);
    expect(success).toBe(true);
    expect(message).toBe('Countries retrieved successfully');
  });

  it('It should return an error as region does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/countries?page=1&limit=10&region=africas',
    );

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(success).toBe(false);
    expect(message).toBe('Not Found');
  });

  it('It should return a selected country matching search parameter (GET)', async () => {
    const country = 'nigeria';
    const response = await request(app.getHttpServer()).get(
      `/api/countries/${country}`,
    );

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('It should return an error as country does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/countries/naija',
    );

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(success).toBe(false);
    expect(message).toBe('Not Found');
  });

  afterAll(async () => {
    await app.close();
  });
});
