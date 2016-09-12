"use strict";
var AlertModel = (function () {
    function AlertModel() {
        this.show = false;
        this.type = "success";
        this.closeButton = false;
        this.duration = 5;
    }
    AlertModel.prototype.showAlert = function (type, title, message, closeButton, autoClose, duration) {
        this.show = true;
        this.type = type;
        this.title = title;
        this.message = message;
        this.closeButton = closeButton;
        this.autoClose = autoClose;
        this.duration = duration;
    };
    AlertModel.prototype.hideAlert = function () {
        this.show = false;
    };
    return AlertModel;
}());
exports.AlertModel = AlertModel;
//# sourceMappingURL=alert.model.js.map