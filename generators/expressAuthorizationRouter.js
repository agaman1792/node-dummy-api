// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var express = injector.get("express");
var config = injector.get("../core/config");

function xpAuthRouterGenerator(di) {
  var router = new express.Router();
  var configEnabled = config.get().server.authorization.enabled || false;
  var configToken = config.get().server.authorization.token || false;

  if (configEnabled) {
    router.use((req, res, next) => {
      if (!configToken) {
        return next();
      }
      if (req.headers.token === configToken) {
        next();
      }
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid authorization"
      });
    });
  }

  return router;
}

module.exports = function* generator() {
  while(true) {
    yield xpAuthRouterGenerator();
  }
}
