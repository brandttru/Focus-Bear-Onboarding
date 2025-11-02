# What is Docker and Why Use It?
### How does Docker differ from a virtual machine?
Docker is a platform that allows developers to build, package and run applications in containers. Containers include everything needed to run a program, such as code, runtime, libraries and dependencies. This ensures that the application runs the same across different environments.

It differs virtual machines by being lightweight and using OS level isolation (containers share the same host OS kernel), as it starts up quicker, uses less CPU, memory and storage and has near native performace.

### Why is containerization useful for a backend like Focus Bear’s?
Containerisation is useful for backend as it can guarantee a consistent development environment. With consistent enviornments, any issues that are found by one developer can be investigated by others without question of dependencies. It can also enable faster start up as there is no need for manual installations. Overall, containers package code, dependencies and configurations together to make it easier for developers to work across the same environment.

### How do containers help with dependency management?
Containers make dependency management easier as it bundles dependencies with the application inside the container image. 

### What are the potential downsides of using Docker?
Some notable downsides of Docker are:
- Performance overhead
    - In large workloads, containers may incur overhead 
- Security risks
    - If not configured correctly, the host system can be exposed to security vulnerabilities
    - Some public Docker images may contain malware or outdated packages
- Network overhead
    - Since Docker is virtual it requires network configurations
    - Can get more complex
