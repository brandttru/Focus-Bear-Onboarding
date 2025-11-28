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

### Write a test for an asynchronous Redux action (if applicable).
In test/userSlice.test.ts I created tests for fetching user data and fetch errors. The fetch looks like:
```
  it('successfully fetches user data and updates state', async () => {
    global.fetch = jest.fn(() => // mock fetch response (API)
      Promise.resolve({ // async object we expect
        json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
      })
    );

    const store = configureStore({ // create a redux store with user reducer
      reducer: {
        user: userReducer,
      },
    });

    await store.dispatch(fetchUser(1));

    const state = store.getState().user; // get state of slice after async action completes

    expect(state.loading).toBe(false); // checks not loading anything, fetch is finished
    expect(state.data).toEqual({ id: 1, name: 'John Doe' });
    expect(state.error).toBeNull();
  });
```

![alt text](../Images/async_thunk_test.png)

## Reflection
### What was the most challenging part of testing Redux?
I found understanding Redux the most challenging. I already have an understanding of how states and actions work, but how they work in redux and how to test them were new to me. Eventually, by creating tests myself and running them did I develop and understanding of how Redux works.

Testing reducers were simple enough, but testing async actions were a lot harder. This is because I needed to mock API calls, which I did with `jest.fn()`. Additionally, I had to configure a redux store to test the state transitions.

### How do Redux tests differ from React component tests?
Redux tests are different because they focus on the actions undertaken in an app, i.e the transition from state to state. It also uses plain functions to test, rather than components in React tests.

# Testing React Components with Jest & React Testing Library
## Tasks
### Research how React Testing Library works with Jest.
React Testing Library is a testing utility for React components. It focuses on testing components from the user's perspective, moreso tests behaviour and feedback instead of internal logic. It works by rendering React components into a testing environment (`render()`), query elements and simulate user interactions. Jest is the test runner and assertion library. In summary, React Testing Library provides the React utilities and Jest provides the testing framework.

### Create a simple React component that displays a message.
In frontend/src/components/message.tsx the component displays a message from someone as well as the time it was "sent". It is used in backend/src/App.tsx to create messages to display on the app homescreen.
```
<Message 
  text="Hello! Welcome to the app." 
  sender="Alice"
/>
```
### Write a test that checks if the component renders correctly.
A variety of tests were created in frontend/src/components/message.test.tsx that checks to see if each part of the component was rendered. For example, checking to see if the sender name was rendered looks like:
```
  it('renders the message text', () => {
    render(<Message text="Hello World" sender="John" />); // render test Message
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
```
Overall tests were successful and there was no issue.

![alt text](../Images/react_test.png)

### Write a test that simulates user interaction (e.g., clicking a button).
For this I created a counter component that simply increases for each mouse click by the user, then made the test file.
```
test("increments count when button is clicked", () => {
  render(<Counter />);

  // get the elements
  const countElement = screen.getByTestId("count");
  const button = screen.getByRole("button", { name: /increase/i });

  // initial state check
  expect(countElement.textContent).toBe("Count: 0");

  // simulate click
  fireEvent.click(button);

  // after click
  expect(countElement.textContent).toBe("Count: 1");
});
```

![alt text](../Images/react_interact_test.png)

## Reflection
### What are the benefits of using React Testing Library instead of testing implementation details?
React Testing Library is beneficial as it:
- Is less likely to break as it purely focuses on the aspects that affect how a user interacts with the app
- Encourages more user focused testing/design
- Easier to refactor
- Prevents over-mocking
- Faster understanding and maintenance

### What challenges did you encounter when simulating user interaction?
In general, I had issues with this as the entire time I had been working with NestJS and I didn't realise that I had to literally separate my repo into frontend and backend. Until I figured that out, I was stuck trying to understand why my React components could not be ran in the NestJS project. But once I did figure it out I had little issues as I have prior experience with React and was able to create the tests. The tests weren't too difficult as the component I created was simple and only had 1 response for a button click.