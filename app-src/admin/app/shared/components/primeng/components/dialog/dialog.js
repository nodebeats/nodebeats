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
var common_1 = require('../common');
var Dialog = (function () {
    function Dialog(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.draggable = true;
        this.resizable = true;
        this.minWidth = 150;
        this.minHeight = 150;
        this.closeOnEscape = true;
        this.closable = true;
        this.onBeforeShow = new core_1.EventEmitter();
        this.onAfterShow = new core_1.EventEmitter();
        this.onBeforeHide = new core_1.EventEmitter();
        this.onAfterHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this._visible) {
                this.onBeforeShow.emit({});
                if (!this.positionInitialized) {
                    this.center();
                    this.positionInitialized = true;
                }
                this.el.nativeElement.children[0].style.zIndex = ++domhandler_1.DomHandler.zindex;
                if (this.showEffect == 'fade')
                    this.domHandler.fadeIn(this.el.nativeElement.children[0], 250);
                this.shown = true;
            }
            if (this.modal) {
                if (this._visible)
                    this.enableModality();
                else
                    this.disableModality();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.contentContainer = this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');
        if (this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
                _this.onDrag(event);
            });
        }
        if (this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
                _this.onResize(event);
            });
            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', function (event) {
                if (_this.resizing) {
                    _this.resizing = false;
                }
            });
        }
        if (this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', function (event) {
                _this.center();
            });
        }
        if (this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', function (event) {
                if (event.which == 27) {
                    if (_this.el.nativeElement.children[0].style.zIndex == domhandler_1.DomHandler.zindex) {
                        _this.hide(event);
                    }
                }
            });
        }
    };
    Dialog.prototype.ngAfterViewChecked = function () {
        if (this.shown) {
            this.onAfterShow.emit({});
            this.shown = false;
        }
    };
    Dialog.prototype.center = function () {
        var container = this.el.nativeElement.children[0];
        var elementWidth = this.domHandler.getOuterWidth(container);
        var elementHeight = this.domHandler.getOuterHeight(container);
        if (elementWidth == 0 && elementHeight == 0) {
            container.style.visibility = 'hidden';
            container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(container);
            elementHeight = this.domHandler.getOuterHeight(container);
            container.style.display = 'none';
            container.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = (viewport.width - elementWidth) / 2;
        var y = (viewport.height - elementHeight) / 2;
        container.style.left = x + 'px';
        container.style.top = y + 'px';
    };
    Dialog.prototype.enableModality = function () {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = this.el.nativeElement.children[0].style.zIndex - 1;
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    };
    Dialog.prototype.hide = function (event) {
        this.onBeforeHide.emit(event);
        this.visibleChange.emit(false);
        this.onAfterHide.emit(event);
        event.preventDefault();
    };
    Dialog.prototype.moveOnTop = function () {
        this.el.nativeElement.children[0].style.zIndex = ++domhandler_1.DomHandler.zindex;
    };
    Dialog.prototype.initDrag = function (event) {
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var container = this.el.nativeElement.children[0];
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var leftPos = parseInt(container.style.left);
            var topPos = parseInt(container.style.top);
            container.style.left = leftPos + deltaX + 'px';
            container.style.top = topPos + deltaY + 'px';
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var container = this.el.nativeElement.children[0];
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = this.domHandler.getOuterWidth(container);
            var contentHeight = this.domHandler.getHeight(this.contentContainer);
            var newWidth = containerWidth + deltaX;
            var newHeight = contentHeight + deltaY;
            if (newWidth > this.minWidth)
                container.style.width = newWidth + 'px';
            if (newHeight > this.minHeight)
                this.contentContainer.style.height = newHeight + 'px';
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.ngOnDestroy = function () {
        this.disableModality();
        if (this.documentDragListener) {
            this.documentDragListener();
        }
        if (this.resizable) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }
        if (this.responsive) {
            this.documentResponsiveListener();
        }
        if (this.closeOnEscape && this.closable) {
            this.documentEscapeListener();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dialog.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "resizable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Dialog.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Dialog.prototype, "minHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dialog.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dialog.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dialog.prototype, "contentHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "modal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dialog.prototype, "showEffect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "closeOnEscape", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "responsive", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], Dialog.prototype, "headerFacet", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dialog.prototype, "onBeforeShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dialog.prototype, "onAfterShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dialog.prototype, "onBeforeHide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dialog.prototype, "onAfterHide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dialog.prototype, "visibleChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dialog.prototype, "visible", null);
    Dialog = __decorate([
        core_1.Component({
            selector: 'p-dialog',
            template: "\n        <div [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}\" \n            [style.display]=\"visible ? 'block' : 'none'\" [style.width.px]=\"width\" [style.height.px]=\"height\" (mousedown)=\"moveOnTop()\">\n            <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\"\n                (mousedown)=\"initDrag($event)\" (mouseup)=\"endDrag($event)\">\n                <span class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span class=\"ui-dialog-title\" *ngIf=\"headerFacet\">\n                    <ng-content select=\"header\"></ng-content>\n                </span>\n                <a [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true,'ui-state-hover':hoverCloseIcon}\" href=\"#\" role=\"button\" *ngIf=\"closable\" \n                    (click)=\"hide($event)\" (mouseenter)=\"hoverCloseIcon=true\" (mouseleave)=\"hoverCloseIcon=false\">\n                    <span class=\"fa fa-fw fa-close\"></span>\n                </a>\n            </div>\n            <div class=\"ui-dialog-content ui-widget-content\" [style.height.px]=\"contentHeight\">\n                <ng-content></ng-content>\n            </div>\n            <ng-content select=\"footer\"></ng-content>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\"\n                (mousedown)=\"initResize($event)\"></div>\n        </div>\n    ",
            directives: [common_1.Header],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], Dialog);
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map