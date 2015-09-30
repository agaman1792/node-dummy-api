var chalk = require("chalk");
var moment = require("moment");
var config = require("./config");

function colorMixin(color) {
  if (!chalk[color]) {
    throw new Error("Color not supported!");
  }
  return chalk[color];
}

function print(what) {
  what = what || {};
  var color = what.color || "white";
  var message = what.message || "";
  console.log(colorMixin(color)(message));
}

var colors = {
  header: "cyan",
  body: "blue"
};

function osDetailsPrinter() {
  var os = require("os");
  var uptime = os.uptime();
  uptime = moment(uptime).format("HH:mm:ss");

  print({color: colors.header, message: "*** OS details ***"});
  print({color: colors.body, message: `Hostname: ${os.hostname()}`});
  print({color: colors.body, message: `Type:     ${os.type()}`});
  print({color: colors.body, message: `Arch:     ${os.arch()}`});
  print({color: colors.body, message: `Release:  ${os.release()}`});
  print();
}

function serverConfigurationPrinter() {
  var cfg = config.get();
  var baseUrl = (cfg.server.security.enabled) ? "https://localhost:" : "http://localhost:";
  baseUrl += cfg.server.general.ports[0];
  baseUrl += cfg.server.general.prefix;

  print({color: colors.header, message: `*** Configuration details ***`});
  print({color: colors.body, message: `Using the ${cfg.strategyUsed}`});
  print({color: colors.body, message: `Api prefix:   ${cfg.server.general.prefix}`});
  print({color: colors.body, message: `Port:         ${cfg.server.general.ports[0]}`});
  print({color: colors.body, message: `Secure:       ${cfg.server.security.enabled}`});
  print({color: colors.body, message: `Auth enabled: ${cfg.server.authorization.enabled}`});
  print({color: colors.body, message: `Url:          ${baseUrl}`});
  print();
}

function serverEndpointDetailsPrinter() {
  var cfg = config.get();
  var baseUrl = (cfg.server.security.enabled) ? "https://localhost:" : "http://localhost:";
  baseUrl += cfg.server.general.ports[0];
  baseUrl += cfg.server.general.prefix;

  print({color: colors.header, message: "*** Api endpoints ***"});
  cfg.api.routes.forEach((route) => {
    print({color: colors.body, message: `Route ${route.path} (get, post, put, delete)... [OK]`});
    print({color: colors.body, message: ` * Base endpoint: ${baseUrl + route.path}`});
  });
  print();
}

function creditsNStuffPrinter() {
  var cfg = config.get();
  var pck = require("../package.json");
  var securedText = (cfg.server.security.enabled) ? "(secured)" : "";

  print({color: colors.header, message: "*** Other stuff ***"});
  print({color: colors.body, message: "If you have any ideas about how to make this utility better, feel free to: "});
  print({color: colors.body, message: " * Send me an e-mail: alex.gaman@yahoo.com"});
  print({color: colors.body, message: " * Grab the code, materialize your idea and send a pull request: https://github.com/tzoky07/dummy-api"});
  print({color: colors.body, message: `If you see something annoying, this is the best place to say it: ${pck.bugs.url}`});
  print();
  print({color: colors.body, message: `Listening on port ${cfg.server.general.ports[0]} ${securedText}`});
  print({color: colors.body, message: `App version: ${pck.version}`});
  print({color: colors.body, message: `Press CTRL + C to kill the server`});
}

module.exports = (what) => {
  if (what.osDetails) { osDetailsPrinter(); }
  if (what.serverConfig) { serverConfigurationPrinter(); }
  if (what.serverEndpoints) { serverEndpointDetailsPrinter(); }
  if (what.credits) { creditsNStuffPrinter(); }
};
