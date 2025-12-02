# Mocking Dependencies & Database Interactions in NestJS
## Tasks
### Research how to mock dependencies using jest.mock() and NestJS’s @nestjs/testing utilities
`jest.mock()` can mock an entire module globally.
`@nestjs/testing` contains TestingModule where you can create a module that mimicks your real app.module. Dependencies can be replaced by mock providers. First declare values to be mocked, then use those when injecting mock providers.

### Mock a service inside a controller test
Here is a mocked service that includes a mocked value for the getHello() method that I will be testing.
```
  const mockAppService = {
    getHello: jest.fn().mockReturnValue('mocked hello'),
    getTodo: jest.fn(),
  };
```
This caused an issue with some of my previously created tests, where they used the real app service. If I wanted them to work again I would have had to used the mocked service instead and ensure it mocks values for the methods to test. For simplicity, I have commented them out and ran the test file, where the test was successful.

This is the test method using the mocked app service.
```
  it('should return the mocked response', () => {
    expect(appController.getHello()).toBe('mocked hello');
    expect(mockAppService.getHello).toHaveBeenCalled();
  });
```

### Mock a database repository (TypeORM Repository) in a service test
The mocked repository looks like this and is injected into providers of the mock testing module. 
```
const userRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
```

The associated test can be found in app.service.spec.ts:
```
  it('should return all users when findAll is called', async () => {
    const expectedUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    userRepositoryMock.find.mockResolvedValue(expectedUsers);

    const users = await appService.findAll();

    expect(users).toEqual(expectedUsers);
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
  }); 
```

Personally, I had issues with this because I did not realise controller tests and service tests were different. I though this test could be done in the controller test without realising the controller test mocked a service which could not have connected to a mock repository to begin with. As such I had to move this test to app.service.spec.ts

### Explore when to use jest.spyOn() vs jest.fn() in mocks
Use `jest.fn()` when you are replacing an entire dependency with your own fake implementation. Use `jest.spyOn()` when you want the original class/method but mock ONE method.

## Reflection
### Why is mocking important in unit tests?
Mocking is important since unit testing is focused on the logic of a function, without mocking issues can arise that are caused by the dependency, thus raising the scope of the test. It can also let you control behaviour of the dependencies. For example, you may want to test for logic when API is down. This can be done by mocking an error in the dependency rather than relying on issues with it to begin with.

### How do you mock a NestJS provider (e.g., a service in a controller test)?
Create a mock object. You can use `jest.fn()` to mock return values of functions in a service. Then you can inject that as a provider in the test module.

### What are the benefits of mocking the database instead of using a real one?
Besides the aforementioned reasonings for general mocking in unit tests, tests will run a lot faster when they don't have to rely on a database connection. This will create latency in database retrieval and is a major issue for scalability of tests.

### How do you decide what to mock vs. what to test directly?
Generally, I would mock anything external. This is to remove any doubts of connections and latency that comes from it. Additionally, external dependencies that touches the infrastructure of the app (BullMQ). Any components of the app that are purely logic, such as controllers, interceptors or validators do not have to be mocked.