var chance = new (require("chance"))();

function isValidProperty(propertyName) {
  return (chance[propertyName]) ? true : false;
}

function get(propertyName) {
  if (!isValidProperty(propertyName)) {
    throw new Error(`Property ${property} invalid!`);
  }

  return chance[propertyName]();
}

module.exports = get;
