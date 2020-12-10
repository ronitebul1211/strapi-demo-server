module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "3e5ce6f1c6112a6eabb8dd540cd56f00"),
    },
  },
  cron: { enabled: true },
});
