init process

```
psql -U postgres -h localhost
```

create DB -> Sql shell

```
module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "test"),
        username: env("DATABASE_USERNAME", "postgres"),
        password: env("DATABASE_PASSWORD", "..."),
        schema: "public",
      },
      options: {},
    },
  },
});
```

### To Search in Whole project ->

```
"search.exclude": {
      "**/node_modules": false
   },
   "search.useIgnoreFiles": false
```
