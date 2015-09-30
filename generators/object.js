function eachKey(obj, cb) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
        cb(property, obj[property]);
    }
  }
}

// TODO: Treat extraArgs as rest parameter
function objectTypeHandler(variable, handlers, extraArgs) {
  var printType = function(v) {console.log(`Variable type is ${(Array.isArray(v)) ? 'array' : typeof v}`); }
  handlers = handlers || {};
  handlers.array = handlers.array || printType;
  handlers.object = handlers.object || printType;
  handlers.string = handlers.string || printType;

  // It would be cool to check from the most particular type towards the general (code logic looks cooler)
  
  // Check if the variable is a string
  if (typeof variable === typeof "") {
    return handlers.string(variable, extraArgs);
  }

  // Check if variable is an array
  if (Array.isArray(variable)) {
    return handlers.array(variable, extraArgs);
  }

  // Check if the variable is an object.
  // http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
  if (variable !== null && typeof variable === 'object') {
    return handlers.object(variable, extraArgs);
  }
}

function checkDependencyInjection(di) {
  di = di || {};
  di.arrayValueFactory = di.arrayValueFactory || require("../factories/arrayValue");
  di.valueFactory = di.valueFactory || require("../factories/value");

  return di;
}

function createObject(model, di) {
  var obj = {};
  var valueFactory = di.valueFactory;
  eachKey(model, (key, val) => {
    obj[key] = objectTypeHandler(val, {
      array: di.arrayValueFactory,
      object: createObject,
      string: di.valueFactory
    }, di);
  });
  return obj;
}

module.exports = (di) => {
  di = checkDependencyInjection(di);

  function* objectGenerator(model) {
    while (true) {
      yield createObject(model, di);
    }
  }

  return objectGenerator;
}
