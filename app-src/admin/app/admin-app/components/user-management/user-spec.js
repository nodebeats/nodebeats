"use strict";
var user_service_1 = require("./user.service");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var header_intercept_1 = require('../../../shared/services/header-intercept');
require('rxjs/Rx');
var testing_1 = require('@angular/core/testing');
testing_1.describe('User Management', function () {
    testing_1.beforeEachProviders(function () { return [user_service_1.UserService, http_1.HTTP_PROVIDERS, core_1.provide(http_1.RequestOptions, { useClass: header_intercept_1.HeaderIntercept })]; });
    testing_1.it('Should get Userlist', testing_1.inject([user_service_1.UserService], function (service) {
        var perPage = 5;
        var current = 1;
        service.getUserList(perPage, current).subscribe(function (res) {
            testing_1.expect(res.dataList.length).toBeGreaterThan(0);
        });
    }));
});
//# sourceMappingURL=user-spec.js.map