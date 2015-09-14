function eachKey(obj, cb) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
        cb(property, obj[property]);
    }
  }
}

function checkDependencyInjection(di) {
  di = di || {};
  di.valueFactory = di.valueFactory || require("../factories/value");

  return di;
}

function createObject(model, di) {
  var obj = {};
  eachKey(model, (key, val) => {
    if (typeof val === "object") {
      obj[key] = createObject(val, di);
    }
    if (typeof val === typeof "") {
      obj[key] = di.valueFactory(val);
    }
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
