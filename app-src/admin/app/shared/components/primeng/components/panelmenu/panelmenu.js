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
var PanelMenuSub = (function () {
    function PanelMenuSub(router) {
        this.router = router;
        this.activeItems = [];
    }
    PanelMenuSub.prototype.onClick = function (event, item) {
        if (item.items) {
            var index = this.activeItems.indexOf(item);
            if (index == -1)
                this.activeItems.push(item);
            else
                this.activeItems.splice(index, 1);
            event.preventDefault();
        }
        else {
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
        }
    };
    PanelMenuSub.prototype.isActive = function (item) {
        return this.activeItems.indexOf(item) != -1;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelMenuSub.prototype, "expanded", void 0);
    PanelMenuSub = __decorate([
        core_1.Component({
            selector: 'p-panelMenuSub',
            template: "\n        <ul class=\"ui-menu-list ui-helper-reset\" [style.display]=\"expanded ? 'block' : 'none'\">\n            <li *ngFor=\"let child of item.items\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"{'ui-menu-parent':child.items}\">\n                <a #link [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" \n                    [ngClass]=\"{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-hover':(hoveredLink==link)}\" (click)=\"onClick($event,child)\"\n                    (mouseenter)=\"hoveredLink=link\" (mouseleave)=\"hoveredLink=null\">\n                    <span class=\"ui-panelmenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-right':!isActive(child),'fa-caret-down':isActive(child)}\" *ngIf=\"child.items\"></span>\n                    <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span>\n                    <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                </a>\n                <p-panelMenuSub [item]=\"child\" [expanded]=\"isActive(child)\" *ngIf=\"child.items\"></p-panelMenuSub>\n            </li>\n        </ul>\n    ",
            directives: [PanelMenuSub]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], PanelMenuSub);
    return PanelMenuSub;
}());
exports.PanelMenuSub = PanelMenuSub;
var PanelMenu = (function () {
    function PanelMenu(el) {
        this.el = el;
        this.activeItems = [];
    }
    PanelMenu.prototype.headerClick = function (event, item) {
        var index = this.activeItems.indexOf(item);
        if (index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);
        event.preventDefault();
    };
    PanelMenu.prototype.unsubscribe = function (item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (var _i = 0, _a = item.items; _i < _a.length; _i++) {
                var childItem = _a[_i];
                this.unsubscribe(childItem);
            }
        }
    };
    PanelMenu.prototype.isActive = function (item) {
        return this.activeItems.indexOf(item) != -1;
    };
    PanelMenu.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PanelMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelMenu.prototype, "styleClass", void 0);
    PanelMenu = __decorate([
        core_1.Component({
            selector: 'p-panelMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-panelmenu ui-widget'\">\n            <div *ngFor=\"let item of model\" class=\"ui-panelmenu-panel\">\n                <div tabindex=\"0\" [ngClass]=\"{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-all':!isActive(item),\n                    'ui-state-active ui-corner-top':isActive(item),'ui-state-hover':(item == hoveredItem)}\" (click)=\"headerClick($event,item)\">\n                    <span class=\"ui-panelmenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-right':!isActive(item),'fa-caret-down':isActive(item)}\"></span>\n                    <a [href]=\"item.url||'#'\" [ngClass]=\"{'ui-panelmenu-headerlink-hasicon':item.icon}\"\n                        (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                        <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                        <span>{{item.label}}</span>\n                    </a>\n                </div>\n                <div class=\"ui-panelmenu-content ui-widget-content\" [style.display]=\"isActive(item) ? 'block' : 'none'\">\n                    <p-panelMenuSub [item]=\"item\" [expanded]=\"true\"></p-panelMenuSub>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [PanelMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PanelMenu);
    return PanelMenu;
}());
exports.PanelMenu = PanelMenu;
//# sourceMappingURL=panelmenu.js.map