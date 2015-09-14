var test = require("tape");
var db = require("../../core/db")();

var helpers = require("../helpers");

var tableName = "/=-name0-=/";

test("database core module should expose a factory function with the dependency injection as parameter", (t) => {
  t.plan(1);
  t.equal(typeof require("../../core/db"), "function");
});

test("the database should expose a #get(name) function", (t) => {
  t.plan(1);
  t.equal(typeof db.get, "function");
});

test("the database should expose a #generate(name, model) function", (t) => {
  t.plan(1);
  t.equal(typeof db.generate, "function");
});

test("the database should expose a #reset() function", (t) => {
  t.plan(1);
  t.equal(typeof db.reset, "function");
});

/*
  It should generate #db.defaults.generatedValues results based on the model.
  Depends on #get
  That is what we are testing
 */
test("functionality #generate(name, model)", (t) => {
  t.plan(2);

  var model = {
    id: 0,
    address: "address",
    details: {
      name: {
        first: "name"
      }
    }
  };

  db.generate(tableName, model);
  t.equal(db.get(tableName).size(), db.defaults.generatedValues);
  t.equal(helpers.getSortedKeysAsString(db.get(tableName).first()), helpers.getSortedKeysAsString(model));
});

test("functionality #get(name)", (t) => {
  t.plan(1);
  t.equal(typeof db.get(tableName), "object");
});

test("functionality #reset()", (t) => {
  t.plan(1);
  db.reset(tableName);
  t.equal(db.get(tableName).size(), 0);
});
