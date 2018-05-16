const ArrayRandomValue = (arr) => arr[Random(0, arr.length - 1)];

const Range = (max, min = 0) => [...Array(max - min).keys()];

const Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  ArrayRandomValue, Random, Range
};