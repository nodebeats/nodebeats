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
var common_1 = require("@angular/common");
var router_deprecated_1 = require('@angular/router-deprecated');
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent(_router) {
        var _this = this;
        this._router = _router;
        this._router.subscribe(function (routeUrl) {
            var instructions = [];
            _this._router.recognize(routeUrl).then(function (instruction) {
                instructions.push(instruction);
                while (instruction.child) {
                    instruction = instruction.child;
                    instructions.push(instruction);
                }
                _this.breadcrumbsCollection = instructions
                    .map(function (inst, index) {
                    return {
                        displayName: inst.component.routeData.get('displayName'),
                        as: inst.component.routeData.get('name'),
                        terminal: inst.component.terminal,
                        linkParams: _this._getLinkParams(instructions, index)
                    };
                });
            });
        });
    }
    BreadcrumbsComponent.prototype._getLinkParams = function (instructions, until) {
        var _this = this;
        var linkParams = [];
        instructions.forEach(function (item, index) {
            var component = item.component;
            if (index <= until) {
                linkParams.push(component.routeData.get('name'));
                if (!_this._isEmpty(component.params)) {
                    linkParams.push(component.params);
                }
            }
        });
        return linkParams;
    };
    BreadcrumbsComponent.prototype._isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    BreadcrumbsComponent = __decorate([
        core_1.Component({
            selector: 'breadcrumbs',
            template: "\n    <div *ngFor=\"let route of breadcrumbsCollection\">\n    \t<a \n    \t\thref=\"\" \n    \t\t\n    \t\t*ngIf=\"route.terminal\"\n    \t\t[routerLink]=\"route.linkParams\">\n    \t\t{{ route.displayName }}\n    \t</a>\n    \t\n    \t<span *ngIf=\"!route.terminal\">{{ route.displayName }}</span>\n    </div>\t\n\t",
            directives: [
                router_deprecated_1.ROUTER_DIRECTIVES,
                common_1.NgFor,
                common_1.NgIf
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object])
    ], BreadcrumbsComponent);
    return BreadcrumbsComponent;
    var _a;
}());
exports.BreadcrumbsComponent = BreadcrumbsComponent;
//# sourceMappingURL=breacumb2.component.js.map