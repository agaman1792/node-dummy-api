const { Router } = require('express');

const db = require('../db');

const RouterFactory = (data) => {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).json(data);
  });

  return router;
};

const routers = Object.keys(db).map(key => ({
  path: key,
  value: RouterFactory(db[key])
}));

const ApiRouter = Router();
routers.forEach(router => ApiRouter.use(router.path, router.value));

module.exports = (app) => {
  app.use('/api', ApiRouter);
  return app;
}