"use strict";
var protractor_1 = require('protractor');
var AdminPage = (function () {
    function AdminPage() {
    }
    AdminPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    AdminPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return AdminPage;
}());
exports.AdminPage = AdminPage;
//# sourceMappingURL=app.po.js.map