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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var TieredMenuSub = (function () {
    function TieredMenuSub(domHandler, router, location) {
        this.domHandler = domHandler;
        this.router = router;
        this.location = location;
    }
    TieredMenuSub.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = ++domhandler_1.DomHandler.zindex;
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    };
    TieredMenuSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    TieredMenuSub.prototype.itemClick = function (event, item) {
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
    TieredMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TieredMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TieredMenuSub.prototype, "root", void 0);
    TieredMenuSub = __decorate([
        core_1.Component({
            selector: 'p-tieredMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-tieredMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-tieredMenuSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [TieredMenuSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, router_1.Router, common_1.Location])
    ], TieredMenuSub);
    return TieredMenuSub;
}());
exports.TieredMenuSub = TieredMenuSub;
var TieredMenu = (function () {
    function TieredMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    TieredMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        if (this.popup) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    TieredMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    TieredMenu.prototype.show = function (event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    TieredMenu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    TieredMenu.prototype.unsubscribe = function (item) {
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
    TieredMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.documentClickListener();
        }
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
    ], TieredMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TieredMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TieredMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TieredMenu.prototype, "styleClass", void 0);
    TieredMenu = __decorate([
        core_1.Component({
            selector: 'p-tieredMenu',
            template: "\n        <div [ngClass]=\"{'ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\"></p-tieredMenuSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [TieredMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], TieredMenu);
    return TieredMenu;
}());
exports.TieredMenu = TieredMenu;
//# sourceMappingURL=tieredmenu.js.map