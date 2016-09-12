"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require("@angular/http");
var application_log_service_1 = require('./application-log.service');
var application_log_model_1 = require('./application-log.model');
var application_log_list_component_1 = require("./application-log-list.component");
var Rx_1 = require("rxjs/Rx");
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var browser_directives_1 = require('../../../../app-config/platform/browser-directives');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var MockService = (function (_super) {
    __extends(MockService, _super);
    function MockService() {
        _super.call(this, null);
        this.objResponse = new application_log_model_1.ApplicationLogResponse();
        this.objModel = new application_log_model_1.ApplicationLogModel();
        this.objModel._id = "123456abcdef";
        this.objModel.errorMessage = "error";
        this.objModel.errorNotified = false;
        this.objModel.errorStack = "detail on error";
        this.objModel.errorType = "syntax error";
        this.objModel.addedBy = "system";
        this.objResponse.currentPage = 1;
        this.objResponse.totalItems = 1;
        this.objResponse.dataList = [this.objModel];
    }
    MockService.prototype.getApplicationLog = function (perPage, currentPage, startDate, endDate) {
        return Rx_1.Observable.of(this.objResponse);
    };
    ;
    MockService.prototype.deleteAllLog = function () {
        this.objResponse.dataList = [];
        return Rx_1.Observable.of({
            success: true,
            message: 'log deleted'
        });
    };
    return MockService;
}(application_log_service_1.ApplicationLogService));
describe('Application Log', function () {
    beforeEach(function () {
        testing_1.addProviders([
            forms_1.FormBuilder,
            forms_2.disableDeprecatedForms(),
            forms_2.provideForms(),
            http_1.HTTP_PROVIDERS,
            browser_directives_1.DIRECTIVES
        ]);
    });
    it('should get the list of application log when authenticated', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb.overrideProviders(application_log_list_component_1.ApplicationLogComponent, [
            { provide: application_log_service_1.ApplicationLogService, useClass: MockService }
        ])
            .createAsync(application_log_list_component_1.ApplicationLogComponent).then(function (fixture) {
            fixture.detectChanges();
            var component = fixture.debugElement.componentInstance;
            expect(component.showModal).toBe(false);
            expect(component.objResponse.dataList.length).toBeGreaterThan(0);
            expect(component.objResponse.dataList[0].addedBy).toBe("system");
        });
    })));
    it('should get the show the application log detail clicked on show detail', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb.overrideProviders(application_log_list_component_1.ApplicationLogComponent, [
            { provide: application_log_service_1.ApplicationLogService, useClass: MockService }
        ])
            .createAsync(application_log_list_component_1.ApplicationLogComponent).then(function (fixture) {
            fixture.detectChanges();
            var component = fixture.debugElement.componentInstance;
            var compiled = fixture.debugElement.nativeElement;
            compiled.querySelector('td a.fa-eye').click();
            expect(component.showModal).toBe(true);
        });
    })));
});
//# sourceMappingURL=application-log-spec.js.map