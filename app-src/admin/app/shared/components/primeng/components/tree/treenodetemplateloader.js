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
var TreeNodeTemplateLoader = (function () {
    function TreeNodeTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TreeNodeTemplateLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeNodeTemplateLoader.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], TreeNodeTemplateLoader.prototype, "template", void 0);
    TreeNodeTemplateLoader = __decorate([
        core_1.Component({
            selector: 'p-treeNodeTemplateLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TreeNodeTemplateLoader);
    return TreeNodeTemplateLoader;
}());
exports.TreeNodeTemplateLoader = TreeNodeTemplateLoader;
//# sourceMappingURL=treenodetemplateloader.js.map