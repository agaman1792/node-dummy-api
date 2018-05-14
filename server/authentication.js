const { Router } = require('express');
const config = require('../config').server.authentication;

const PerformAuthorization = (req, res, next) => {
  const enabled = config.enabled;
  const token = config.token;
  const headerToken = req.headers.token;

  if (!enabled || !token) return next();
  if (token === headerToken) return next();

  return res.status(401).json({
    success: false,
    message: `Invalid authorization token`
  });
};

module.exports = (app) => {
  app.use(PerformAuthorization);
  return app;
}