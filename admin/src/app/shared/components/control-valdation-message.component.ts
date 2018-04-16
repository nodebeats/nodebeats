import {Component, Host, Input} from '@angular/core';
import {ValidationService} from '../services/validation.service';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'control-messages',
    inputs: ['controlName: control'],
    template: `<div class="validation-error" *ngIf="errorMessage !== null">{{errorMessage}}</div>`

})
export class FormControlMessages {
    controlName:FormControl;
    @Input() isSubmitted:boolean;

    constructor() {
    }

    get errorMessage() {
        // Find the control in the Host (Parent) form
        //  console.log(this._formDir);
        //  let c = this._formDir.find(this.controlName);
        //  let c = this.form.find(this.controlName);
        // console.log(this.form);
        for (let propertyName in this.controlName.errors) {
            // If control has a error
            if (this.controlName.errors.hasOwnProperty(propertyName) && ( this.controlName.touched || this.isSubmitted )) {
                // Return the appropriate error message from the Validation Service
                return ValidationService.getValidatorErrorMessage(propertyName, this.controlName.errors[propertyName]['value']);
            }
        }

        return null;
    }
}