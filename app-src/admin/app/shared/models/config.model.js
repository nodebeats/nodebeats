"use strict";
//import 'cloudinary';
//declare var cloudinary:any;
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
var Config = (function () {
    function Config() {
    }
    Config.AuthToken = window.localStorage.getItem("NodeBeatAuthToken");
    Config.Cloudinary = cloudinary.Cloudinary.new({ cloud_name: "bitsbeat-it-solution" });
    Config.DefaultAvatar = exports.HOST_URL + "/img/defaults/default_avatar.png";
    Config.DefaultImage = exports.HOST_URL + "/img/defaults/default_img.png";
    Config.DefaultWideImage = exports.HOST_URL + "/img/defaults/default_wide_img.png";
    Config.InvalidImage = exports.HOST_URL + "/img/defaults/invalid_image.png";
    Config.LoginImage = exports.HOST_URL + '/img/SB-admin.png';
    Config.GoogleAuthImage = exports.HOST_URL + '/img/google_auth_silver.png';
    return Config;
}());
exports.Config = Config;
(function (ImageCanvasSizeEnum) {
    ImageCanvasSizeEnum[ImageCanvasSizeEnum["small"] = 0] = "small";
    ImageCanvasSizeEnum[ImageCanvasSizeEnum["medium"] = 1] = "medium";
    ImageCanvasSizeEnum[ImageCanvasSizeEnum["wide"] = 2] = "wide";
})(exports.ImageCanvasSizeEnum || (exports.ImageCanvasSizeEnum = {}));
var ImageCanvasSizeEnum = exports.ImageCanvasSizeEnum;
//# sourceMappingURL=config.model.js.map