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
var Menu = (function () {
    function Menu(el, domHandler, renderer, router) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
    }
    Menu.prototype.ngAfterViewInit = function () {
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
    Menu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    Menu.prototype.show = function (event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    Menu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    Menu.prototype.itemClick = function (event, item) {
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
        if (this.popup) {
            this.hide();
        }
        if (item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    };
    Menu.prototype.ngOnDestroy = function () {
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
    Menu.prototype.hasSubMenu = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    };
    Menu.prototype.unsubscribe = function (item) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Menu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Menu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Menu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menu.prototype, "styleClass", void 0);
    Menu = __decorate([
        core_1.Component({
            selector: 'p-menu',
            template: "\n        <div [ngClass]=\"{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"preventDocumentDefault=true\">\n            <ul class=\"ui-menu-list ui-helper-reset\">\n                <template ngFor let-submenu [ngForOf]=\"model\" *ngIf=\"hasSubMenu()\">\n                    <li class=\"ui-widget-header ui-corner-all\"><h3>{{submenu.label}}</h3></li>\n                    <li *ngFor=\"let item of submenu.items\" class=\"ui-menuitem ui-widget ui-corner-all\">\n                        <a #link [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==hoveredItem}\"\n                            (mouseenter)=\"hoveredItem=$event.target\" (mouseleave)=\"hoveredItem=null\" (click)=\"itemClick($event, item)\">\n                            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </template>\n                <template ngFor let-item [ngForOf]=\"model\" *ngIf=\"!hasSubMenu()\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\">\n                        <a #link [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==hoveredItem}\"\n                            (mouseenter)=\"hoveredItem=$event.target\" (mouseleave)=\"hoveredItem=null\" (click)=\"itemClick($event, item)\">\n                            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </template>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, router_1.Router])
    ], Menu);
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map