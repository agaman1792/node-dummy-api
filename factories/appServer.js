function checkDependencyInjection(di) {
  di = di || {};
  di.express = di.express || require("express");
  di.lodash = di.lodash || require("lodash");
  di.config = di.config || require("../core/config");
  di.xpRestRouterGen = di.xpRestRouterGen || require("../generators/expressRestRouter")();
  di.xpAuthRouterGen = di.xpAuthRouterGen || require("../generators/expressAuthorizationRouter")();
  di.templateServer = di.templateServer || require("../express/templateServer")();
  return di;
}

function mapConfigRoutes(di, cfgRoutes) {
  return cfgRoutes.map((route) => {
    var routerIterator = di.xpRestRouterGen(route.path, route.model);
    return {
      path: route.path,
      handler: routerIterator.next().value
    };
  });
}

module.exports = (di) => {
  di = checkDependencyInjection(di);
  var authRouterIterator = di.xpAuthRouterGen();
  var mainRouter = new di.express.Router();

  var routes = mapConfigRoutes(di, di.config.get().api.routes);
  routes.forEach((route) => {
    mainRouter.use(route.path, route.handler);
  });
  di.templateServer.use(authRouterIterator.next().value);
  di.templateServer.use(di.config.get().server.general.prefix, mainRouter);


  return {
    start: (cb) => {
      di.templateServer.listen(8080, cb);
    }
  };
};
