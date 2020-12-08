```
module.exports = strapi => {
  return {
    initialize() {  // can also be async
      strapi.app.use(async (ctx, next) => {
        // await someAsyncCode()

        await next();

        // await someAsyncCode()
      });
    },
  };
};
```

- **initialize (function):** Called during the server boot.
- to create a middleware -> . / middlewares folder  
  at the root of your project and put the middlewares into it.
- To configure the middlewares of your application,  
  you need to create or edit the . / config / middleware.js file in your Strapi app.  
  To define a load order, create or edit the file
- Create your custom middleware. Path — ./middlewares/mid_name/index.js
- Enable the middleware in environments settings, Load a middleware (config / middleware.js)

```
module.exports = {
  load: {
    before: ['!mid_name!', 'responseTime', 'logger', 'cors', 'responses', 'gzip'],
    order: [
      "Define the middlewares' load order by putting their name in this array is the right order",
    ],
    after: ['parser', 'router'],
  },
  settings: {
    !mid_name!: {
      enabled: true,
    },
  },
};

```

message: { id: `${pluginId}.error.record.fetch` },

```

\my-project\node_modules\strapi-plugin-content-manager\admin\src\containers\EditViewDataManagerProvider\index.js
```
