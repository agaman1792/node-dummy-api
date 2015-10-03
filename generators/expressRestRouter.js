// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var bodyParser = injector.get("body-parser");
var express = injector.get("express");
var lodash = injector.get("lodash");
var db = injector.get("../core/db");

function validateBody(body, model) {
  Object.keys(body).forEach((bodyKey) => {
    if (!model[bodyKey]) {
      throw new Error(`Key ${bodyKey} not defined in the model!`);
    }
  });
  return body;
}

function handleError(res, e) {
  res.status(400).json({success: false, error: true, message: e.message});
}

function createRouter(name, model) {
  var _ = lodash;
  var router = new express.Router();
  router.use(bodyParser.json());
  db.generate(name, model);

  // Get all
  router.get("", (req, res) => {
    function filter(model) {

    }

    return res.status(200).json(db.get(name));
  });

  // Get one
  router.get("/:id", (req, res) => {
    function filter(model) {
      return model.id === parseInt(req.params.id, 10);
    }

    try {
      res.status(200).json(db.get(name, filter));
    } catch (e) {
      handleError(res, e);
    }
  });

  // Create one
  router.post("", (req, res) => {
    try {
      res.status(200).json(db.create(name, validateBody(req.body, model)));
    } catch(e) {
      handleError(res, e);
    }
  });

  // Update one
  router.put("/:id", (req, res) => {
    try {
      res.status(200).json(db.update.byId(name, parseInt(req.params.id, 10), validateBody(req.body, model)));
    } catch(e) {
      handleError(res, e);
    }
  });

  // Delete one
  router.delete("/:id", (req, res) => {
    try {
      res.status(200).json(db.remove.byId(name, parseInt(req.params.id, 10)));
    } catch(e) {
      handleError(res, e);
    }
  });

  return router;
}

module.exports = function* expressRestRouterGenerator(name, model) {
  while(true) {
    yield createRouter(name, model);
  }
}
