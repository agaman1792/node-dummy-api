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
    const obj = req.body;
    db[path].push(obj);
    res.status(200).json(obj);
  });

  router.put('/:id', (req, res) => {
    const idx = db[path].findIndex(x => x.id === req.params.id);

    if (idx === -1) return res.status(204).send();

    db[path][idx] = req.body;
    db[path][idx].id = req.params.id;
    return res.status(200).json(db[path[idx]]);
  });

  router.delete(':/id', (req, res) => {
    const idx = db[path].findIndex(x => x.id === req.params.id);

    if (idx === -1) return res.status(204).send();

    const removed = db[path][index].splice(idx, 1);
    return res.status(200).json(removed);
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