"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var env_config_1 = require("../configs/env.config");
var FileOperrationService = (function () {
    function FileOperrationService(_http) {
        this._http = _http;
        this.apiRoute = "deletefile";
    }
    FileOperrationService.prototype.deleteFile = function (fileName, orgExt, path, fileType) {
        var body = JSON.stringify({});
        return this._http.delete(env_config_1.API_URL + this.apiRoute + "?filename=" + fileName + "&type=" + fileType + "&orgext=" + orgExt + "&path=" + path)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FileOperrationService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    FileOperrationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FileOperrationService);
    return FileOperrationService;
}());
exports.FileOperrationService = FileOperrationService;
//# sourceMappingURL=fileOperation.service.js.map