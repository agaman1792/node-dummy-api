const ArrayRandomValue = (arr) => arr[Random(0, arr.length - 1)];

const Range = (max, min = 0) => {
  const arr = [];
  for (let index = min; index < max; index++) {
    arr.push(index);
  }
  return arr;
}

const Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  ArrayRandomValue, Range, Random
};