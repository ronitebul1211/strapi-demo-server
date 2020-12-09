module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          if (err.code === "23505") {
            // ctx.send({ message: "Custom Message" }, 500);
            ctx.body = {
              error: "unique key",
            };
            console.log(err);
          } else {
            throw err;
          }
        }
      });
    },
  };
};
