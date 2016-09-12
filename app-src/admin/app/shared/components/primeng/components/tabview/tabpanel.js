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
var TabPanel = (function () {
    function TabPanel() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabPanel.prototype, "headerStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "headerStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "leftIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "rightIcon", void 0);
    TabPanel = __decorate([
        core_1.Component({
            selector: 'p-tabPanel',
            template: "\n        <div class=\"ui-tabview-panel ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n        </div>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], TabPanel);
    return TabPanel;
}());
exports.TabPanel = TabPanel;
//# sourceMappingURL=tabpanel.js.map