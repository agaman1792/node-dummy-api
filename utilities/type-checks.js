const IsArray = (value) => Array.isArray(value);
const IsObject = (value) => value !== null && typeof value === 'object';

module.exports = {
  IsArray, IsObject
};