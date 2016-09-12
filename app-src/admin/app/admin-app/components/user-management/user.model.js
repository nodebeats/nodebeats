"use strict";
var UserModel = (function () {
    function UserModel() {
        this.twoFactorAuthEnabled = false;
        this.userRole = "admin";
        this.active = false;
        this.securityQuestion = "";
    }
    return UserModel;
}());
exports.UserModel = UserModel;
var UserResponse = (function () {
    function UserResponse() {
        this.currentPage = 1;
        this.totalItems = 0;
    }
    return UserResponse;
}());
exports.UserResponse = UserResponse;
var UserSecurityModel = (function () {
    function UserSecurityModel() {
        this.securityQuestion = "";
    }
    return UserSecurityModel;
}());
exports.UserSecurityModel = UserSecurityModel;
var UserSettingModel = (function () {
    function UserSettingModel() {
        this.twoFactorAuthEnabled = false;
    }
    return UserSettingModel;
}());
exports.UserSettingModel = UserSettingModel;
//# sourceMappingURL=user.model.js.map