# Dependency Injection in NestJS
## Tasks
### Research how dependency injection works in NestJS
- An object or class receives (is injected with) instances of other objects it depends on instead of creating them
- Makes testing easier
- Loose coupling between classes
- Providers are injected into controllers or other services
    - Use @Injectable
- Providers must be registered in a module to be available for injection

### Explore how services are injected into controllers
When flagged with `@Injectable`, a service can be injected into a controller.

For example, my app has app.service.ts marked with `@Injectacble`. This is then injected into the constructor of app.controller.ts, allowing methods from service to be used in controller. This was able to isolate the internal logic to the service, while the controller focuses on actually calling the methods, reducing code bloat.

### Investigate different provider scopes (SINGLETON, REQUEST, TRANSIENT)
- Singleton
    - Is instantiated once in the app
- Request
    - A new instance of the provider is created per request
    - `@Injectable({ scope: Scope.REQUEST })`
- Transient
    - A new instance of the provider is created every time it's injected
    - `@Injectable({ scope: Scope.TRANSIENT })`

## Reflection
### How does dependency injection improve maintainability?
Dependencies are created separate from controllers, thus separating responsibility and keeping code clean. This makes it easier to maintain and debug code. It also simplifies testing as mock providers can be injected, thus removing dependencies from testing. Dependencies can also be reused.

### What is the purpose of the @Injectable() decorator?
Marks a class as injectable.

### What are the different types of provider scopes, and when would you use each?
Singletons should be used for an overarching service that should be instantiated once and doesn't depend on request data.
Requests should be used when services need to maintain request specific state such as authentication or tracking per-request data.
Transient should be used in lightweight utility services that are temporary.