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
var domhandler_1 = require('../dom/domhandler');
var router_1 = require('@angular/router');
var MenubarSub = (function () {
    function MenubarSub(domHandler, router) {
        this.domHandler = domHandler;
        this.router = router;
    }
    MenubarSub.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = ++domhandler_1.DomHandler.zindex;
            if (this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '0px';
            }
            else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    };
    MenubarSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    MenubarSub.prototype.itemClick = function (event, item) {
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
        this.activeItem = null;
        this.activeLink = null;
    };
    MenubarSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenubarSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MenubarSub.prototype, "root", void 0);
    MenubarSub = __decorate([
        core_1.Component({
            selector: 'p-menubarSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw\" *ngIf=\"child.items\" [ngClass]=\"{'fa-caret-down':root,'fa-caret-right':!root}\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-menubarSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [MenubarSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, router_1.Router])
    ], MenubarSub);
    return MenubarSub;
}());
exports.MenubarSub = MenubarSub;
var Menubar = (function () {
    function Menubar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    Menubar.prototype.unsubscribe = function (item) {
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
    Menubar.prototype.ngOnDestroy = function () {
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
    ], Menubar.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Menubar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menubar.prototype, "styleClass", void 0);
    Menubar = __decorate([
        core_1.Component({
            selector: 'p-menubar',
            template: "\n        <div [ngClass]=\"{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\"></p-menubarSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [MenubarSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], Menubar);
    return Menubar;
}());
exports.Menubar = Menubar;
//# sourceMappingURL=menubar.js.map