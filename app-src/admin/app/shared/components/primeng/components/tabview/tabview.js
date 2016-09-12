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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var tabpanel_1 = require('./tabpanel');
var TabView = (function () {
    function TabView(el, tabPanels) {
        var _this = this;
        this.el = el;
        this.orientation = 'top';
        this.onChange = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        tabPanels.changes.subscribe(function (_) {
            _this.tabs = tabPanels.toArray();
            var selectedTab = _this.findSelectedTab();
            if (!selectedTab && _this.tabs.length) {
                _this.tabs[0].selected = true;
            }
        });
    }
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            event.preventDefault();
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }
        event.preventDefault();
    };
    TabView.prototype.close = function (event, tab) {
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
        this.onClose.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        event.stopPropagation();
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabView.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabView.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabView.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabView.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabView.prototype, "onClose", void 0);
    TabView = __decorate([
        core_1.Component({
            selector: 'p-tabView',
            template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\">\n                <template ngFor let-tab [ngForOf]=\"tabs\">\n                    <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\"\n                        [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-hover': tab.hoverHeader&&!tab.disabled, 'ui-state-disabled': tab.disabled}\"\n                        (mouseenter)=\"tab.hoverHeader=true\" (mouseleave)=\"tab.hoverHeader=false\" (click)=\"open($event,tab)\" *ngIf=\"!tab.closed\">\n                        <a href=\"#\">\n                            <span class=\"ui-tabview-left-icon fa\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                            {{tab.header}}\n                            <span class=\"ui-tabview-right-icon fa\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                        </a>\n                        <span *ngIf=\"tab.closable\" class=\"ui-tabview-close fa fa-close\" (click)=\"close($event,tab)\"></span>\n                    </li>\n                </template>\n            </ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        }),
        __param(1, core_1.Query(tabpanel_1.TabPanel)), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.QueryList])
    ], TabView);
    return TabView;
}());
exports.TabView = TabView;
//# sourceMappingURL=tabview.js.map