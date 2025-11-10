# Understanding Modules, Controllers, and Providers in NestJS
## Tasks
### Research what modules, controllers, and providers are in NestJS
- Modules
    - Encapsulate features and functionality of parts of the app
- Controllers
    - Handle incoming HTTP requests and provides responses, serving as the entry point for the app
- Providers
    - Dependency injectors that encapsulate business logic and data manipulation

### Understand how NestJS uses decorators
NestJS extends TypeScript's decorator capabilities using reflect-metadata, a library that implements the Metadata Reflection API proposal, allowing frameworks to store and retrieve metadata about classes, methods, and properties. They are used to mark files.

- @Module
    - Provides metadata that NestJS uses to organise application structure
- @Controller
    - Organises routes and requst handling logic
- @Injectable
    - Can be managed by NestJS dependency injection logic

## Reflection
### What is the purpose of a module in NestJS?
Modules organise and encapsulate parts of the app into cohesive units. This allows better organisation, dependency management, scalability and reusability.

### How does a controller differ from a provider?
Controllers handle incoming HTTP requests and return responses to the client. They are entry points for API endpoints. Providers contain the business logic, data manipulation and app behaviour

### Why is dependency injection useful in NestJS?
Classes don't create their own dependencies, instead they are provided. A controller will receive dependencies from the service.
This can be useful in testing. Mock services can be injected to test controllers so that you don't actually run real service logic. It is also useful in code reusability as services can be used in multiple controllers. Services can also be easily swapped out, allowing for more flexibility.

### How does NestJS ensure modularity and separation of concerns?
Using decorators, NestJS creates clear boundaries between controllers, services, and other components. This separation of components ensures different components do not get mixed in with each other, creating confusion between components. This is vital in terms of scalability and reusability, keeping the code as minimal and as clean as possible.