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
var uitreerow_1 = require('./uitreerow');
var column_1 = require('../column/column');
var common_1 = require('../common');
var common_2 = require('../common');
var TreeTable = (function () {
    function TreeTable() {
        this.selectionChange = new core_1.EventEmitter();
        this.onNodeSelect = new core_1.EventEmitter();
        this.onNodeUnselect = new core_1.EventEmitter();
        this.onNodeExpand = new core_1.EventEmitter();
        this.onNodeCollapse = new core_1.EventEmitter();
    }
    TreeTable.prototype.onRowClick = function (event, node) {
        if (event.target.className && event.target.className.indexOf('ui-treetable-toggler') === 0) {
            return;
        }
        else {
            var metaKey = (event.metaKey || event.ctrlKey);
            var index = this.findIndexInSelection(node);
            var selected = (index >= 0);
            if (selected && metaKey) {
                if (this.isSingleSelectionMode()) {
                    this.selectionChange.emit(null);
                }
                else {
                    this.selection.splice(index, 1);
                    this.selectionChange.emit(this.selection);
                }
                this.onNodeUnselect.emit({ originalEvent: event, node: node });
            }
            else {
                if (this.isSingleSelectionMode()) {
                    this.selectionChange.emit(node);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = (!event.metaKey) ? [] : this.selection || [];
                    this.selection.push(node);
                    this.selectionChange.emit(this.selection);
                }
                this.onNodeSelect.emit({ originalEvent: event, node: node });
            }
        }
    };
    TreeTable.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.isMultipleSelectionMode()) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    TreeTable.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    TreeTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'single';
    };
    TreeTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'multiple';
    };
    TreeTable.prototype.hasFooter = function () {
        if (this.columns) {
            var columnsArr = this.columns.toArray();
            for (var i = 0; i < columnsArr.length; i++) {
                if (columnsArr[i].footer) {
                    return true;
                }
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeTable.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TreeTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeTable.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeTable.prototype, "onNodeCollapse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TreeTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], TreeTable.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(common_2.Footer), 
        __metadata('design:type', Object)
    ], TreeTable.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChildren(column_1.Column), 
        __metadata('design:type', core_1.QueryList)
    ], TreeTable.prototype, "columns", void 0);
    TreeTable = __decorate([
        core_1.Component({
            selector: 'p-treeTable',
            template: "\n        <div [ngClass]=\"'ui-treetable ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-treetable-header ui-widget-header\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-treetable-tablewrapper\">\n                <table class=\"ui-widget-content\" style=\"border:0 0 1px 0px\">\n                    <thead>\n                        <tr class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" \n                                [ngClass]=\"'ui-state-default ui-unselectable-text'\">\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tfoot *ngIf=\"hasFooter()\">\n                        <tr>\n                            <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [ngClass]=\"{'ui-state-default':true}\">{{col.footer}}</td>\n                        </tr>\n                    </tfoot>\n                    <tbody pTreeRow *ngFor=\"let node of value\" [node]=\"node\" [level]=\"0\"></tbody>\n                </table>\n            </div>\n            <div class=\"ui-treetable-footer ui-widget-header\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [uitreerow_1.UITreeRow]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeTable);
    return TreeTable;
}());
exports.TreeTable = TreeTable;
//# sourceMappingURL=treetable.js.map