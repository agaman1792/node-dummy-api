const server = {
  host: "localhost",
  port: 8080,
  prefix: "/api",
  loglevel: "trace",

  authentication: {
    enabled: false,
    token: "asdf"
  },

  security: {
    enabled: false,
    cert: "",
    key: ""
  }
};

const api = {
  routesPath: `${__dirname}/_default-routes.json`,
  routes: false
};

module.exports = {
  api, server
};