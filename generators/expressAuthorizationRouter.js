function checkDependencyInjection(di) {
  di = di || {};
  di.express = di.express || require("express");
  di.config = di.config || require("../core/config");
  return di;
}

function getConfigParameters(cfg) {
  cfg.server.authorization = cfg.server.authorization || {};
  return {
    enabled: cfg.server.authorization.enabled || false,
    basic: cfg.server.authorization.basic || {username: false, password: false},
    token: cfg.server.authorization.token || {value: false}
  };
}

function getAuthParamsFromRequest(req) {
  return {
    username: req.headers.username || "",
    password: req.headers.password || "",
    token: req.headers.token || ""
  }
}

var testAuth = {
  basic: (cfgParams, authParams) => {
    if (!cfgParams.basic.username ||
          (cfgParams.basic.username === authParams.username
           && cfgParams.basic.password === authParams.password)) {
      return true;
    }
    return false;
  },
  token: (cfgParams, authParams) => {
    if (!cfgParams.token || cfgParams.token.value === authParams.token) {
      return true;
    }
    return false;
  }
}

function xpAuthRouterGenerator(di) {
  var router = new di.express.Router();
  var cfg = getConfigParameters(di.config.get());

  if (cfg.enabled) {
    router.use((req, res, next) => {
      var authParams = getAuthParamsFromRequest(req);
      if (!testAuth.basic(cfg, authParams)) {
        return res.status(401).end();
      }
      if (!testAuth.token(cfg, authParams)) {
        return res.status(401).end();
      }
      next();
    });
  }

  return router;
}

module.exports = (di) => {
  di = checkDependencyInjection(di);

  function* generator() {
    while(true) {
      yield xpAuthRouterGenerator(di);
    }
  }

  return generator;
}
