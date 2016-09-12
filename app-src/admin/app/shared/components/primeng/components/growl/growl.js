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
var Growl = (function () {
    function Growl(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.sticky = false;
        this.life = 3000;
        this.differ = differs.find([]).create(null);
        this.zIndex = domhandler_1.DomHandler.zindex;
    }
    Growl.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
    };
    Growl.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.stopDoCheckPropagation) {
                this.stopDoCheckPropagation = false;
            }
            else if (this.value && this.value.length) {
                this.zIndex = ++domhandler_1.DomHandler.zindex;
                this.domHandler.fadeIn(this.container, 250);
                if (!this.sticky) {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = setTimeout(function () {
                        _this.removeAll();
                    }, this.life);
                }
            }
        }
    };
    Growl.prototype.remove = function (msg, msgel) {
        var _this = this;
        this.stopDoCheckPropagation = true;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.value.splice(_this.findMessageIndex(msg), 1);
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.stopDoCheckPropagation = true;
            this.domHandler.fadeOut(this.container, 250);
            setTimeout(function () {
                _this.value.splice(0, _this.value.length);
            }, 250);
        }
    };
    Growl.prototype.findMessageIndex = function (msg) {
        var index = -1;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == msg) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Growl.prototype, "sticky", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Growl.prototype, "life", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Growl.prototype, "value", void 0);
    Growl = __decorate([
        core_1.Component({
            selector: 'p-growl',
            template: "\n        <div class=\"ui-growl ui-widget\" [style.zIndex]=\"zIndex\">\n            <div #msgel *ngFor=\"let msg of value\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info ':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn','ui-growl-message-error':msg.severity == 'error'}\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close fa fa-close\" (click)=\"remove(msg,msgel)\"></div>\n                     <span class=\"ui-growl-image fa fa-2x ui-growl-image-info\"\n                        [ngClass]=\"{'fa-info-circle':msg.severity == 'info','fa-warning':msg.severity == 'warn','fa-close':msg.severity == 'error'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p>{{msg.detail}}</p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Growl);
    return Growl;
}());
exports.Growl = Growl;
//# sourceMappingURL=growl.js.map