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
var tree_1 = require('../tree/tree');
var treenodetemplateloader_1 = require('./treenodetemplateloader');
var UITreeNode = (function () {
    function UITreeNode(tree) {
        this.tree = tree;
        this.hover = false;
        this.expanded = false;
    }
    UITreeNode.prototype.getIcon = function () {
        var icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.expanded ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode.ICON_CLASS + ' ' + icon;
    };
    UITreeNode.prototype.isLeaf = function () {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    };
    UITreeNode.prototype.toggle = function (event) {
        if (this.expanded)
            this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        else
            this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
        this.expanded = !this.expanded;
    };
    UITreeNode.prototype.onNodeClick = function (event) {
        this.tree.onNodeClick(event, this.node);
    };
    UITreeNode.prototype.isSelected = function () {
        return this.tree.isSelected(this.node);
    };
    UITreeNode.ICON_CLASS = 'ui-treenode-icon fa fa-fw';
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UITreeNode.prototype, "node", void 0);
    UITreeNode = __decorate([
        core_1.Component({
            selector: 'p-treeNode',
            template: "\n        <li class=\"ui-treenode\" *ngIf=\"node\">\n            <div class=\"ui-treenode-content\" [ngClass]=\"{'ui-treenode-selectable': tree.selectionMode}\" \n                (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\" (click)=\"onNodeClick($event)\">\n                <span class=\"ui-tree-toggler fa fa-fw\" [ngClass]=\"{'fa-caret-right':!expanded,'fa-caret-down':expanded}\" *ngIf=\"!isLeaf()\"\n                        (click)=\"toggle($event)\"></span\n                ><span class=\"ui-treenode-leaf-icon\" *ngIf=\"isLeaf()\"></span\n                ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                ><span class=\"ui-treenode-label ui-corner-all\" \n                    [ngClass]=\"{'ui-state-hover':hover&&tree.selectionMode,'ui-state-highlight':isSelected()}\">\n                        <span *ngIf=\"!tree.template\">{{node.label}}</span>\n                        <p-treeNodeTemplateLoader [node]=\"node\" [template]=\"tree.template\" *ngIf=\"tree.template\"></p-treeNodeTemplateLoader>\n                    </span>\n            </div>\n            <ul class=\"ui-treenode-children\" style=\"display: none;\" *ngIf=\"node.children\" [style.display]=\"expanded ? 'block' : 'none'\">\n                <p-treeNode *ngFor=\"let childNode of node.children\" [node]=\"childNode\"></p-treeNode>\n            </ul>\n        </li>\n    ",
            directives: [UITreeNode, treenodetemplateloader_1.TreeNodeTemplateLoader]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_1.Tree; }))), 
        __metadata('design:paramtypes', [tree_1.Tree])
    ], UITreeNode);
    return UITreeNode;
}());
exports.UITreeNode = UITreeNode;
//# sourceMappingURL=uitreenode.js.map