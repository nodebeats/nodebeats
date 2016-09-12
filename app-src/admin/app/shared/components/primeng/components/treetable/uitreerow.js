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
var treetable_1 = require('./treetable');
var columntemplateloader_1 = require('../column/columntemplateloader');
var UITreeRow = (function () {
    function UITreeRow(treeTable) {
        this.treeTable = treeTable;
        this.level = 0;
        this.expanded = false;
    }
    UITreeRow.prototype.toggle = function (event) {
        if (this.expanded)
            this.treeTable.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        else
            this.treeTable.onNodeExpand.emit({ originalEvent: event, node: this.node });
        this.expanded = !this.expanded;
    };
    UITreeRow.prototype.isLeaf = function () {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    };
    UITreeRow.prototype.isSelected = function () {
        return this.treeTable.isSelected(this.node);
    };
    UITreeRow.prototype.onRowClick = function (event) {
        this.treeTable.onRowClick(event, this.node);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UITreeRow.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UITreeRow.prototype, "level", void 0);
    UITreeRow = __decorate([
        core_1.Component({
            selector: '[pTreeRow]',
            template: "\n        <div class=\"ui-treetable-row\" [ngClass]=\"{'ui-state-hover':hover&&treeTable.selectionMode,'ui-state-highlight':isSelected(node)}\">\n            <td *ngFor=\"let col of treeTable.columns; let i=index\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\"\n                (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\" (click)=\"onRowClick($event)\">\n                <span *ngIf=\"i==0\" class=\"ui-treetable-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-caret-down':expanded,'fa-caret-right':!expanded}\"\n                    [ngStyle]=\"{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}\"\n                    (click)=\"toggle($event)\"></span>\n                <span *ngIf=\"!col.template\">{{node.data[col.field]}}</span>\n                <p-columnTemplateLoader [column]=\"col\" [rowData]=\"node\" *ngIf=\"col.template\"></p-columnTemplateLoader>\n            </td>\n        </div>\n        <div *ngIf=\"node.children\" class=\"ui-treetable-row\" [style.display]=\"expanded ? 'table-row' : 'none'\">\n            <td [attr.colspan]=\"treeTable.columns.length\" class=\"ui-treetable-child-table-container\">\n                <table>\n                    <tbody pTreeRow *ngFor=\"let childNode of node.children\" [node]=\"childNode\" [level]=\"level+1\"></tbody>\n                </table>\n            </td>\n        </div>\n    ",
            directives: [UITreeRow, columntemplateloader_1.ColumnTemplateLoader]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return treetable_1.TreeTable; }))), 
        __metadata('design:paramtypes', [treetable_1.TreeTable])
    ], UITreeRow);
    return UITreeRow;
}());
exports.UITreeRow = UITreeRow;
//# sourceMappingURL=uitreerow.js.map