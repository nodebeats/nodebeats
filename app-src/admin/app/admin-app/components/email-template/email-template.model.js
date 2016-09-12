"use strict";
var EmailTemplateModel = (function () {
    function EmailTemplateModel() {
        this.active = false;
        this.templateBody = "";
    }
    return EmailTemplateModel;
}());
exports.EmailTemplateModel = EmailTemplateModel;
var EmailTempalteResponse = (function () {
    function EmailTempalteResponse() {
        this.currentPage = 1;
        this.totalItems = 0;
    }
    return EmailTempalteResponse;
}());
exports.EmailTempalteResponse = EmailTempalteResponse;
//# sourceMappingURL=email-template.model.js.map