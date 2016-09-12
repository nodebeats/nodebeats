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
var ContextMenuSub = (function () {
    function ContextMenuSub(domHandler, router) {
        this.domHandler = domHandler;
        this.router = router;
    }
    ContextMenuSub.prototype.onItemMouseEnter = function (event, item) {
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
    ContextMenuSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    ContextMenuSub.prototype.itemClick = function (event, item) {
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
    ContextMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContextMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenuSub.prototype, "root", void 0);
    ContextMenuSub = __decorate([
        core_1.Component({
            selector: 'p-contextMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-contextMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-contextMenuSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [ContextMenuSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, router_1.Router])
    ], ContextMenuSub);
    return ContextMenuSub;
}());
exports.ContextMenuSub = ContextMenuSub;
var ContextMenu = (function () {
    function ContextMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    ContextMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.hide();
        });
        this.documentRightClickListener = this.renderer.listenGlobal('body', 'contextmenu', function (event) {
            _this.show(event);
            event.preventDefault();
        });
    };
    ContextMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    };
    ContextMenu.prototype.show = function (event) {
        this.left = event.pageX;
        this.top = event.pageY;
        this.visible = true;
        this.domHandler.fadeIn(this.container, 250);
    };
    ContextMenu.prototype.hide = function () {
        this.visible = false;
    };
    ContextMenu.prototype.unsubscribe = function (item) {
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
    ContextMenu.prototype.ngOnDestroy = function () {
        this.documentClickListener();
        this.documentRightClickListener();
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
    ], ContextMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenu.prototype, "global", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContextMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContextMenu.prototype, "styleClass", void 0);
    ContextMenu = __decorate([
        core_1.Component({
            selector: 'p-contextMenu',
            template: "\n        <div [ngClass]=\"'ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow'\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" [style.display]=\"visible ? 'block' : 'none'\" [style.left.px]=\"left\" [style.top.px]=\"top\">\n            <p-contextMenuSub [item]=\"model\" root=\"root\"></p-contextMenuSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [ContextMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], ContextMenu);
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=contextmenu.js.map