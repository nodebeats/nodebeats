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
var Column = (function () {
    function Column() {
        this.sortFunction = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "editable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "filterMatchMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Column.prototype, "rowspan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Column.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Column.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "hidden", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "expander", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Column.prototype, "sortFunction", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        core_1.Component({
            selector: 'p-column',
            template: ""
        }), 
        __metadata('design:paramtypes', [])
    ], Column);
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=column.js.map