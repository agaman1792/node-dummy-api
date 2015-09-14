function checkDependencyInjection(di) {
  di = di || {};
  di.bodyParser = require("body-parser");
  di.express = di.express || require("express");
  di.lodash = di.lodash || require("lodash");
  di.db = di.db || require("../core/db")();

  return di;
}

function validateBody(body, model) {
  Object.keys(body).forEach((bodyKey) => {
    if (!model[bodyKey]) {
      throw new Error(`Key ${bodyKey} not defined in the model!`);
    }
  });
}

function idExists(coll, id) {
  id = parseInt(id);
  if (!coll.find((model) => {return model.id === id})) {
    throw new Error(`Id ${id} not found!`);
  }
}

function handleError(res, e) {
  res.status(400).json({success: false, error: true, message: e.message});
  console.log(e);
}

function createRouter(name, model, di) {
  var _ = di.lodash;
  var router = new di.express.Router();
  router.use(di.bodyParser.json());
  // Generate data
  di.db.generate(name, model);
  // Get all
  router.get("", (req, res) => {
    res.status(200).json(di.db.get(name));
  });
  // Get one
  router.get("/:id", (req, res) => {
    var coll = di.db.get(name);
    try {
      var id = parseInt(req.params.id, 10);
      idExists(coll, id);
      res.status(200).json(_.find(coll, (model) => {return model.id === id}));
    } catch (e) {
      handleError(res, e);
    }
  });
  // Create one
  router.post("", (req, res) => {
    try {
      var obj = req.body;
      validateBody(obj, model);
      obj.id = di.db.get(name).length;
      di.db.get(name).push(obj);
      res.status(200).json({success: true, data: obj});
    } catch(e) {
      handleError(res, e);
    }
  });
  // Update one
  router.put("/:id", (req, res) => {
    try {
      var id = parseInt(req.params.id, 10);
      var obj = req.body;
      validateBody(obj, model);
      idExists(di.db.get(name), req.params.id);
      di.db.updateById(name, id, obj);
      res.status(200).json({success: true, data: obj});
    } catch(e) {
      handleError(res, e);
    }
  });
  // Delete one
  router.delete("/:id", (req, res) => {
    try {
      var id = parseInt(req.params.id, 10);
      var obj = req.body;
      validateBody(obj, model);
      idExists(di.db.get(name), id);
      di.db.removeById(name, id);
      res.status(200).json({success: true, removed: id});
    } catch(e) {
      handleError(res, e);
    }
  });

  return router;
}

module.exports = (di) => {
  di = checkDependencyInjection(di);

  function* expressRestRouterGenerator(name, model) {
    while(true) {
      yield createRouter(name, model, di);
    }
  }

  return expressRestRouterGenerator;
}
