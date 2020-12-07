module.exports = {
  load: {
    before: ["responseTime", "logger", "cors", "responses"],
    after: ["parser", "router", "serverError"],
  },
  settings: {
    serverError: {
      enabled: true,
    },
  },
};
