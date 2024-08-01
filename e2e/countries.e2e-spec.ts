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
    // return request(app.getHttpServer())
    //   .get('/countries')
    //   .expect(HttpStatus.OK)
    //   .expect(({ body }) => {
    //     const { success, message, data } = body;
    //     expect(success).toBeDefined();
    //     expect(message).toBeDefined();
    //     expect(data).toBeDefined();
    //   });

    const response = await request(app.getHttpServer()).get('/countries');

    expect(response.status).toBe(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
