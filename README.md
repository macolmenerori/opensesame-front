# opensesame-front

Front part of opensesame project, an authentication service.

Manage users and assign them roles and permissions to perform certain actions.

## Requirements

- [opensesame-back](https://github.com/macolmenerori/opensesame-back) set up and running
- [Node JS](https://nodejs.org/en) `>=24.0` (Krypton)
- [pnpm](https://pnpm.io/installation)

## How to set up and run (Demo)

A Docker Compose setup is included to run the **full stack** (MongoDB + auth service + frontend) with a single command, pre-loaded with a demo admin user.

1. Clone the repository:

   ```bash
   git clone https://github.com/macolmenerori/opensesame-front.git
   cd opensesame-front/docker
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

3. Open `http://localhost` and log in with:
   - **Email:** `admin@admin.com`
   - **Password:** `administrator`

The compose stack includes:

| Service            | Port  | Description                   |
| ------------------ | ----- | ----------------------------- |
| `opensesame-db`    | 27017 | MongoDB with seeded demo data |
| `opensesame-back`  | 8080  | Authentication API            |
| `opensesame-front` | 80    | Frontend (Nginx)              |

> To reset the data, run `docker compose down` and start again.

## How to set up and run (Docker)

Easiest way to set up the project to use it right away.

### Requirements

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
docker run --env-file .env -p 80:80 --name opensesame-front opensesame-front
```

## How to set up and run (Native)

For feature-testing and development.

### Requirements

- Node JS
- pnpm

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`
2. Install packages `pnpm install`
3. Run the dev environment `pnpm start`

## Configuration

```
NODE_ENV=production # The environment, leave 'production' for usage and 'development' for dev

BASE_URL_API=http://localhost:8080/api # URL of opensesame-back API
```
