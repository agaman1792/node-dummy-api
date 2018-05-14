const bodyParser = require('body-parser');
const compression = require('compression');
const responseTime = require('response-time');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(compression());
  app.use(responseTime());
  return app;
};