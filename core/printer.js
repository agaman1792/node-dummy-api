var chalk = require("chalk");
var moment = require("moment");
var config = require("./config");

function print(what) {
  what = what || {};
  var color = what.color || "white";
  var message = what.message || "";
  console.log(colorMixin(color)(message));
}

function colorMixin(color) {
  if (!chalk[color]) {
    throw new Error("Color not supported!");
  }
  return chalk[color];
}

function osDetailsPrinter() {
  var os = require("os");
  var uptime = os.uptime();
  uptime = moment(uptime).format("HH:mm:ss");

  print({color: "yellow", message: "Listing operating system details below"});
  print({color: "yellow", message: `Hostname: ${os.hostname()}`});
  print({color: "yellow", message: `Type:     ${os.type()}`});
  print({color: "yellow", message: `Arch:     ${os.arch()}`});
  print({color: "yellow", message: `Release:  ${os.release()}`});
  print({color: "yellow", message: `Uptime:   ${uptime}`});
  print();
}

function serverConfigurationPrinter() {
  var cfg = config.get();
  var connectionAddress = (cfg.server.security.enabled) ? "https://localhost:" : "http://localhost:";
  connectionAddress += cfg.server.general.ports[0];
  connectionAddress += cfg.server.general.prefix;

  print({color: "yellow", message: `Using the ${config.strategyUsed}`});
  print({color: "yellow", message: `Api prefix:   ${cfg.server.general.prefix}`});
  print({color: "yellow", message: `Port:         ${cfg.server.general.ports[0]}`});
  print({color: "yellow", message: `Secure:       ${cfg.server.security.enabled}`});
  print({color: "yellow", message: `Auth enabled: ${cfg.server.authorization.enabled}`});
  print({color: "yellow", message: `Url:          ${connectionAddress}`});
  print();
}

function serverEndpointDetailsPrinter() {
  print({color: "yellow", message: "Listing server endpoint details below"});
  var cfg = config.get();
  cfg.api.routes.forEach((route) => {
    print({color: "yellow", message: `Route ${route.path} (get, post, put, delete)... [OK]`});
  });
  print();
}

function creditsNStuffPrinter() {
  var cfg = config.get();
  var pck = require("../package.json");
  var securedText = (cfg.server.security.enabled) ? "(secured)" : "";

  print({color: "yellow", message: "If you have any ideas about how to make this utility better, feel free to: "});
  print({color: "yellow", message: " * Send me an e-mail: alex.gaman@yahoo.com"});
  print({color: "yellow", message: " * Grab the code, materialize your idea and send a pull request: https://github.com/tzoky07/dummy-api"});
  print({color: "yellow", message: " * Write it on a piece of paper and ask a pidgeon to bring it to me"});
  print({color: "gray", message: `Listening on port ${cfg.server.general.ports[0]} ${securedText}`});
  print({color: "gray", message: `Press CTRL + C to kill the server`});
  print({color: "gray", message: `App version: ${pck.version}`});
}

module.exports = (what) => {
  if (what.osDetails) { osDetailsPrinter(); }
  if (what.serverConfig) { serverConfigurationPrinter(); }
  if (what.serverEndpoints) { serverEndpointDetailsPrinter(); }
  if (what.credits) { creditsNStuffPrinter(); }
};
