"use strict";
var URL;
switch ("development") {
    case "production":
        URL = window.location.protocol + "//" + window.location.host;
        break;
    case "test":
        URL = "localhost://3000";
        break;
    case "development":
    case "default":
        URL = window.location.protocol + "//" + window.location.host;
        break;
}
exports.HOST_URL = URL;
exports.API_URL = exports.HOST_URL + "/api/";
exports.JSON_URL = exports.HOST_URL + '/data/';
//# sourceMappingURL=env.config.js.map