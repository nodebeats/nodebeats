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
var button_1 = require('../button/button');
var forms_1 = require('@angular/forms');
var CALENDAR_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Calendar; }),
    multi: true
});
var Calendar = (function () {
    function Calendar(el, zone) {
        this.el = el;
        this.zone = zone;
        this.inline = false;
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.hourMin = 0;
        this.hourMax = 23;
        this.minuteMin = 0;
        this.minuteMax = 59;
        this.secondMin = 0;
        this.secondMax = 59;
        this.hourGrid = 0;
        this.minuteGrid = 0;
        this.secondGrid = 0;
        this.icon = 'fa-calendar';
        this.onBlur = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    Calendar.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.calendarElement = this.inline ? jQuery(this.el.nativeElement.children[0]) : jQuery(this.el.nativeElement.children[0].children[0]);
        var options = {
            showAnim: this.showAnim,
            dateFormat: this.dateFormat,
            showButtonPanel: this.showButtonPanel,
            changeMonth: this.monthNavigator,
            changeYear: this.yearNavigator,
            numberOfMonths: this.numberOfMonths,
            showWeek: this.showWeek,
            showOtherMonths: this.showOtherMonths,
            selectOtherMonths: this.selectOtherMonths,
            defaultDate: this.defaultDate,
            minDate: this.minDate,
            maxDate: this.maxDate,
            onSelect: function (dateText) {
                _this.zone.run(function () {
                    _this.value = dateText;
                    _this.onModelChange(_this.value);
                    _this.onSelect.emit(_this.value);
                });
            }
        };
        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        if (this.timeFormat || this.timeOnly) {
            options['timeFormat'] = this.timeFormat;
            options['timeOnly'] = this.timeOnly;
            options['stepHour'] = this.stepHour;
            options['stepMinute'] = this.stepMinute;
            options['stepSecond'] = this.stepSecond;
            options['hourMin'] = this.hourMin;
            options['hourMax'] = this.hourMax;
            options['minuteMin'] = this.minuteMin;
            options['minuteMax'] = this.minuteMax;
            options['secondMin'] = this.secondMin;
            options['secondMax'] = this.secondMax;
            options['hourGrid'] = this.hourGrid;
            options['minuteGrid'] = this.minuteGrid;
            options['secondGrid'] = this.secondGrid;
            options['controlType'] = this.timeControlType;
            options['oneLine'] = this.horizontalTimeControls;
            options['minTime'] = this.minTime;
            options['maxTime'] = this.maxTime;
            options['timezoneList'] = this.timezoneList;
            this.calendarElement.datetimepicker(options);
        }
        else
            this.calendarElement.datepicker(options);
        this.initialized = true;
    };
    Calendar.prototype.onInput = function (event) {
        this.onModelChange(event.target.value);
    };
    Calendar.prototype.handleBlur = function (event) {
        this.value = event.target.value;
        this.onModelTouched();
        this.focused = false;
        this.onBlur.emit(event);
    };
    Calendar.prototype.writeValue = function (value) {
        this.value = value;
    };
    Calendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Calendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Calendar.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.calendarElement.datepicker('option', key, changes[key].currentValue);
            }
        }
    };
    Calendar.prototype.ngOnDestroy = function () {
        this.calendarElement.datepicker('destroy');
        this.calendarElement = null;
        this.initialized = false;
    };
    Calendar.prototype.onButtonClick = function (event, input) {
        input.focus();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "showAnim", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showButtonPanel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "numberOfMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showWeek", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "timeFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "timeOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepHour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepMinute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepSecond", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "timeControlType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "horizontalTimeControls", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "minTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "maxTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Calendar.prototype, "timezoneList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "icon", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "onSelect", void 0);
    Calendar = __decorate([
        core_1.Component({
            selector: 'p-calendar',
            template: "\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"'ui-calendar'\" *ngIf=\"!inline\">\n        <input #in type=\"text\" [attr.placeholder]=\"placeholder\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\"\n                [value]=\"value||''\" (input)=\"onInput($event)\" [readonly]=\"readonlyInput\"\n                [disabled]=\"disabled\" (mouseenter)=\"hovered=true\" (mouseleave)=\"hovered=false\" (focus)=\"focused=true\" (blur)=\"handleBlur($event)\"\n                [ngClass]=\"{'ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,\n                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}\"\n        ><button type=\"button\" [icon]=\"icon\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,in)\" class=\"ui-datepicker-trigger\"></button></span>\n        <div *ngIf=\"inline\"></div>\n    ",
            directives: [button_1.Button],
            providers: [CALENDAR_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], Calendar);
    return Calendar;
}());
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map