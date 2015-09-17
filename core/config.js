var fs = require("fs");
var path = require("path");
var defaultConfig = require("./config-default.json");

var configFileName = ".dummyapi";
var envVarName = "DUMMY_API_CONFIG";

function getCfgFromProjectRoot() {
	try {
		return JSON.parse(fs.readFileSync(process.env.PWD + path.sep + configFileName));
	} catch(e) {
		return false;
	}
}

function getCfgFromEnvironment() {
	try {
		return JSON.parse(process.env[envVarName]);
	} catch(e) {
		return false;
	}
}

function getCfg() {
	var cfg = getCfgFromProjectRoot();
	if (cfg) {
		cfg.strategyUsed = ".dummyapi file from project root directory";
		return cfg;
	}

	cfg = getCfgFromEnvironment();
	if (cfg) {
		cfg.strategyUsed = "DUMMY_API_CONFIG environment variable";
		return cfg;
	}

	cfg = defaultConfig;
	cfg.strategyUsed = "default configuration";
	return cfg;
}

module.exports = {
	get: () => {
		return getCfg();
	}
};
