var test = require("tape");
var valueFactory = require("../../factories/value");

test("value factory should expose a function", (t) => {
  t.plan(1);
  t.equal(typeof valueFactory, "function");
});

test("value factory should throw an error when an invalid property is specified", (t) => {
  t.plan(1);
  t.throws(() => {
    valueFactory("PROPERTY-THAT-DOES-NOT-WORK");
  });
});

test("value factory should return a non null value when a vaid property is specified", (t) => {
  t.plan(1);
  t.doesNotThrow(() => {
    valueFactory("name");
  });
});
