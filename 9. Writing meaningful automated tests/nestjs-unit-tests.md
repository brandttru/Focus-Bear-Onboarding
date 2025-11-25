# Writing Unit Tests for Services & Controllers in NestJS
## Tasks
### Research how unit testing works in NestJS using Jest
Jest is a JavaScript testing framework. It can automatically find and run tests, provide functions to check results, mock functions and is included automatically in NestJS. A testing module is created, where controllers and providers to test for are injected, isolating testing to just the "units" to be tested. Dependencies are to be mocked using Jest.

### Write a unit test for a simple NestJS service
In app.service.spec.ts I created a test module to test app.service which tests the getHello() method of app.service
```
    it('getHello() should return "Hello World!"', () => {
        expect(appService.getHello()).toBe('Hello World!');
    });
```

### Write a unit test for a controller method handling API requests
This test can also be found in test/app.controller.spec.ts where the controller handles an external API request
```
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
```

### Mock dependencies using jest.mock() or NestJS’s testing utilities
In test/app.controller.spec.ts, external dependencies such as the Bull queue, TypeORM repository, PinoLogger, and HTTP service are mocked using NestJS's testing utilities. For example, HttpService is mocked such that it can return a predefined object using jest.fn() and of().
```
  httpServiceMock = {
    get: jest.fn(),
  };
```

## Reflection
### Why is it important to test services separately from controllers?
Since controllers handle HTTP requests and responses and services contain business logic it is good practice to isolate tests from any external issues. 

### How does mocking dependencies improve unit testing?
To reduce the affect that dependencies will have on code logic, it is a good idea to mock them. Since dependencies access to a lot of external things such as databases and API, it reduces failure from things that cannot be controlled.

### What are common pitfalls when writing unit tests in NestJS?
Some common mistakes are not mocking dependencies properly, testing multiple layers at once, forgetting asynchronous behaviour and not making error test cases.

### How can you ensure that unit tests cover all edge cases?
For me I would use some of the strategies I've learnt in the past like boundary value analysis. I will also make sure I understand the requirements of the code as they usually give a good idea for what is expected and edge cases can be deduced.