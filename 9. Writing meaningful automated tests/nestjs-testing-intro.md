# Introduction to Testing in NestJS
## Tasks
### Research the different types of testing in NestJS (Unit, Integration, E2E)
- Unit
    - Test individual components in isolation
    - No real calls to database, network, external dependencies
    - Mock dependencies
    - Used to test a single unit of code, something that won't involve the entire app
- Integration
    - Test multiple components together
    - Usually involves real modules and repositories
    - Might use test containers
    - Used to ensure interactions between services, repositories and modules
- End to End (E2E)
    - Test the entire app through HTTP requests
    - Uses real modules, services, controllers, pipes, middleware
    - Used to verify all components of the app work together

### Understand the role of Jest in NestJS testing
Testing framework included in NestJS

### Explore how to test NestJS modules using @nestjs/testing
Creates test modules that isolate parts from the real module and allow you to test just these.

### Run a sample test using Jest
In app.controller.spec.ts I created a test module using nestjs/testing and used Jest to create test:
```
it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
```

![alt text](../Images/jest_test.png)

## Reflection
### What are the key differences between unit, integration, and E2E tests?
Unit test - isolated parts of code, mock dependencies
Integration - test components together
E2E - test the entire app

### Why is testing important for a NestJS backend?
It ensures backend logic is correct. Backend is also connected to the database is connected to, so testing and ensuring behaviour is correct ensures that nothing goes wrong with data. It also ensures different modules, services, databases and external dependencies work together correctly. Scalability is also a big factor in backend so that code does not get bloated and become difficult to maintain and keep clean.

### How does NestJS use @nestjs/testing to simplify testing?
It simplifies testing by creating test modules instead of using real modules. This allows for testing to involve less components before involving more. It also follows NestJS's dependency injection system, so services and controllers in the test environment also receive dependencies like in production. It also works with Jest, providing the same benefits from it.

### What are the challenges of writing tests for a NestJS application?
NestJS often has complex external dependency injections and as such they must mocked when performing unit testing. This was something I faced when creating my test module and had to use jest.fn() to mock values for any function calls I made with dependencies. Tests also must be maintainable as they will scale with the code. Ensuring that it is easy to add new test cases and update old ones will be the difference in ensuring continuous progression.