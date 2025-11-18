# Validating Requests with Pipes in NestJS
## Tasks
### Research what pipes are in NestJS and how they work
Pipes transform or validate data before they reach route handlers (controller method). They run after middleware but before interceptors.
A pipe is a class with `@Injectable` decorator and implements PipeTransform

### Explore built-in pipes like ValidationPipe and ParseIntPipe
`ValidationPipe` validates incoming data using class-validator decorators 
`ParseIntPipe` transforms a string paramater into a number

## Reflection
### What is the purpose of pipes in NestJS?
Validates incoming request data. Transforms incoming data to a desired format.

### How does ValidationPipe improve API security and data integrity?
It can prevent other shapes of data being sent, which could include malicious code, such as SQL injection, payload tampering, etc. It also upholds data integrity by enforcing consistent data structure or transforming data to match the expected data type.

### What is the difference between built-in and custom pipes?
Built in pipes are used for common repetitive problems and are provided by NestJS. Custom pipes must be written and will handle logic that the built in ones do not cover, these are usually created to enforce business rules.

### How do decorators like @IsString() and @IsNumber() work with DTOs?
These help define what data type is expected for the parameter. ValidationPipe will use this to validate if the data for that parameter matches the decorator it is defined by.