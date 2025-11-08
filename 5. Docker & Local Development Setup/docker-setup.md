# Setting Up Docker and Docker Compose
## Reflection
### What is the difference between docker run and docker-compose up?
`docker run` runs a single container manually, whereas `docker-compose up` will run multiple containers as defined in docker-compose.yml

### How does Docker Compose help when working with multiple services?
Compose is useful when working with multiple services as it allows multiple services to be ran from a single file. This makes the process of running docker containers more convenient.

### What commands can you use to check logs from a running container?
`docker-compose logs` can check logs. To view logs in real time add the `-f` flag.

### What happens when you restart a container? Does data persist?
Any data written within the container's writable layer does get deleted when the container is restarted. But data written to volume or bind mount will be persistent.