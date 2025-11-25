import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/app.entity';
import { PinoLogger } from 'nestjs-pino';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService; 
  let httpServiceMock: { get: jest.Mock };

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
          useValue: {
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

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });
  
  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });

  it('should mock an external API call', async () => {
    const mockResponse = {
      data: { id: 1, title: 'Test Todo' },
    }; // pretend this is the API response

    httpServiceMock.get.mockReturnValue(of(mockResponse));

    const result = await appService.getTodo(1);

    expect(result).toEqual({ id: 1, title: 'Test Todo' });
    expect(httpServiceMock.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
  });
});
