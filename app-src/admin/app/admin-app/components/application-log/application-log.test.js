"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var application_log_service_1 = require('./application-log.service');
var application_log_model_1 = require('./application-log.model');
var application_log_list_component_1 = require("./application-log-list.component");
var Rx_1 = require("rxjs/Rx");
var testing_1 = require('@angular/core/testing');
var shared_module_1 = require("../../../shared/shared.module");
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
        testing_1.TestBed.configureTestingModule({
            imports: [shared_module_1.SharedModule],
            declarations: [application_log_list_component_1.ApplicationLogComponent],
            providers: [
                { provide: application_log_service_1.ApplicationLogService, useClass: MockService }
            ]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('should get the list of application log when authenticated', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(application_log_list_component_1.ApplicationLogComponent);
        fixture.detectChanges();
        var component = fixture.debugElement.componentInstance;
        expect(component.showModal).toBe(false);
        expect(component.objResponse.dataList.length).toBeGreaterThan(0);
        expect(component.objResponse.dataList[0].addedBy).toBe("system");
    }));
    it('should get the show the application log detail clicked on show detail', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(application_log_list_component_1.ApplicationLogComponent);
        fixture.detectChanges();
        var component = fixture.debugElement.componentInstance;
        var compiled = fixture.debugElement.nativeElement;
        compiled.querySelector('td a.fa-eye').click();
        expect(component.showModal).toBe(true);
    }));
});
//# sourceMappingURL=application-log.test.js.map