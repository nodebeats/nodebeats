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
var common_1 = require('../common');
var common_2 = require('../common');
var paginator_1 = require('../paginator/paginator');
var DataGrid = (function () {
    function DataGrid(el, differs) {
        this.el = el;
        this.columns = 3;
        this.pageLinks = 5;
        this.onLazyLoad = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataGrid.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataGrid.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    };
    DataGrid.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataGrid.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataGrid.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataGrid.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataGrid.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataGrid.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataGrid.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataGrid.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataGrid.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataGrid.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataGrid.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(common_2.Footer), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataGrid.prototype, "itemTemplate", void 0);
    DataGrid = __decorate([
        core_1.Component({
            selector: 'p-dataGrid',
            template: "\n        <div [ngClass]=\"'ui-datagrid ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datagrid-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datagrid-content ui-widget-content\" [ngClass]=\"'ui-datagrid-col-' + columns\">\n                <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datagrid-footer ui-widget-header ui-corner-top\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], DataGrid);
    return DataGrid;
}());
exports.DataGrid = DataGrid;
//# sourceMappingURL=datagrid.js.map