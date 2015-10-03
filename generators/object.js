// Load the dependencies injector
var injector = require("../core/dependencyInjector");

var arrayValueFactory = injector.get("../factories/arrayValue");
var valueFactory = injector.get("../factories/value");

function eachKey(obj, cb) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
        cb(property, obj[property]);
    }
  }
}

function createObject(model) {
  var obj = {};

  eachKey(model, (key, value) => {
    // Check if the model key value is a string
    if (typeof value === typeof "") {
      obj[key] = valueFactory(value);
    }

    // Check if variable is an array
    if (Array.isArray(value)) {
      obj[key] = arrayValueFactory(value);
    }

    // Check if the variable is an object.
    // http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
    if (value !== null && typeof value === 'object') {
      obj[key] = createObject(value);
    }
  });

  return obj;
}

module.exports = function* objectGenerator(model) {
  while (true) {
    yield createObject(model);
  }
}
