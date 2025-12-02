# Setting Up a NestJS Project
## Task
### Research the steps to set up a new NestJS project
There are many different ways to set up a new project: manually, CLI, etc. Depending on which one you use, some will be harder than others.

### Install required dependencies and initialize a NestJS project
Using CLI, I set up my project wtih the default structure. All default dependencies are already installed this way.
![alt text](../Images/nestjs_docker.png)

### Explore the default project structure (modules, controllers, services, main.ts)
I noticed that controller and service was already injected. This is helpful as it means I can get straight into coding logic without worrying/forgetting about this key step to integrating all components of the app together.

### Run the development server and test a simple endpoint
I ran the project using `npm run start:dev` and as expected the default endpoint showed "Hello World!", confirming that the controller, service and module are all wired together correctly.

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