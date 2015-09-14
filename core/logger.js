var log = require("log4js");

var config = {
  appenders: [{
    type: "console",
    layout: {
      type: "pattern",
      pattern: "[%r][%p][%c] -> %m %n"
    }
  }]
};
log.configure(config, {});

module.exports = log;
