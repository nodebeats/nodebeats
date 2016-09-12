var appConfigRootPath = __dirname + "/app-src/admin/app-config";
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require(appConfigRootPath + '/webpack.prod');
        break;
    case 'test':
    case 'testing':
        module.exports = require(appConfigRootPath + '/webpack.test');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require(appConfigRootPath + '/webpack.dev');
}