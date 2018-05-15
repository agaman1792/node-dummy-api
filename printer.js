const chalk = require('chalk');
const moment = require('moment');
const os = require('os');

const config = require('./config');
const db = require('./db');
const pck = require('./package.json');

function colorMixin(color) {
  if (!chalk[color]) {
    throw new Error('Color not supported!');
  }
  return chalk[color];
}

function print(color, message) {
  console.log(colorMixin(color || 'white')(message || ''));
}

function printif(color, message, condition) {
  if (condition) print(color, message);
}

const colors = {
  header: 'cyan',
  body: 'blue'
};

let baseUrl = (config.server.security.enabled) ? 'https://' : 'http://';
    baseUrl += `${config.server.host}:${config.server.port}${config.server.prefix}`;

function PrintOsDetails() {
  const uptime = moment(os.uptime()).format('HH:mm:ss');

  print(colors.header, '*** OS details ***');
  print(colors.body, `Hostname: ${os.hostname()}`);
  print(colors.body, `Type:     ${os.type()}`);
  print(colors.body, `Arch:     ${os.arch()}`);
  print(colors.body, `Release:  ${os.release()}`);
  print(colors.body, `Uptime:   ${uptime} (HH:mm:ss)`);
  print();
}

function PrintServerConfiguration() {
  print(colors.header, `*** Configuration details ***`);
  print(colors.body, `Using the ${config.strategy}`);
  print(colors.body, `Api prefix:     ${config.server.prefix}`);
  print(colors.body, `Port:           ${config.server.port}`);
  print(colors.body, `Authentication: ${config.server.authentication.enabled}`);
  print(colors.body, `Secure:         ${config.server.security.enabled}`);
  printif(colors.body, `Key file:       ${config.server.security.key}`, config.server.security.enabled);
  printif(colors.body, `Cert file:      ${config.server.security.cert}`, config.server.security.enabled);
  printif(colors.body, `Auth token:     ${config.server.authentication.token}`, config.server.authentication.enabled && config.server.authentication.token);
  print(colors.body, `Base url:       ${baseUrl}`);
  print();
}

function ServerEndpointDetailsPrinter() {
  print(colors.header, '*** Api endpoints ***');
  config.api.routes.forEach((route) => {
    print(colors.body, `endpoint ${route.path} (${db[route.path].length} entries): get, post, put, delete routes initialized`);
    print(colors.body, `  * List all:        ${baseUrl + route.path}`);
    print(colors.body, `  * List one (42th): ${baseUrl + route.path}/${db[route.path][42].id}`);
  });
  print();
}

function PrintCredits() {
  var securedText = (config.server.security.enabled) ? '(secured)' : '';

  print(colors.header, '*** Other stuff ***');
  print(colors.body, 'If you have any ideas about how to make this utility better, feel free to: ');
  print(colors.body, ' * Send me an e-mail: alex.gaman@yahoo.com');
  print(colors.body, ` * Grab the code, materialize your idea and send a pull request here: ${pck.repository.url}`);
  print(colors.body, ` * Please report issues or improvements here: ${pck.bugs.url}`);
  print(colors.body, ` * Buy me a beer`);
  print();
  print(colors.body, `Running version: ${pck.version}`);
  print(colors.body, `Press CTRL+C to kill the server`);
}

function PrintHomeScreen() {
  PrintOsDetails();
  PrintServerConfiguration();
  ServerEndpointDetailsPrinter();
  PrintCredits();
}

module.exports = {
  PrintHomeScreen
};