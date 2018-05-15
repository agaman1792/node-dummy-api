const { Router } = require('express');

const db = require('../db');

const RouterFactory = (path, data) => {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).json(data);
  });

  router.get('/:id', (req, res) => {
    res.status(200).json(db[path].find(x => x.id === req.params.id))
  }); 

  router.post('/', (req, res) => {

  });

  router.put('/:id', (req, res) => {

  });

  router.delete(':/id', (req, res) => {

  });

  return router;
};

const routers = Object.keys(db).map(key => ({
  path: key,
  value: RouterFactory(key, db[key])
}));

const ApiRouter = Router();
routers.forEach(router => ApiRouter.use(router.path, router.value));

module.exports = (app) => {
  app.use('/api', ApiRouter);
  return app;
}