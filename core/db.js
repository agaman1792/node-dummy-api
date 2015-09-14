var defaults = {
  generatedValues: 100
};

function checkDependencyInjection(di) {
  di = di || {};
  di.dbObject = di.dbObject || {};
  di.lodash = di.lodash || require("lodash");
  di.objectGenerator = di.objectGenerator || require("../generators/object")();
  return di;
}

module.exports = (di) => {
  di = checkDependencyInjection(di);
  var _ = di.lodash;
  return {
    defaults,
    generate: (name, model) => {
      di.dbObject[name] = [];
      var iterator = di.objectGenerator(model);
      var aux;
      _.range(defaults.generatedValues).forEach(function(index) {
        aux = iterator.next().value;
        aux.id = index;
        di.dbObject[name].push(aux);
      });
    },
    get: (name) => {
      return di.dbObject[name];
    },
    removeById: (name, id) => {
      di.dbObject[name] = _.filter(di.dbObject[name], (obj) => {return obj.id !== id});
    },
    reset: (name) => {
      di.dbObject[name] = [];
    },
    updateById: (name, id, values) => {
      di.dbObject[name] = di.dbObject[name].map((obj) => {
        if (obj.id === id) {
          return _.defaults(values, obj);
        }
        return obj;
      });
    }
  }
}
