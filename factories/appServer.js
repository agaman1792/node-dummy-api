// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var express = injector.get("express");
var fs = injector.get("fs");
var https = injector.get("https");
var lodash = injector.get("lodash");
var config = injector.get("../core/config");
var xpRestRouterGen = injector.get("../generators/expressRestRouter");
var xpAuthRouterGen = injector.get("../generators/expressAuthorizationRouter");
var templateServer = injector.get("../express/templateServer");

function startHTTP(server, port, cb) {
  server.listen(port, cb);
}

function startHTTPS(server, port, key, cert, cb) {
  key = fs.readFileSync(key);
  cert = fs.readFileSync(cert);

  if (!key || !cert) {
    throw new Error("The 'key' and 'cert' parameters are mandatory!");
  }

  var opts = {
    key: key,
    cert: cert
  };
  https.createServer(opts, server).listen(port, cb);
}

function mapConfigRoutes(cfgRoutes) {
  return cfgRoutes.map((route) => {
    var routerIterator = xpRestRouterGen(route.path, route.model);
    return {
      path: route.path,
      handler: routerIterator.next().value
    };
  });
}

module.exports = function() {
  var authRouterIterator = xpAuthRouterGen();
  var mainRouter = new express.Router();

  var routes = mapConfigRoutes(config.get().api.routes);
  routes.forEach((route) => {
    mainRouter.use(route.path, route.handler);
  });
  templateServer.use(authRouterIterator.next().value);
  templateServer.use(config.get().server.general.prefix, mainRouter);

  return {
    start: (cb) => {
      var security = config.get().server.security.enabled;
      var port = config.get().server.general.port;
      var cert = config.get().server.security.cert;
      var key = config.get().server.security.key;
      if (!security) {
        startHTTP(templateServer, port, cb);
      } else {
        startHTTPS(templateServer, port, key, cert, cb);
      }
    }
  };
};
