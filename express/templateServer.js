function checkDependencyInjection(di) {
  di = di || {};
  di.express = di.express || require("express");
  di.bodyParser = require("body-parser");
  di.compression = require("compression");
  di.methodOverride = require("method-override");
  di.uncapitalize = require("express-uncapitalize");
  di.responseTime = require("response-time");

  return di;
}

module.exports = (di) => {
  di = checkDependencyInjection(di);

  var server = di.express();
  server.use(di.bodyParser.json());
  server.use(di.compression());
  server.use(di.methodOverride());
  server.use(di.uncapitalize());
  server.use(di.responseTime());
  return server;
}
