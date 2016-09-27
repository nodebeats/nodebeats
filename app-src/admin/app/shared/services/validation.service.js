"use strict";
/**
 * Created by sanedev on 4/12/16.
 */
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (code, customValue) {
        var config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
            'mismatchedPasswords': 'Password didn\'t match',
            'minValue': 'Value must be greater than ' + customValue,
            'maxValue': 'Value must be less than ' + customValue,
            'invalidUrl': 'Invalid URL',
            'num': "Only digit is allowed"
        };
        return config[code];
    };
    ValidationService.numberWithDecimalValidator = function (control) {
        var num = control.value;
        var regex = /^(\d|\.)*$/;
        if (num && !(regex.test(num))) {
            return {
                'num': { valid: false }
            };
        }
        return null;
    };
    ;
    ValidationService.numberValidator = function (control) {
        var num = control.value;
        var regex = /^[0-9]*$/;
        if (num && !(regex.test(num))) {
            return {
                'num': { valid: false }
            };
        }
        return null;
    };
    ;
    ValidationService.minValueValidator = function (minvalue) {
        return function (control) {
            var num = +control.value;
            if (isNaN(num) || num < minvalue) {
                return {
                    'minValue': { valid: false, value: minvalue }
                };
            }
            return null;
        };
    };
    ;
    ValidationService.maxValueValidator = function (maxvalue) {
        return function (control) {
            var num = +control.value;
            if (isNaN(num) || num > maxvalue) {
                return {
                    'maxValue': { valid: false, value: maxvalue }
                };
            }
            return null;
        };
    };
    ;
    ValidationService.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        var regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        if (control.value && !(control.value.match(regex))) {
            return { 'invalidCreditCard': true };
        }
        else {
            return null;
        }
    };
    ValidationService.urlValidator = function (control) {
        // RFC 2822 compliant regex
        var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        if (control.value && !(control.value.match(regex))) {
            return { 'invalidUrl': true };
        }
        else {
            return null;
        }
    };
    ValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        var regex = /^\S[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if ((control.value && !control.value.match(regex))) {
            return { 'invalidEmailAddress': true };
        }
        else {
            return null;
        }
    };
    ValidationService.passwordValidator = function (control) {
        // {8,}           - Assert password is atleast 8  characters
        // (?=.*[0-9])       - Assert a string has at least one number
        var regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (control.value && regex.test(control.value)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    ValidationService.passwordStrengthValidator = function (control) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (control.value && strongRegex.test(control.value)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    ValidationService.tinyMceRequired = function () {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        //  var regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
        if (tinymce.activeEditor)
            var text = tinymce.activeEditor.getContent({
                format: 'text'
            });
        if (text !== "") {
            return null;
        }
        else {
            return { 'required': true };
        }
    };
    ValidationService.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    };
    ValidationService.documentValidation = function (file, allowedExt, allowedSizeInMB) {
        var fileName = file.name;
        var fileSize = file.size;
        var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
        var validExt = allowedExt.map(function (row) {
            return row.toLowerCase();
        });
        var fileLimit = 1024 * 1024 * allowedSizeInMB; // 1 MB
        return (validExt.indexOf(fileExt) != -1 && fileSize <= fileLimit);
    };
    ValidationService.imageValidation = function (file, allowedExt, allowedSize) {
        var fileName = file.name;
        var fileSize = file.size;
        var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
        var validExt = allowedExt.map(function (row) {
            return row.toLowerCase();
        });
        var fileLimit = 1024 * 1024 * allowedSize; // 1 MB
        return (allowedExt.indexOf(fileExt) != -1 && fileSize <= fileLimit);
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map