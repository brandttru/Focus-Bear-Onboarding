# Introduction to Unit Testing with Jest
## Tasks
### Research what Jest is and why unit tests are important.
Jest is a JavaScript testing framework. It can automatically find and run tests, provide functions to check results, mock functions and is included automatically in NestJS. Unit testing is important as it will define what is the expected outcome of the logic being tested. It will catch bugs early, make it easier to make appropriate changes, improve code quality and improve reliability of logic.

### Write a simple test for a utility function (e.g., a function that adds two numbers).
The test was created in src/util/math.util.spec.ts:
```
describe('add()', () => {
  it('should return the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-4, 10)).toBe(6);
  });
});
```

![alt text](../Images/jest_test.png)

### Why is automated testing important in software development?
Automated testing is important because it streamlines the testing process. Rather than manually testing, automated testing is simplier, more convenient and is able to automatically catch errors. This speeds up the development process, creating faster feedback and progression.

### What did you find challenging when writing your first Jest test?
As the work up until this point required a lot of dependencies and libraries to be installed, I had to mock all of those, ensuring that necessary values were mocked.

# Mocking API Calls in Jest
## Tasks
### Research how to mock API calls in Jest using jest.fn() and jest.mock().
`jest.fn()` to mock a function especially if dependencies are injected
`jest.mock()` to mock an entire module

### Write a Jest test that mocks the API call and verifies the component’s behavior.
In app.controller.spec.ts:
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

![alt text](../Images/api_test.png)

### Why is it important to mock API calls in tests?
Since real API calls require network connection, mocking it will eliminate any network issues during testing, speeding up the testing process. It also makes it more reliable and isolates logical issues. Thus it will be easier to deduce if there are any issues with logic or API.

### What are some common pitfalls when testing asynchronous code?
Asynchronous code is hard to test because you must use `await` or `async` to ensure code doesn't run prematurely, thus returning an incorrect conclusion for the test. Race conditions may also be present if two functions are accessing the same data. Overall, asynchronous code has hard to predict behaviour due to code running at the same time and we must include keywords to tell it not to run prematurely.

# Testing Redux with Jest
## Tasks
### Research how to test Redux reducers and actions in Jest.
Redux reducers are functions that take in states and return new states. To test we pass an initial state and action, and expect a resulting state.

A slice in Redux Toolkit is a self-contained module that includes a piece of state + the reducers that modify that state + the action creators - all in one file.

### Create a simple Redux slice (if not already created).
I created a slice in counterSlice.js that increments/decrements a counter.

### Write a test that checks if a reducer updates state correctly.
I created the tests in test/counterSlice.test.ts for each reducer incremenet, decrement, and increment by amount. The increment test looks like:
```
  it('should handle increment', () => {
    const initialState = { value: 0 };

    const result = counterReducer(initialState, increment()); // pass initial state and action

    expect(result).toEqual({ value: 1 }); // check if resulting state is equal to what we expect
  });
```

![alt text](../Images/redux_test.png)

## Reflection
### What was the most challenging part of testing Redux?
I found understanding Redux the most challenging. I already have an understanding of how states and actions work, but how they work in redux and how to test them were new to me. Eventually, by creating tests myself and running them did I develop and understanding of how Redux works.

### How do Redux tests differ from React component tests?
Redux tests are different because they focus on the actions undertaken in an app, i.e the transition from state to state. It also uses plain functions to test, rather than components in React tests.