# opensesame-front

Front part of opensesame project, an authentication service.

Manage users and assign them roles and permissions to perform certain actions.

## Requirements

- [opensesame-back](https://github.com/macolmenerori/opensesame-back) set up and running
- [Node JS](https://nodejs.org/en) `>=24.0` (Krypton)
- [yarn](https://yarnpkg.com/getting-started/install) `>=1.22`

## How to set up and run (Docker)

Easiest way to set up the project to use it right away.

### Requirements:

- [Docker](https://www.docker.com/) installed and running
- [opensesame-back](https://github.com/macolmenerori/opensesame-back) set up and running (can be in Docker too)

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`
2. Generate the Docker image

```
docker build -t opensesame-front:latest .
```

3. Run the Docker image

```
docker run --env-file .env -p 3000:3000 --name opensesame-front opensesame-front
```

## How to set up and run (Native)

For feature-testing and development.

### Requirements:

- Node JS
- yarn

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`
2. Install packages `yarn install`
3. Run the dev environment `yarn start`

## Configuration

```
NODE_ENV=production # The environment, leave 'production' for usage and 'development' for dev

BASE_URL_API=http://localhost:8080/api # URL of opensesame-back API
```
