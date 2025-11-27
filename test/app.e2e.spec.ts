import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppController } from '../backend/src/app.controller';
import { AppService } from '../backend/src/app.service';
import { PinoLogger } from 'nestjs-pino';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../backend/src/app.entity';
import { generateTestJwt } from './util/test-jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let httpServiceMock: { get: jest.Mock };
  let appService: AppService;
  let adminToken: string;

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
          AppService,
  
          // Mock Bull queue
          {
            provide: 'BullQueue_tasks',
            useValue: { add: jest.fn() },
          },
  
          // Mock TypeORM repository
          {
            provide: getRepositoryToken(User),
            useValue: {
              count: jest.fn().mockResolvedValue(0),
              find: jest.fn(),
              findOne: jest.fn(),
              save: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
          // Mock PinoLogger
          {
            provide: PinoLogger,
            useValue: {
              info: jest.fn(),
              error: jest.fn(),
              warn: jest.fn(),
              debug: jest.fn(),
            },
          },
          {
            provide: HttpService,
            useValue: httpServiceMock,
          },
        ],
    }).compile();

    appService = moduleFixture.get<AppService>(AppService);
    app = moduleFixture.createNestApplication();
    await app.init();

    adminToken = generateTestJwt({
      sub: 1,          
      username: 'admin',
      roles: ['admin'] 
    });
  });

  it('GET/ should return Hello World!', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST/ should create user with valid input', async () => {
  jest.spyOn(appService, 'addUser').mockResolvedValue({
    id: 1,
    name: 'John Doe',
    socialSecurityNumber: '123456-1234567',
    creditCardNumber: '1234567890123456',
  });

  const response = await request(app.getHttpServer())
    .post('/users')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'John Doe',
      socialSecurityNumber: '123456-1234567',
      creditCardNumber: '1234567890123456',
    })
    .expect(HttpStatus.CREATED);

  expect(response.body).toEqual({
    id: 1,
    name: 'John Doe',
    socialSecurityNumber: '123456-1234567',
    creditCardNumber: '1234567890123456',
  });
  expect(appService.addUser).toHaveBeenCalledWith(
    'John Doe',
    '123456-1234567',
    '1234567890123456',
  );
  }
);
});
