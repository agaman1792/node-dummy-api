// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var express = injector.get("express");
var lodash = injector.get("lodash");
var config = injector.get("../core/config");
var xpRestRouterGen = injector.get("../generators/expressRestRouter");
var xpAuthRouterGen = injector.get("../generators/expressAuthorizationRouter");
var templateServer = injector.get("../express/templateServer");

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
      templateServer.listen(config.get().server.general.port, cb);
    }
  };
};
