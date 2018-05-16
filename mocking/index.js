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
        ...acc,
        [key]: faker.fake(value)
      };

    if (IsArray(value))
      return {
        ...acc,
        [key]: HandleArrayValue(value)
      };

    if (IsObject(value))
      return {
        ...acc,
        [key]: CreateObject(value)
      };

    return acc;
  }, {
    id: faker.random.uuid()
  });
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