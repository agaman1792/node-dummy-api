const https = require('https');
const express = require('express');

const authentication = require('./authentication');
const data = require('./data');
const middleware = require('./middleware');

const { SafeReadFile } = require('../utilities');
const config = require('../config').server;

const server = data(authentication(middleware(express())));

function StartHttp(cb) {
  server.listen(config.port, config.host, cb);
}

function StartHttps(cb) {
  const key = SafeReadFile(config.security.key);
  const cert = SafeReadFile(config.security.cert);

  if (!key)
    throw new Error('In order to run in ssl mode, the config.server.security.key path must be set');

  if (!cert)
    throw new Error('In order to run in ssl mode, the config.server.security.cert path must be set')

  https.createServer({key, cert})
       .listen(config.port, config.host, cb);
}

function StartServer(cb) {
  if (config.security.enabled) {
    StartHttps(cb && cb(config));
  }
  else {
    StartHttp(cb && cb(config));
  }
}

module.exports = {
  StartServer
};