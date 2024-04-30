# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

# Prisma

> Tutorial: https://www.youtube.com/watch?v=ESShhQmBjjY

```
$  npm install prisma --save-dev
$  npx prisma init
$  npx prisma generate
$  npx prisma migrate dev --name init
$  npm run dev
$  node --version


✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.
```

Prisma + MongoDB

```
$  npm install prisma typescript ts-node @types/node --save-dev
$  npm install @prisma/client
$  npm init -y
$  npx prisma db push
```

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

#### Next steps:

1. Set the PRISMA_DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
