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
var OverlayPanel = (function () {
    function OverlayPanel(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.dismissable = true;
        this.onBeforeShow = new core_1.EventEmitter();
        this.onAfterShow = new core_1.EventEmitter();
        this.onBeforeHide = new core_1.EventEmitter();
        this.onAfterHide = new core_1.EventEmitter();
        this.visible = false;
    }
    OverlayPanel.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dismissable) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (!_this.selfClick && !_this.targetEvent) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.targetEvent = false;
            });
        }
    };
    OverlayPanel.prototype.toggle = function (event, target) {
        var currentTarget = (target || event.currentTarget || event.target);
        if (!this.target || this.target == currentTarget) {
            if (this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.target = currentTarget;
    };
    OverlayPanel.prototype.show = function (event, target) {
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.onBeforeShow.emit(null);
        var elementTarget = target || event.currentTarget || event.target;
        var container = this.el.nativeElement.children[0];
        container.style.zIndex = ++domhandler_1.DomHandler.zindex;
        if (this.visible) {
            this.domHandler.absolutePosition(container, elementTarget);
        }
        else {
            this.visible = true;
            this.domHandler.absolutePosition(container, elementTarget);
            this.domHandler.fadeIn(container, 250);
        }
        this.onAfterShow.emit(null);
    };
    OverlayPanel.prototype.hide = function () {
        if (this.visible) {
            this.onBeforeHide.emit(null);
            this.visible = false;
            this.onAfterHide.emit(null);
        }
    };
    OverlayPanel.prototype.onPanelClick = function () {
        if (this.dismissable) {
            this.selfClick = true;
        }
    };
    OverlayPanel.prototype.onCloseClick = function (event) {
        this.hide();
        if (this.dismissable) {
            this.selfClick = true;
        }
        event.preventDefault();
    };
    OverlayPanel.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        this.target = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OverlayPanel.prototype, "dismissable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OverlayPanel.prototype, "showCloseIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OverlayPanel.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OverlayPanel.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OverlayPanel.prototype, "onBeforeShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OverlayPanel.prototype, "onAfterShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OverlayPanel.prototype, "onBeforeHide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OverlayPanel.prototype, "onAfterHide", void 0);
    OverlayPanel = __decorate([
        core_1.Component({
            selector: 'p-overlayPanel',
            template: "\n        <div [ngClass]=\"'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            [style.display]=\"visible ? 'block' : 'none'\" (click)=\"onPanelClick()\">\n            <div class=\"ui-overlaypanel-content\">\n                <ng-content></ng-content>\n            </div>\n            <a href=\"#\" *ngIf=\"showCloseIcon\" class=\"ui-overlaypanel-close ui-state-default\" [ngClass]=\"{'ui-state-hover':hoverCloseIcon}\"\n                (mouseenter)=\"hoverCloseIcon=true\" (mouseleave)=\"hoverCloseIcon=false\" (click)=\"onCloseClick($event)\"><span class=\"fa fa-fw fa-close\"></span></a>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], OverlayPanel);
    return OverlayPanel;
}());
exports.OverlayPanel = OverlayPanel;
//# sourceMappingURL=overlaypanel.js.map