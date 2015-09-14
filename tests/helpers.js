module.exports = {
  getSortedKeysAsString: (obj) => {
    return JSON.stringify(Object.keys(obj).sort());
  }
};
