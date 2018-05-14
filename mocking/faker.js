const faker = require('faker');

const CanApply = (value) => {
  if (!value)
    return false;

  if (typeof value !== 'string')
    return false;

  if (!faker.fake[value])
    return false;

  return true;
};

const Apply = (value) => faker.fake(value);

module.exports = {
  Apply, CanApply
}