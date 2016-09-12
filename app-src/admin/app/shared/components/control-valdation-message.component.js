"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var validation_service_1 = require('../services/validation.service');
var FormControlMessages = (function () {
    function FormControlMessages() {
    }
    Object.defineProperty(FormControlMessages.prototype, "errorMessage", {
        get: function () {
            // Find the control in the Host (Parent) form
            //  console.log(this._formDir);
            //  let c = this._formDir.find(this.controlName);
            //  let c = this.form.find(this.controlName);
            // console.log(this.form);
            for (var propertyName in this.controlName.errors) {
                // If control has a error
                if (this.controlName.errors.hasOwnProperty(propertyName) && (this.controlName.touched || this.isSubmitted)) {
                    // Return the appropriate error message from the Validation Service
                    return validation_service_1.ValidationService.getValidatorErrorMessage(propertyName, this.controlName.errors[propertyName]['value']);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FormControlMessages.prototype, "isSubmitted", void 0);
    FormControlMessages = __decorate([
        core_1.Component({
            selector: 'control-messages',
            inputs: ['controlName: control'],
            template: "<div *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], FormControlMessages);
    return FormControlMessages;
}());
exports.FormControlMessages = FormControlMessages;
//# sourceMappingURL=control-valdation-message.component.js.map