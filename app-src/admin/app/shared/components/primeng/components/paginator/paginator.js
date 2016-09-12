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
var Paginator = (function () {
    function Paginator() {
        this.rows = 0;
        this.first = 0;
        this.pageLinkSize = 5;
        this.onPageChange = new core_1.EventEmitter();
        this._totalRecords = 0;
    }
    Object.defineProperty(Paginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function () {
        this.changePage(0);
    };
    Paginator.prototype.changePageToPrev = function () {
        this.changePage(this.getPage() - 1);
    };
    Paginator.prototype.changePageToNext = function () {
        this.changePage(this.getPage() + 1);
    };
    Paginator.prototype.changePageToLast = function () {
        this.changePage(this.getPageCount() - 1);
    };
    Paginator.prototype.onRppChange = function (event) {
        this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
        this.changePageToFirst();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "first", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Paginator.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Paginator.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "totalRecords", null);
    Paginator = __decorate([
        core_1.Component({
            selector: 'p-paginator',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-paginator ui-widget-header ui-unselectable-text':true}\">\n            <span #firstlink class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                        (click)=\"changePageToFirst()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-step-backward\"></span>\n            </span>\n            <span #prevlink class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToPrev()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-backward\"></span>\n            </span>\n            <span class=\"ui-paginator-pages\">\n                <span #plink *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePage(pageLink - 1)\"\n                    [ngClass]=\"{'ui-state-hover':(plink === hoveredItem), 'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</span>\n            </span>\n            <span #nextlink class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToNext()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-forward\"></span>\n            </span>\n            <span #lastlink class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToLast()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-step-forward\"></span>\n            </span>\n            <select class=\"ui-paginator-rpp-options ui-widget ui-state-default\" *ngIf=\"rowsPerPageOptions\" (change)=\"onRppChange($event)\">\n                <option *ngFor=\"let opt of rowsPerPageOptions\" [value]=\"opt\" [selected]=\"rows == opt\">{{opt}}</option>\n            </select>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=paginator.js.map