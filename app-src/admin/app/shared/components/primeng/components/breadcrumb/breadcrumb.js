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
var router_1 = require('@angular/router');
var Breadcrumb = (function () {
    function Breadcrumb(router) {
        this.router = router;
    }
    Breadcrumb.prototype.itemClick = function (event, item) {
        if (!item.url || item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new core_1.EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit(event);
        }
        if (item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    };
    Breadcrumb.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.eventEmitter) {
                    item.eventEmitter.unsubscribe();
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Breadcrumb.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Breadcrumb.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Breadcrumb.prototype, "styleClass", void 0);
    Breadcrumb = __decorate([
        core_1.Component({
            selector: 'p-breadcrumb',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'\">\n            <ul>\n                <li class=\"fa fa-home\"></li>\n                <template ngFor let-item let-end=\"last\" [ngForOf]=\"model\">\n                    <li role=\"menuitem\">\n                        <a [href]=\"item.url||'#'\" class=\"ui-menuitem-link\" (click)=\"itemClick($event, item)\">\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                    <li class=\"ui-breadcrumb-chevron fa fa-chevron-right\" *ngIf=\"!end\"></li>\n                </template>\n            </ul>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Breadcrumb);
    return Breadcrumb;
}());
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=breadcrumb.js.map