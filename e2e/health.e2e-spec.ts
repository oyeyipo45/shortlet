import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Test application health (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/health/application',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      info: {
        'shortlet-test': {
          status: 'up',
        },
      },
      error: {},
      details: {
        'shortlet-test': {
          status: 'up',
        },
      },
    });
  });

  it('Test external API health (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/health/external-api-health',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      info: {
        'external-api-health': {
          status: 'up',
        },
      },
      error: {},
      details: {
        'external-api-health': {
          status: 'up',
        },
      },
    });
  });
});
