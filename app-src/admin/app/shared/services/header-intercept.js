"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var general_config_1 = require("../configs/general.config");
var HeaderIntercept = (function (_super) {
    __extends(HeaderIntercept, _super);
    function HeaderIntercept() {
        _super.call(this);
        var token = general_config_1.Config.getAuthToken();
        if (token)
            this.headers.append('Authorization', token);
        this.headers.append('Content-Type', 'application/json');
    }
    return HeaderIntercept;
}(http_1.BaseRequestOptions));
exports.HeaderIntercept = HeaderIntercept;
//# sourceMappingURL=header-intercept.js.map