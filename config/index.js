const { sep } = require('path');
const { SafeJsonFromFile, SafeJsonParse, SafeReadFile } = require('../utilities/serialization');

const defaultConfig = require('./default');

const CONFIG_FILE_NAME = '.dummyapi';
const ENV_VAR_NAME = 'DUMMY_API_CONFIG';

function getCfgFromProjectRoot() {
	const dir = process.env.PWD + sep + CONFIG_FILE_NAME;
	return SafeJsonFromFile(dir);
}

function getCfgFromEnvironment() {
	const contents = process.env[ENV_VAR_NAME];
	return SafeJsonParse(contents);
}

let exportedConfig = defaultConfig;
const projectRootConfig = getCfgFromProjectRoot();
const environmentConfig = getCfgFromEnvironment();

if (projectRootConfig) {
	exportedConfig.strategy = `${CONFIG_FILE_NAME} config file located at ${process.env.PWD + sep + CONFIG_FILE_NAME}`;
	exportedConfig = { ...exportedConfig, ...projectRootConfig };
}

if (!projectRootConfig && environmentConfig) {
	exportedConfig.strategy = `${ENV_VAR_NAME} environment variable`;
	exportedConfig = { ...exportedConfig, ...projectRootConfig };
}

if (!projectRootConfig && !environmentConfig) {
	exportedConfig.strategy = `default configuration`;
}

if (exportedConfig.api.routesPath) {
	exportedConfig.api.routes = SafeJsonFromFile(exportedConfig.api.routesPath, (e) => {throw e;});
}

module.exports = exportedConfig;