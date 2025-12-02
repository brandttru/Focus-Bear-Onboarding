import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/app.entity';
import { PinoLogger } from 'nestjs-pino';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppService', () => {
  let appController: AppController;
  let appService: AppService;
  let httpServiceMock: { get: jest.Mock };

  const userRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
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
          useValue: userRepositoryMock,
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

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('getHello() should return "Hello World!"', () => {
    expect(appService.getHello()).toBe('Hello World!');
  });

  it('should return all users when getAllUsers is called', async () => {
    const expectedUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    userRepositoryMock.find.mockResolvedValue(expectedUsers);

    const users = await appService.getAllUsers();

    expect(users).toEqual(expectedUsers);
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
  }); 
});
