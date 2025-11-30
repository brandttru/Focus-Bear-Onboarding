# Running PostgreSQL in Docker
## Tasks
### Research how to run PostgreSQL in a Docker container
Using docker-compose.yml, define db under services.

### Set up a docker-compose.yml file to run PostgreSQL
Here's a snippet of the database configuration in docker-compose.yml, making sure to map volumes for persistent data:
```
db:
    image: postgres:16
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data  # persistent storage
```

### Connect to the running PostgreSQL instance using a database client (e.g., pgAdmin, psql)
Composed container

![alt text](../Images/docker.png)

Connected to psql shell inside container

![alt text](../Images/psql_shell.png)

### Explore how volumes persist PostgreSQL data across container restarts
Volumes must be mounted to ensure the data is persistent. For example, in my snippet for the database connection, I mounted the volume at /var/lib/postgresql/data to make database data persistent.

## Reflection
### What are the benefits of running PostgreSQL in a Docker container?
It allows PostgreSQL to be used without having to install it, making it easier to setup. It also ensures it works consistently across machines as you don't run into issues with how it is installed onto different OS.

### How do Docker volumes help persist PostgreSQL data?
Without volumes, any data written will be written to the instance of the container. This means it is susceptible to data loss when the container is restarted or composed down.

### How can you connect to a running PostgreSQL container
You can use `docker exec` to run psql within the container or use a GUI client to to connect to the container by host, port, user, password, and database.