const config = require('./config');
const db = require('./db');
const { CreateObject } = require('./mocking');
const { PrintHomeScreen } = require('./printer');
const { StartServer } = require('./server');

config.api.routes.forEach(route => {
  db[route.path] = [];

  for (let i = 0; i < 100; i++) {
    const value = CreateObject(route.model);
    db[route.path].push(value);
  }
});

PrintHomeScreen();
StartServer();