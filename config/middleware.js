module.exports = {
  load: {
    before: ["responseTime", "logger", "cors", "responses"],
    after: ["parser", "router"],
  },
  settings: {
    serverError: {
      enabled: true,
    },
  },
};
