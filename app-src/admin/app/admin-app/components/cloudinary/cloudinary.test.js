"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cloudinary_service_1 = require('./cloudinary.service');
var cloudinary_model_1 = require('./cloudinary.model');
var Rx_1 = require("rxjs/Rx");
var testing_1 = require('@angular/core/testing');
var shared_module_1 = require("../../../shared/shared.module");
var cloudinary_component_1 = require("./cloudinary.component");
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
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [shared_module_1.SharedModule],
            declarations: [cloudinary_component_1.CloudinarySettingComponent],
            providers: [
                { provide: cloudinary_service_1.CloudinaryService, useClass: MockService }
            ]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('should save/update the cloudinary setting if valid ', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(cloudinary_component_1.CloudinarySettingComponent);
        fixture.detectChanges();
        var component = fixture.debugElement.componentInstance;
        var compiled = fixture.debugElement.nativeElement;
        component.cloudinaryForm.controls.cloudinaryApiKey.patchValue("123");
        component.cloudinaryForm.controls.cloudinaryCloudName.patchValue("abc");
        component.cloudinaryForm.controls.cloudinaryApiSecret.patchValue("123");
        expect(compiled.querySelector('button.btn')).not.toBeNull();
        expect(component.cloudinaryForm.valid).toBe(true);
        //fixture.detectChanges();
        expect(component.isPost).toBeUndefined();
    }));
    it('should get the cloudinary setting if already saved', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(cloudinary_component_1.CloudinarySettingComponent);
        fixture.detectChanges();
        var component = fixture.debugElement.componentInstance;
        expect(component.objCloudinary._id).toBeDefined();
        expect(component.cloudinaryForm.valid).toBe(true);
    }));
});
//# sourceMappingURL=cloudinary.test.js.map