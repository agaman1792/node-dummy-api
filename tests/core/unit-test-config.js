var test = require("tape");
var config = require("../../core/config");

var helpers = require("../helpers");

var defaultConfig = {
	server: {
		authorization: {
			enabled: true,
			type: ["basic", "token"],
			value: {
				username: "agaman",
				password: "12345",
				token: "12345"
			}
		},
		general: {
			ports: [8080],
			prefix: "/api",
			loglevel: "trace"
		},
		security: {
			secure: true,
			cert: "",
			key: ""
		}
	},
	api: {
		configFilePath: "",
		modelsPath: "",
		routes: [{
	    path: "/address",
	    model: {
	      address: "address",
	      city: "city",
	     	country: "country"
	    }
	  }]
	}
};

test("config core module should expose a #get() method in order to get the config object", (t) => {
  t.plan(1);
  t.equal(typeof config.get, "function");
});

test("the configuration object should contain the keys specified in the defaultConfig", (t) => {
  t.plan(1);
  var cfg = config.get();
  t.equal(helpers.getSortedKeysAsString(cfg), helpers.getSortedKeysAsString(defaultConfig));
});
