# Security Best Practices in NestJS
## Tasks
### Explore how @fastify/helmet helps secure HTTP headers
Sets a collection of protective HTTP response headers that block many browser-based attacks before they reach app logic

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

### How does @fastify/helmet improve application security?
Sets response headers that defend against common attacks and is registered in main.ts

### Why is rate limiting important for preventing abuse?
Some attacks, such as brute force and DDoS require lots of requests to be sent through. Rate limiting, prevents the number of requests sent through, thus preventing the attack from happening.

### How can sensitive configuration values be protected in a production environment?
Sensitive values must be placed in a separate .env file, never hard coded into production code. .env should also be included in .gitignore to ensure it does not get accidentally pushed to Git. Additionally, they should be periodically changed and the same value should not be constantly reused.