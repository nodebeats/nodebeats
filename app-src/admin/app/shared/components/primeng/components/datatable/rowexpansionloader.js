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
var RowExpansionLoader = (function () {
    function RowExpansionLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    RowExpansionLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], RowExpansionLoader.prototype, "template", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RowExpansionLoader.prototype, "rowData", void 0);
    RowExpansionLoader = __decorate([
        core_1.Component({
            selector: 'p-rowExpansionLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], RowExpansionLoader);
    return RowExpansionLoader;
}());
exports.RowExpansionLoader = RowExpansionLoader;
//# sourceMappingURL=rowexpansionloader.js.map