"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require("@angular/http");
var cloudinary_service_1 = require('./cloudinary.service');
var cloudinary_model_1 = require('./cloudinary.model');
var cloudinary_component_1 = require("./cloudinary.component");
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
        this.objModel = new cloudinary_model_1.CloudinaryModel();
        this.objModel._id = "123456abcdef";
        this.objModel.cloudinaryApiKey = "12345";
        this.objModel.cloudinaryApiSecret = "secret";
        this.objModel.cloudinaryCloudName = "cloudinay";
    }
    MockService.prototype.saveCloudinarySettings = function (objSave) {
        return Rx_1.Observable.of({
            success: true,
            message: 'data saved successfully'
        });
    };
    ;
    MockService.prototype.getCloudinarySettings = function () {
        return Rx_1.Observable.of(this.objModel);
    };
    return MockService;
}(cloudinary_service_1.CloudinaryService));
describe('Cloudinary settings', function () {
    var builder;
    beforeEach(function () {
        testing_1.addProviders([
            forms_1.FormBuilder,
            forms_2.disableDeprecatedForms(),
            forms_2.provideForms(),
            http_1.HTTP_PROVIDERS,
            browser_directives_1.DIRECTIVES
        ]);
    });
    it('should get the cloudinary setting if already saved', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb.overrideProviders(cloudinary_component_1.CloudinarySettingComponent, [
            { provide: cloudinary_service_1.CloudinaryService, useClass: MockService }
        ])
            .createAsync(cloudinary_component_1.CloudinarySettingComponent).then(function (fixture) {
            fixture.detectChanges();
            var component = fixture.debugElement.componentInstance;
            expect(component.objCloudinary._id).toBeDefined();
            expect(component.cloudinaryForm.valid).toBe(true);
        });
    })));
    it('should save/update the cloudinary setting if valid ', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb.overrideProviders(cloudinary_component_1.CloudinarySettingComponent, [
            { provide: cloudinary_service_1.CloudinaryService, useClass: MockService }
        ])
            .createAsync(cloudinary_component_1.CloudinarySettingComponent).then(function (fixture) {
            fixture.detectChanges();
            var component = fixture.debugElement.componentInstance;
            var compiled = fixture.debugElement.nativeElement;
            component.cloudinaryForm.controls.cloudinaryApiKey.updateValue("123");
            component.cloudinaryForm.controls.cloudinaryCloudName.updateValue("abc");
            component.cloudinaryForm.controls.cloudinaryApiSecret.updateValue("123");
            expect(compiled.querySelector('button.btn')).not.toBeNull();
            expect(component.cloudinaryForm.valid).toBe(true);
            //fixture.detectChanges();
            expect(component.isPost).toBeUndefined();
        });
    })));
});
//# sourceMappingURL=cloudinary-spec.js.map