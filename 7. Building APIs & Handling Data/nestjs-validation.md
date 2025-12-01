# Validating Requests with Pipes in NestJS
## Tasks
### Research what pipes are in NestJS and how they work
Pipes transform or validate data before they reach route handlers (controller method). They run after middleware but before interceptors.
A pipe is a class with `@Injectable` decorator and implements PipeTransform

### Explore built-in pipes like ValidationPipe and ParseIntPipe
`ValidationPipe` validates incoming data using class-validator decorators 
`ParseIntPipe` transforms a string paramater into a number

### Create a custom DTO (Data Transfer Object) and apply class-validator decorators
A DTO I created is the CreateUser DTO which is used in the controller's getUser() method where it will validate the data being passed when creating a user. In this case, a user must be created with a name, SSN, credit card and all values must be strings.
```
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  socialSecurityNumber: string;

  @IsString()
  creditCardNumber: string;
}
```

### Use a global validation pipe to enforce DTO validation across the app
To enable global validation I added this to main.ts
```
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unwanted fields
      forbidNonWhitelisted: true, // throws error if extra fields sent
      transform: true, // auto-convert types (string → number)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
```

When I first tested this (without transform), when I tried to send {"name": 123, "socialSecurityNumber": 123, "creditCardNumber": 123}, a 400 error was returned that demanded the correct data type. Adding transform fixed this issue as the values were automatically converted to strings. This helped me better understand the power of global validation pipes and how strict they can be.

## Reflection
### What is the purpose of pipes in NestJS?
Validates incoming request data. Transforms incoming data to a desired format.

### How does ValidationPipe improve API security and data integrity?
It can prevent other shapes of data being sent, which could include malicious code, such as SQL injection, payload tampering, etc. It also upholds data integrity by enforcing consistent data structure or transforming data to match the expected data type.

### What is the difference between built-in and custom pipes?
Built in pipes are used for common repetitive problems and are provided by NestJS. Custom pipes must be written and will handle logic that the built in ones do not cover, these are usually created to enforce business rules.

### How do decorators like @IsString() and @IsNumber() work with DTOs?
These help define what data type is expected for the parameter. ValidationPipe will use this to validate if the data for that parameter matches the decorator it is defined by.