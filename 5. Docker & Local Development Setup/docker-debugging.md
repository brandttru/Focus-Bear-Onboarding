# Debugging & Managing Docker Containers
## Tasks
### Research how to inspect running containers 
`docker ps` - displays currently active running containers on the system and info
`docker inspect` - provides low level information about a certain container

### Explore how to enter a running container 
`docker exec -it` - lets you run a command in a running container

### Understand how to remove, restart, and rebuild containers
`docker stop` - stops a running container
`docker rm` - removes (deletes) a container
`docker compose down && up` - stops and remove compose containers or recreates them

## Reflection
### How can you check logs from a running container?
Using `docker logs` you can check the logs of a containers. This works with either the container ID or the name.

### What is the difference between docker exec and docker attach?
`docker exec` runs commands within the container and is more used for debugging within the container, whereas `docker attach` attaches an open terminal to the instance of docker and oberves the main container process. 

### How do you restart a container without losing data?
`docker restart` can restart a container without losing data given that the container was not started with --rm

### How can you troubleshoot database connection issues inside a containerized NestJS app?
Some ways of troubleshooting are checking environment variables, check if the DB container is running or pinging the database from inside the NestJS container.