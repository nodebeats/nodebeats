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
var uitreenode_1 = require('./uitreenode');
var Tree = (function () {
    function Tree() {
        this.selectionChange = new core_1.EventEmitter();
        this.onNodeSelect = new core_1.EventEmitter();
        this.onNodeUnselect = new core_1.EventEmitter();
        this.onNodeExpand = new core_1.EventEmitter();
        this.onNodeCollapse = new core_1.EventEmitter();
    }
    Tree.prototype.onNodeClick = function (event, node) {
        if (event.target.className && event.target.className.indexOf('ui-tree-toggler') === 0) {
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
    Tree.prototype.findIndexInSelection = function (node) {
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
    Tree.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    Tree.prototype.isSingleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'single';
    };
    Tree.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'multiple';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Tree.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tree.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tree.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tree.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tree.prototype, "onNodeSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tree.prototype, "onNodeUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tree.prototype, "onNodeExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tree.prototype, "onNodeCollapse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tree.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tree.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Tree.prototype, "template", void 0);
    Tree = __decorate([
        core_1.Component({
            selector: 'p-tree',
            template: "\n        <div [ngClass]=\"'ui-tree ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tree-container\">\n                <p-treeNode *ngFor=\"let node of value\" [node]=\"node\"></p-treeNode>\n            </ul>\n        </div>\n    ",
            directives: [uitreenode_1.UITreeNode]
        }), 
        __metadata('design:paramtypes', [])
    ], Tree);
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map