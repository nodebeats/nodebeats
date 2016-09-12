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
var MegaMenu = (function () {
    function MegaMenu(el, domHandler, renderer, router) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.orientation = 'horizontal';
    }
    MegaMenu.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var submenu = item.children[0].nextElementSibling;
        if (submenu) {
            submenu.style.zIndex = ++domhandler_1.DomHandler.zindex;
            if (this.orientation === 'horizontal') {
                submenu.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                submenu.style.left = '0px';
            }
            else if (this.orientation === 'vertical') {
                submenu.style.top = '0px';
                submenu.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    };
    MegaMenu.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    MegaMenu.prototype.itemClick = function (event, item) {
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
    MegaMenu.prototype.unsubscribe = function (item) {
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
    MegaMenu.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    MegaMenu.prototype.getColumnClass = function (menuitem) {
        var length = menuitem.items ? menuitem.items.length : 0;
        var columnClass;
        switch (length) {
            case 2:
                columnClass = 'ui-grid-col-6';
                break;
            case 3:
                columnClass = 'ui-grid-col-4';
                break;
            case 4:
                columnClass = 'ui-grid-col-3';
                break;
            case 6:
                columnClass = 'ui-grid-col-2';
                break;
            default:
                columnClass = 'ui-grid-col-12';
                break;
        }
        return columnClass;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MegaMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MegaMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "orientation", void 0);
    MegaMenu = __decorate([
        core_1.Component({
            selector: 'p-megaMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}\">\n            <ul class=\"ui-menu-list ui-helper-reset\">\n                <template ngFor let-category [ngForOf]=\"model\">\n                    <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':category.items,'ui-menuitem-active':item==activeItem}\"\n                        (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                        <a #link class=\"ui-menuitem-link ui-corner-all ui-submenu-link\" [ngClass]=\"{'ui-state-hover':link==activeLink}\">\n                            <span class=\"ui-submenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-down':orientation=='horizontal','fa-caret-right':orientation=='vertical'}\"></span>\n                            <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"category.icon\"></span>\n                            {{category.label}}\n                        </a>\n                        <div class=\"ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow\">\n                            <div class=\"ui-grid\">\n                                <div class=\"ui-grid-row\">\n                                    <template ngFor let-column [ngForOf]=\"category.items\">\n                                        <div [class]=\"getColumnClass(category)\">\n                                            <template ngFor let-submenu [ngForOf]=\"column\">\n                                                <ul class=\"ui-menu-list ui-helper-reset\">\n                                                    <li class=\"ui-widget-header ui-corner-all\"><h3>{{submenu.label}}</h3></li>\n                                                    <li *ngFor=\"let item of submenu.items\" class=\"ui-menuitem ui-widget ui-corner-all\">\n                                                        <a #link [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==hoveredItem}\"\n                                                            (mouseenter)=\"hoveredItem=$event.target\" (mouseleave)=\"hoveredItem=null\" (click)=\"itemClick($event, item)\">\n                                                            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                    </li>\n                                                </ul>\n                                            </template>\n                                        </div>\n                                    </template>\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                </template>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, router_1.Router])
    ], MegaMenu);
    return MegaMenu;
}());
exports.MegaMenu = MegaMenu;
//# sourceMappingURL=megamenu.js.map