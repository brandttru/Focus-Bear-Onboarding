# Setting Up a NestJS Project
## Task
### Install required dependencies and initialize a NestJS project
Since I did docker-nestjs first, the application has already been made.
![alt text](../Images/nestjs_docker.png)

## Reflection
### What files are included in a default NestJS project?
`app.module.ts` brings everything together in the app. It imports other modules and declares basic structure.
`app.controller.ts` controls the app. Handles HTTP requests.
`app.controller.spec.ts` contains unit testing for the controller.
`app.service.ts` contains business logic that the controller uses. Shows dependency injection patterns.
`main.ts` creates the instance of the NestJS app, applies global configurations and starts HTTP server listener.

### How does main.ts bootstrap a NestJS application?
`main.ts` exports an async bootstrap function that will initialise the app. `NestFactory.create()` is then used to instantiate an instance of the app. At this point it will also set up the dependency injection container, initialise all modules and wires up controllers and providers.

### What is the role of AppModule in the project?
`AppModule` serves as the root module of the app. It can be considered the starting point from which `main.ts` will use it to build the app.

### How does NestJS structure help with scalability?
- Modular architecture
    - The app can be split into feature modules where functionality for each is encapsulated within, allowing for independent work across the app

- Dependency injection
    - Code is loosely coupled and highly testable as services receive dependencies instead of creating them

- Reusability
    - Shared functionality can be reused through modules