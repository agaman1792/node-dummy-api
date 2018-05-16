const faker = require('faker');

const { ArrayRandomValue, Range } = require('../utilities/random');
const { IsArray, IsObject } = require('../utilities/type-checks');

const DEFAULT_ARRAY_SIZE = 10;

/* jshint ignore:start */
function CreateObject(model) {
  return Object.keys(model).reduce((acc, key) => {
    const value = model[key];

    if (FakerCanGenerate(value))
      return {
        [key]: faker.fake(value),
        ...acc
      };

    if (IsArray(value))
      return {
        [key]: HandleArrayValue(value),
        ...acc
      };

    if (IsObject(value))
      return {
        [key]: CreateObject(value),
        ...acc
      };

    return acc;
  }, {});
}
/* jshint ignore:end */

function FakerCanGenerate(value) {
  if (!value || typeof value !== 'string')
    return false;

  try {
    return !!faker.fake(value);
  } catch(e) {
    return false;
  }
}

function HandleArrayValue(value) {
  const [ model, size ] = value;
  let mapper = () => false;

  if (FakerCanGenerate(model))
    return Range(size || DEFAULT_ARRAY_SIZE).map(() => faker.fake(model));

  if (IsArray(model))
    return Range(size || DEFAULT_ARRAY_SIZE).map(() => HandleArrayValue(model));

  if (IsObject(model))
    return Range(size || DEFAULT_ARRAY_SIZE).map(() => CreateObject(model));

  return Range(size || DEFAULT_ARRAY_SIZE).map(mapper);
}

module.exports = {
  CreateObject
};