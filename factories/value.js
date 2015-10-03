var faker = require("faker");

function isValidProperty(propertyName) {
  return (faker.fake(propertyName)) ? true : false;
}

function get(propertyName) {
  if (!isValidProperty(propertyName)) {
    throw new Error(`Property ${propertyName} invalid!`);
  }
  return faker.fake(propertyName);
}

module.exports = get;
