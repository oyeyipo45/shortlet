import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { toBeOneOf } from 'jest-extended';

describe('RegionsController (e2e)', () => {
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

  it('It should return a list regions and their populations (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/regions',
    );

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('It should return list of countries in a selected region matching search parameter (GET)', async () => {
    const region = 'europe';
    const response = await request(app.getHttpServer()).get(
      `/api/regions/${region}`,
    );

    expect(response.status).toBe(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
