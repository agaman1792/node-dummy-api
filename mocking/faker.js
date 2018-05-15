const faker = require('faker');

const CanApply = (value) => {
  if (!value)
    return false;

  if (typeof value !== 'string')
    return false;

  try {
    faker.fake(value);
    return true;
  } catch(e) {
    return false;
  }
};

const Apply = (value) => faker.fake(value);

module.exports = {
  Apply, CanApply
}