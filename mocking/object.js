const CanApply = (value) => {
  if (value !== null && typeof value === 'object')
    return true;

  return false;
};

module.exports = {
  CanApply
};