const { readFileSync, existsSync } = require('fs');

function SafeJsonFromFile(path, cb) {
  const content = SafeReadFile(path, cb);
  return content && SafeJsonParse(content, cb);
}

function SafeJsonParse(contents, cb) {
  try {
    return JSON.parse(contents);
  } catch(e) {
    cb && cb(e);
    return false;
  }
}

function SafeReadFile(path, cb) {
  if (!existsSync(path)) {
    cb && cb(`File ${path} does not exist!`);
    return false;
  }

  try {
    return readFileSync(path, 'utf-8');
  } catch(e) {
    cb && cb(e);
    return false;
  }
}

module.exports = {
  SafeJsonFromFile, SafeJsonParse, SafeReadFile
};