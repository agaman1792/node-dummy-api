const { ArrayRandomValue, Range } = require('../utilities');

const FakerStrategy = require('./faker');
const ObjectStrategy = require('./object');

function CreateObject(model) {
  let generated = {};

  for (let key in model) {
    const value = model[key];

    if (FakerStrategy.CanApply(value)) {
      generated[key] = FakerStrategy.Apply(value);
    }

    // TODO: Fix this messy implementation (3 levels of recursion for objects)
    if (ObjectStrategy.CanApply(value)) {
      generated[key] = Object.keys(value).reduce((acc, curr) => {
        if (ObjectStrategy.CanApply(value[curr])) {
          acc[curr] = Object.keys(value[curr]).reduce((_acc, _curr) => {
            _acc[_curr] = FakerStrategy.Apply(value[curr][_curr]);
            return _acc;
          }, {});
        } else {
          acc[curr] = FakerStrategy.Apply(value[curr]);
        }

        return acc;
      }, {});
    }
  }

  return generated;
}

module.exports = {
  CreateObject
};