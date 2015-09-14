var test = require("tape");
var objectGenerator = require("../../generators/object")();

var helpers = require("../helpers");

test("objectGenerator module should expose a factory function with the dependency injection as parameter", (t) => {
  t.plan(1);
  t.equal(typeof require("../../generators/object"), "function");
});

test("objectGenerator should be a (generator) function", (t) => {
  t.plan(1);
  t.equal(typeof objectGenerator, "function");
});

test("objectGenerator should return an object with the same keys as the model specified as a parameter", (t) => {
  var model = {
    address: "address",
    details: {
      name: "name"
    }
  };
  t.plan(1);
  var it = objectGenerator(model);
  var val = it.next().value;
  t.equal(helpers.getSortedKeysAsString(val), helpers.getSortedKeysAsString(model));
});
