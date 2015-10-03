var dependencies = {};

function register(key, value) {
  dependencies[key] = value;
}

function get(key) {
  return dependencies[key] || require(key);
}

module.exports = {
  register: register,
  get: get
};
