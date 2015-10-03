// Load the dependencies injector
var injector = require("./dependencyInjector");

var lodash = injector.get("lodash");
var objectGenerator = injector.get("../generators/object")();

var dbObject = {};
var defaults = {
  generatedValues: 100
};

function _firstValidId(name) {
  var takenIds = lodash.pluck(dbObject[name], "id");
  for (var index = 1; index <= dbObject[name].length; index++) {
    if (takenIds.indexOf(index) === -1) {
      return index;
    }
  }
}

function _indexById(name, id) {
  return lodash.indexOf(dbObject[name], (obj) => {
    return obj.id === id;
  })
}

function _idExists(name, id) {
  return lodash.pluck(dbObject[name], "id").indexOf(id) !== -1;
}

function create(name, data) {
  data.id = data.id || _firstValidId(name);
  if (_idExists(name, data.id)) {
    throw new Error("The id already exists in the database");
  }
  dbObject[name].push(data);
  return {
    success: true,
    data: data
  };
}

function generate(name, model) {
  dbObject[name] = [];
  var iterator = objectGenerator(model);
  var aux;
  lodash.range(defaults.generatedValues).forEach(function(index) {
    aux = iterator.next().value;
    aux.id = index;
    dbObject[name].push(aux);
  });
}

function get(name, filter) {
  if (!filter) {
    return dbObject[name];
  }
  return lodash.find(dbObject[name], filter) || (function() {throw new Error("The record was not found in the database")}());
}

function reset(name) {
  dbObject[name] = [];
}

var remove = {
  byId(name, id) {
    if (!_idExists(name, id)) {
      throw new Error("The id does not exist!");
    }
    var removed = get(name, function(o) {
      return o.id === id;
    });
    dbObject[name] = lodash.filter(dbObject[name], (obj) => {return obj.id !== id});
    return {
      success: true,
      removed: removed,
      removedId: removed.id
    }
  }
};

var update = {
  byId(name, id, values) {
    var updatedFields = {};

    if (!_idExists(name, id)) {
      throw new Error("The id does not exist!");
    }
    var index = _indexById(name, id);
    var obj = get(name, function(o) {
      return o.id === id;
    });
    Object.keys(values).forEach((key) => {
      obj[key] = values[key];
      updatedFields[key] = values[key];
    });
    obj.id = id;
    dbObject[name][index] = obj;
    return {
      success: true,
      updated: updatedFields,
      data: obj
    };
  }
};

module.exports = {
  defaults,
  create: create,
  generate: generate,
  get: get,
  reset: reset,
  remove: remove,
  update: update
}
