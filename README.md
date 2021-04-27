# auth0-nestjs-sample

Inspired By:
- [NestJS](https://docs.nestjs.com/security/authentication)
- [Medium](https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f/)
- [LogRocket](https://blog.logrocket.com/containerized-development-nestjs-docker/)
- [Auth0](https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/)
- [WarzoneAI](https://warzone.ai/)

## Get Started

In your terminal:
```shell
# install dependencies
yarn

# create env file
cp .env.example .env
```

Set the auth0 environment variables in `.env` to match your Auth0 tenant's domain and api audience

In your terminal:
```shell
# create initial local db migration
yarn typeorm:migration:generate init

# run migration for local db
yarn typeorm:migration:run

# start local api
yarn compose

# hard restart local api (when installing new packages, etc.)
yarn compose:build
```

Attach your VS Code debugger using the `nestjs-postgres-sample` configuration in the debug tab
Access your Database at `127.0.0.1/5432`
Access your API at `127.0.0.1/8081`