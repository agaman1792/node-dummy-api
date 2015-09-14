var fs = require("fs");
var path = require("path");

var strategyUsed = "default hardcoded configuration";

var defaultConfig = {
	server: {
		authorization: {
			enabled: true,
			basic: {
				username: "",
				password: ""
			},
			token: {
				value: ""
			}
		},
		general: {
			ports: [8080],
			prefix: "/api",
			loglevel: "trace"
		},
		security: {
			enabled: true,
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

module.exports = {
	get: () => {
		return defaultConfig;
	},
	strategyUsed
};
