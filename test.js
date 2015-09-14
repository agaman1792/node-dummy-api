var di;
var ts = require("./express/templateServer")(di);
var rg = require("./generators/expressRouter")(di);

var iterator = rg("asd", {address: "address"});
ts.use("", iterator.next().value);

ts.listen(8080, () => {
  console.log("Listening...");
});
