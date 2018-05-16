const faker = require('faker');

const { ArrayRandomValue, Range } = require('../utilities/random');
const { IsArray, IsObject } = require('../utilities/type-checks');

function FakerCanGenerate(value) {
  if (!value || typeof value !== 'string')
    return false;

  try {
    return !!faker.fake(value);
  } catch(e) {
    return false;
  }
}

function CreateObject(model) {
  let generated = {};

  for (let key in model) {
    const value = model[key];

    if (FakerCanGenerate(value))
      generated[key] = faker.fake(value);

    if (IsObject(value))
      generated[key] = CreateObject(value);
  }

  return generated;
}

module.exports = {
  CreateObject
};