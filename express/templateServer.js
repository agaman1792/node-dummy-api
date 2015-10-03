// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var express = injector.get("express");
var bodyParser = injector.get("body-parser");
var compression = injector.get("compression");
var methodOverride = injector.get("method-override");
var uncapitalize = injector.get("express-uncapitalize");
var responseTime = injector.get("response-time");

module.exports = (function() {
  var server = express();
  server.use(bodyParser.json());
  server.use(compression());
  server.use(methodOverride());
  server.use(uncapitalize());
  server.use(responseTime());
  return server;
}())
