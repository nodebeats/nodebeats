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
var DataList = (function () {
    function DataList(el, differs) {
        this.el = el;
        this.pageLinks = 5;
        this.onLazyLoad = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataList.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataList.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    };
    DataList.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataList.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataList.prototype.updateDataToRender = function (datasource) {
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
    DataList.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataList.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataList.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataList.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataList.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataList.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataList.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataList.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], DataList.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(common_2.Footer), 
        __metadata('design:type', Object)
    ], DataList.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataList.prototype, "itemTemplate", void 0);
    DataList = __decorate([
        core_1.Component({
            selector: 'p-dataList',
            template: "\n        <div [ngClass]=\"'ui-datalist ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datalist-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datalist-content ui-widget-content\">\n                <ul class=\"ui-datalist-data\">\n                    <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datalist-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], DataList);
    return DataList;
}());
exports.DataList = DataList;
//# sourceMappingURL=datalist.js.map