#!/usr/bin/env node
var server = require("../factories/appServer")();
var printer = require("../core/printer");

printer({
  osDetails: true,
  serverConfig: true,
  serverEndpoints: true
});
server.start(() => {
  printer({credits: true});
});
