/**
 * Created by sanedev on 6/19/16.
 */
'use strict';
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
var env_config_1 = require('../../configs/env.config');
var SpinnerComponent = (function () {
    function SpinnerComponent() {
        this.isDelayedRunning = false;
        this.show = false;
        this.delay = 300;
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        this.detectAjax();
    };
    Object.defineProperty(SpinnerComponent.prototype, "isRunning", {
        set: function (value) {
            var _this = this;
            if (!value) {
                this.cancelTimeout();
                this.isDelayedRunning = false;
            }
            if (this.currentTimeout) {
                return;
            }
            this.currentTimeout = setTimeout(function () {
                _this.isDelayedRunning = value;
                _this.cancelTimeout();
            }, this.delay);
        },
        enumerable: true,
        configurable: true
    });
    SpinnerComponent.prototype.detectAjax = function () {
        var origOpen = XMLHttpRequest.prototype.open;
        var that = this;
        XMLHttpRequest.prototype.open = function (method, url, async) {
            if (url.indexOf(env_config_1.HOST_URL + '/api') != -1)
                that.show = true;
            this.addEventListener('load', function () {
                // console.log('request completed!');
                // console.log(this.readyState); //will always be 4 (ajax is completed successfully)
                // console.log(this.responseText); //whatever the response was
                setTimeout(function () { return that.show = false; }, 500);
            });
            origOpen.apply(this, arguments);
            //  this.setRequestHeader("Auth","123");
        };
    };
    SpinnerComponent.prototype.cancelTimeout = function () {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.cancelTimeout();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SpinnerComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], SpinnerComponent.prototype, "isRunning", null);
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'ajax-spinner',
            template: "<div *ngIf=\"show\" class=\"spinner-wrapper fadeInDirectives\">\n                    <div class=\"spinner-back\"></div>\n                       <div class=\"spinner\">  \n                       <div class=\"rect1\"></div>\n                       <div class=\"rect2\"></div>\n                         <div class=\"rect3\"></div>\n                         <div class=\"rect4\"></div>\n                         <div class=\"rect5\"></div>\n                    </div></div>",
            styles: ["\n        .spinner-wrapper {\n            height: 100%;\n            width: 100%;\n            position: fixed;         \n            z-index: 999;\n            overflow:hidden;\n            left: 0;\n            top: 0;\n        }\n        .spinner-back{\n                background-color: #000;\n             opacity: .5;\n            height: inherit;\n            position: inherit;\n             width: inherit;\n\n        }\n        .spinner {\n          margin: 100px auto;\n          height: 100px;\n          text-align: center;\n          font-size: 10px;\n          color:#fff;\n        }\n        \n        .spinner > div {\n          background-color: #fff;\n          height: 100%;\n          margin-left: 5px;\n          display: inline-block;\n          width: 15px;\n           margin-left: 5px;\n          -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n          animation: sk-stretchdelay 1.2s infinite ease-in-out;\n        }\n        \n        .spinner .rect2 {\n          -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n        }\n        \n        .spinner .rect3 {\n          -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n        }\n        \n        .spinner .rect4 {\n          -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n        }\n        \n        .spinner .rect5 {\n          -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n        }\n        \n        @-webkit-keyframes sk-stretchdelay {\n          0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  \n          20% { -webkit-transform: scaleY(1.0) }\n        }\n        \n        @keyframes sk-stretchdelay {\n          0%, 40%, 100% { \n            transform: scaleY(0.4);\n            -webkit-transform: scaleY(0.4);\n          }  20% { \n            transform: scaleY(1.0);\n            -webkit-transform: scaleY(1.0);\n          }\n        }"]
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner.component.js.map