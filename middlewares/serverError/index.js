module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            ctx.send({ message: "Custom Message" }, 500);
          }
        }
      });
    },
  };
};
