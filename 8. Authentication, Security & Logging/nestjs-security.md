# Security Best Practices in NestJS
## Tasks
### Explore how @fastify/helmet helps secure HTTP headers
Sets a collection of protective HTTP response headers that block many browser-based attacks before they reach app logic

### Implement request rate limiting using @fastify/rate-limit
After NestFactor.create in main.ts
```
  await app.register(fastifyRateLimit, {
    max: 100,               // limit each IP to 100 requests
    timeWindow: '1 minute' // per minute
  });
```

### Understand how to securely handle API keys and environment variables
.env already included in .gitignore when NestJS CLI was ran in previous milestone.

## Reflection
### What are the most common security vulnerabilities in a NestJS backend?
- Injection attacks
    - User input is received as raw query without any checks
- CORS misconfiguration
    - CORS:origin set to true lets any website make requests to backend and can leak cookies and tokens
- XSS
    - User injects malicious scripts into the site
- Rate limiting
    - Brute force login, API spam, DoS attacks

Personally, I think injection attacks are the easiest to overlook as we always assume users will be sensible with their input. We, as developers should be more aware of people purposefully trying to break systems.

### How does @fastify/helmet improve application security?
Sets response headers that defend against common attacks and is registered in main.ts

### Why is rate limiting important for preventing abuse?
Some attacks, such as brute force and DDoS require lots of requests to be sent through. Rate limiting, prevents the number of requests sent through, thus preventing the attack from happening.

### How can sensitive configuration values be protected in a production environment?
Sensitive values must be placed in a separate .env file, never hard coded into production code. .env should also be included in .gitignore to ensure it does not get accidentally pushed to Git. Additionally, they should be periodically changed and the same value should not be constantly reused.