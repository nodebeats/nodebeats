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
var splitbuttonitem_1 = require('./splitbuttonitem');
var domhandler_1 = require('../dom/domhandler');
var router_1 = require('@angular/router');
var SplitButton = (function () {
    function SplitButton(el, domHandler, renderer, router) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.iconPos = 'left';
        this.onClick = new core_1.EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngOnInit = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.menuVisible = false;
        });
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.onDropdownClick = function (event, menu, container) {
        this.menuVisible = !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu, 25);
        event.stopPropagation();
    };
    SplitButton.prototype.onItemClick = function (event, item) {
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        this.hoveredItem = null;
        item.onClick.emit(event);
        if (item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    };
    SplitButton.prototype.ngOnDestroy = function () {
        this.documentClickListener();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "iconPos", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SplitButton.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButton.prototype, "menuStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "menuStyleClass", void 0);
    __decorate([
        core_1.ContentChildren(splitbuttonitem_1.SplitButtonItem), 
        __metadata('design:type', core_1.QueryList)
    ], SplitButton.prototype, "items", void 0);
    SplitButton = __decorate([
        core_1.Component({
            selector: 'p-splitButton',
            template: "\n        <div #container [ngClass]=\"'ui-splitbutton ui-buttonset ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-left\"\n                [ngClass]=\"{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),\n                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),\n                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}\"\n                (mouseenter)=\"hoverDefaultBtn=true\" (mouseleave)=\"hoverDefaultBtn=false\"  (focus)=\"focusDefaultBtn=true\" (blur)=\"focusDefaultBtn=false\"\n                (mousedown)=\"activeDefaultBtn=true\" (mouseup)=\"activeDefaultBtn=false\" (click)=\"onDefaultButtonClick($event)\">\n                <span [ngClass]=\"'ui-button-icon-left ui-c fa fa-fw'\" [class]=\"icon\"></span>\n                <span class=\"ui-button-text ui-c\">{{label}}</span>\n            </button>\n            <button class=\"ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right\" type=\"button\"\n                [ngClass]=\"{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}\"\n                (mouseenter)=\"hoverDropdown=true\" (mouseleave)=\"hoverDropdown=false\" (focus)=\"focusDropdown=true\" (blur)=\"focusDropdown=false\"\n                (mousedown)=\"activeDropdown=true\" (mouseup)=\"activeDropdown=false\" (click)=\"onDropdownClick($event,menu,container)\">\n                <span class=\"ui-button-icon-left ui-c fa fa-fw fa-caret-down\"></span>\n                <span class=\"ui-button-text ui-c\">ui-button</span>\n            </button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of items\"\n                        (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                        <a [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"onItemClick($event,item)\" [ngClass]=\"{'ui-state-hover':(hoveredItem==item)}\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, router_1.Router])
    ], SplitButton);
    return SplitButton;
}());
exports.SplitButton = SplitButton;
//# sourceMappingURL=splitbutton.js.map