var fs = require("fs");
var path = require("path");

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

module.exports = {
	get: () => {
		return defaultConfig;
	}
};
