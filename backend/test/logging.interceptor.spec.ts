import { LoggingInterceptor } from '../src/logging.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let mockContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();

    // Mock request object
    const req = {
      method: 'GET',
      url: '/test-endpoint',
    };

    // Mock Nest ExecutionContext
    mockContext = {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;

    // Mock CallHandler returning an observable
    mockCallHandler = {
      handle: jest.fn(() => of({ success: true })),
    };

    // Mock console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockImplementation(() => 1000); // stable timestamps
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log the incoming request', (done) => {
    interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
      expect(console.log).toHaveBeenCalledWith(
        'Incoming Request: GET /test-endpoint',
      );
      done();
    });
  });

  it('should call next.handle()', (done) => {
    interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
      expect(mockCallHandler.handle).toHaveBeenCalled();
      done();
    });
  });

  it('should log response data with response time', (done) => {
    // Mock response time: first call = 1000ms, second call = 1100ms
    let callCount = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => {
      callCount++;
      return callCount === 1 ? 1000 : 1100;
    });

    interceptor.intercept(mockContext, mockCallHandler).subscribe((result) => {
      expect(result).toEqual({ success: true });

      expect(console.log).toHaveBeenCalledWith(
        'Response for GET /test-endpoint - 100ms:',
        { success: true },
      );

      done();
    });
  });
});
