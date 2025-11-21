# Introduction to Unit Testing with Jest
## Tasks
### Research what Jest is and why unit tests are important.
Jest is a JavaScript testing framework. It can automatically find and run tests, provide functions to check results, mock functions and is included automatically in NestJS. Unit testing is important as it will define what is the expected outcome of the logic being tested. It will catch bugs early, make it easier to make appropriate changes, improve code quality and improve reliability of logic.

### Write a simple test for a utility function (e.g., a function that adds two numbers).
In src/util/math.util.spec.ts

![alt text](../Images/jest_test.png)

### Why is automated testing important in software development?
Automated testing is important because it streamlines the testing process. Rather than manually testing, automated testing is simplier, more convenient and is able to automatically catch errors. This speeds up the development process, creating faster feedback and progression.

### What did you find challenging when writing your first Jest test?
As the work up until this point required a lot of dependencies and libraries to be installed, I had to mock all of those, ensuring that necessary values were mocked.