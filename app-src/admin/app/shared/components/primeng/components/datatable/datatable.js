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
var column_1 = require('../column/column');
var columntemplateloader_1 = require('../column/columntemplateloader');
var rowexpansionloader_1 = require('./rowexpansionloader');
var common_1 = require('../common');
var common_2 = require('../common');
var paginator_1 = require('../paginator/paginator');
var inputtext_1 = require('../inputtext/inputtext');
var domhandler_1 = require('../dom/domhandler');
var DataTable = (function () {
    function DataTable(el, domHandler, differs, cols, renderer, changeDetector) {
        var _this = this;
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.pageLinks = 5;
        this.selectionChange = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onRowDblclick = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.filterDelay = 300;
        this.onLazyLoad = new core_1.EventEmitter();
        this.columnResizeMode = 'fit';
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.sortMode = 'single';
        this.sortOrder = 1;
        this.csvSeparator = ',';
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
        this.onRowExpand = new core_1.EventEmitter();
        this.onRowCollapse = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.filters = {};
        this.columnsUpdated = false;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
            }
        };
        this.differ = differs.find([]).create(null);
        cols.changes.subscribe(function (_) {
            _this.columns = cols.toArray();
            _this.columnsUpdated = true;
            changeDetector.markForCheck();
        });
    }
    DataTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: null,
                multiSortMeta: this.multiSortMeta
            });
        }
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        if (this.columnsUpdated) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }
            if (this.reorderableColumns) {
                this.initColumnReordering();
            }
            if (this.scrollable) {
                this.initScrolling();
            }
            this.columnsUpdated = false;
        }
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', function () {
                _this.filterTimeout = setTimeout(function () {
                    _this.filter();
                    _this.filterTimeout = null;
                }, _this.filterDelay);
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            if (this.stopSortPropagation) {
                this.stopSortPropagation = false;
            }
            else if (!this.lazy && (this.sortField || this.multiSortMeta)) {
                if (this.sortMode == 'single')
                    this.sortSingle();
                else if (this.sortMode == 'multiple')
                    this.sortMultiple();
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
    };
    DataTable.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    DataTable.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataTable.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.filteredValue || this.value);
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataTable.prototype.updateDataToRender = function (datasource) {
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
    DataTable.prototype.sort = function (event, column) {
        if (!column.sortable) {
            return;
        }
        this.sortOrder = (this.sortField === column.field) ? this.sortOrder * -1 : 1;
        this.sortField = column.field;
        this.sortColumn = column;
        var metaKey = event.metaKey || event.ctrlKey;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (this.sortMode == 'multiple') {
                if (!this.multiSortMeta || !metaKey) {
                    this.multiSortMeta = [];
                }
                this.addSortMeta({ field: this.sortField, order: this.sortOrder });
                this.sortMultiple();
            }
            else {
                this.sortSingle();
            }
        }
        this.onSort.emit({
            field: this.sortField,
            order: this.sortOrder,
            multisortmeta: this.multiSortMeta
        });
    };
    DataTable.prototype.sortSingle = function () {
        var _this = this;
        if (this.value) {
            if (this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                this.value.sort(function (data1, data2) {
                    var value1 = _this.resolveFieldData(data1, _this.sortField);
                    var value2 = _this.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 instanceof String && value2 instanceof String)
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
            }
            this.first = 0;
            if (this.hasFilter()) {
                this.filter();
            }
        }
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    };
    DataTable.prototype.sortMultiple = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
            });
            if (this.hasFilter()) {
                this.filter();
            }
        }
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    };
    DataTable.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    DataTable.prototype.addSortMeta = function (meta) {
        var index = -1;
        for (var i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    };
    DataTable.prototype.isSorted = function (column) {
        if (this.sortMode === 'single') {
            return (this.sortField && column.field === this.sortField);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    DataTable.prototype.getSortOrder = function (column) {
        var order = 0;
        if (this.sortMode === 'single') {
            if (this.sortField && column.field === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    };
    DataTable.prototype.handleRowClick = function (event, rowData) {
        this.onRowClick.next({ originalEvent: event, data: rowData });
        if (!this.selectionMode) {
            return;
        }
        var targetNode = event.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A'
            || (this.domHandler.hasClass(event.target, 'ui-c'))) {
            return;
        }
        var selectionIndex = this.findIndexInSelection(rowData);
        var selected = selectionIndex != -1;
        if (selected) {
            if (this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.emit(null);
            }
            else {
                this.selection.splice(selectionIndex, 1);
                this.selectionChange.emit(this.selection);
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rowData });
        }
        else {
            if (this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.emit(rowData);
            }
            else if (this.isMultipleSelectionMode()) {
                this.selection = this.selection || [];
                this.selection.push(rowData);
                this.selectionChange.emit(this.selection);
            }
            this.onRowSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.onRowRightClick = function (event, rowData) {
        if (this.contextMenu) {
            var selectionIndex = this.findIndexInSelection(rowData);
            var selected = selectionIndex != -1;
            if (!selected) {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
            }
            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.rowDblclick = function (event, rowData) {
        this.onRowDblclick.emit({ originalEvent: event, data: rowData });
    };
    DataTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    DataTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    DataTable.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection == rowData) ? 0 : -1;
            }
            else if (this.isMultipleSelectionMode()) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == rowData) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    DataTable.prototype.isSelected = function (rowData) {
        return this.findIndexInSelection(rowData) != -1;
    };
    DataTable.prototype.onFilterKeyup = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.filterTimeout = setTimeout(function () {
            _this.filters[field] = { value: value, matchMode: matchMode };
            _this.filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    DataTable.prototype.filter = function () {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];
            for (var i = 0; i < this.value.length; i++) {
                var localMatch = true;
                var globalMatch = false;
                for (var j = 0; j < this.columns.length; j++) {
                    var col = this.columns[j], filterMeta = this.filters[col.field];
                    //local
                    if (filterMeta) {
                        var filterValue = filterMeta.value, filterField = col.field, filterMatchMode = filterMeta.matchMode || 'startsWith', dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }
                        if (!localMatch) {
                            break;
                        }
                    }
                    //global
                    if (this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.field), this.globalFilter.value);
                    }
                }
                var matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }
                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onFilter.emit({
            filters: this.filters
        });
    };
    DataTable.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    DataTable.prototype.onFilterInputClick = function (event) {
        event.stopPropagation();
    };
    DataTable.prototype.switchCellToEditMode = function (element, column, rowData) {
        if (!this.selectionMode && this.editable && column.editable) {
            this.onEditInit.emit({ column: column, data: rowData });
            var cell = this.findCell(element);
            if (!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                this.domHandler.addClass(cell, 'ui-cell-editing');
                this.domHandler.addClass(cell, 'ui-state-highlight');
                var editor = cell.querySelector('.ui-cell-editor').focus();
            }
        }
    };
    DataTable.prototype.switchCellToViewMode = function (element, column, rowData, complete) {
        if (this.editable) {
            if (this.preventBlurOnEdit) {
                this.preventBlurOnEdit = false;
            }
            else {
                if (complete)
                    this.onEditComplete.emit({ column: column, data: rowData });
                else
                    this.onEditCancel.emit({ column: column, data: rowData });
                var cell = this.findCell(element);
                this.domHandler.removeClass(cell, 'ui-cell-editing');
                this.domHandler.removeClass(cell, 'ui-state-highlight');
            }
        }
    };
    DataTable.prototype.onCellEditorKeydown = function (event, column, rowData) {
        if (this.editable) {
            this.onEdit.emit({ originalEvent: event, column: column, data: rowData });
            //enter
            if (event.keyCode == 13) {
                this.switchCellToViewMode(event.target, column, rowData, true);
                this.preventBlurOnEdit = true;
            }
            //escape
            if (event.keyCode == 27) {
                this.switchCellToViewMode(event.target, column, rowData, false);
                this.preventBlurOnEdit = true;
            }
        }
    };
    DataTable.prototype.findCell = function (element) {
        var cell = element;
        while (cell.tagName != 'TD') {
            cell = cell.parentElement;
        }
        return cell;
    };
    DataTable.prototype.initResizableColumns = function () {
        var _this = this;
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
        this.documentColumnResizeListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
            if (_this.columnResizing) {
                _this.onColumnResize(event);
            }
        });
        this.documentColumnResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', function (event) {
            if (_this.columnResizing) {
                _this.columnResizing = false;
                _this.onColumnResizeEnd(event);
            }
        });
    };
    DataTable.prototype.initColumnResize = function (event) {
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastPageX = event.pageX;
    };
    DataTable.prototype.onColumnResize = function (event) {
        var container = this.el.nativeElement.children[0];
        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight - 4 + 'px';
        this.resizerHelper.style.top = container.offsetTop + 'px';
        if (event.pageX > container.offsetLeft && event.pageX < (container.offsetLeft + container.offsetWidth)) {
            this.resizerHelper.style.left = event.pageX + 'px';
        }
        this.resizerHelper.style.display = 'block';
    };
    DataTable.prototype.onColumnResizeEnd = function (event) {
        var delta = this.resizerHelper.offsetLeft - this.lastPageX;
        var columnWidth = this.resizeColumn.offsetWidth;
        var newColumnWidth = columnWidth + delta;
        var minWidth = this.resizeColumn.style.minWidth || 15;
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = this.resizeColumn.nextElementSibling;
                var nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if (nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
            }
            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }
        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.domHandler.removeClass(this.el.nativeElement.children[0], 'ui-unselectable-text');
    };
    DataTable.prototype.fixColumnWidths = function () {
        var columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.width = columns[i].offsetWidth + 'px';
        }
    };
    DataTable.prototype.onColumnDragStart = function (event) {
        this.draggedColumn = this.findParentHeader(event.target);
    };
    DataTable.prototype.onColumnDragover = function (event) {
        event.preventDefault();
        var dropHeader = this.findParentHeader(event.target);
        if (this.draggedColumn != dropHeader) {
            var targetPosition = dropHeader.getBoundingClientRect();
            var targetLeft = targetPosition.left + document.body.scrollLeft;
            var targetTop = targetPosition.top + document.body.scrollTop;
            var columnCenter = targetLeft + dropHeader.offsetWidth / 2;
            this.reorderIndicatorUp.style.top = (targetTop - 16) + 'px';
            this.reorderIndicatorDown.style.top = targetTop + dropHeader.offsetHeight + 'px';
            if (event.pageX > columnCenter) {
                this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
                this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
            }
            else {
                this.reorderIndicatorUp.style.left = (targetLeft - 8) + 'px';
                this.reorderIndicatorDown.style.left = (targetLeft - 8) + 'px';
            }
            this.reorderIndicatorUp.style.display = 'block';
            this.reorderIndicatorDown.style.display = 'block';
        }
        else {
            event.dataTransfer.dropEffect = 'none';
        }
    };
    DataTable.prototype.onColumnDragleave = function (event) {
        event.preventDefault();
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
    };
    DataTable.prototype.onColumnDrop = function (event) {
        event.preventDefault();
        var dragIndex = this.domHandler.index(this.draggedColumn);
        var dropIndex = this.domHandler.index(this.findParentHeader(event.target));
        if (dragIndex != dropIndex) {
            this.columns.splice(dropIndex, 0, this.columns.splice(dragIndex, 1)[0]);
            this.onColReorder.emit({
                dragIndex: dragIndex,
                dropIndex: dropIndex,
                columns: this.columns
            });
        }
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
        this.draggedColumn = null;
    };
    DataTable.prototype.initColumnReordering = function () {
        this.reorderIndicatorUp = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-up');
        this.reorderIndicatorDown = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-down');
    };
    DataTable.prototype.findParentHeader = function (element) {
        if (element.nodeName == 'TH') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'TH') {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
    };
    DataTable.prototype.initScrolling = function () {
        var _this = this;
        this.scrollHeader = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header');
        this.scrollHeaderBox = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header-box');
        this.scrollBody = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-body');
        this.percentageScrollHeight = this.scrollHeight && (this.scrollHeight.indexOf('%') !== -1);
        if (this.scrollHeight) {
            if (this.percentageScrollHeight)
                this.scrollBody.style.maxHeight = this.domHandler.getOuterHeight(this.el.nativeElement.parentElement) * (parseInt(this.scrollHeight) / 100) + 'px';
            else
                this.scrollBody.style.maxHeight = this.scrollHeight;
            this.scrollHeaderBox.style.marginRight = this.calculateScrollbarWidth() + 'px';
        }
        this.bodyScrollListener = this.renderer.listen(this.scrollBody, 'scroll', function () {
            _this.scrollHeaderBox.style.marginLeft = -1 * _this.scrollBody.scrollLeft + 'px';
        });
        this.headerScrollListener = this.renderer.listen(this.scrollHeader, 'scroll', function () {
            _this.scrollHeader.scrollLeft = 0;
        });
        if (this.percentageScrollHeight) {
            this.resizeScrollListener = this.renderer.listenGlobal('window', 'resize', function () {
                _this.scrollBody.style.maxHeight = _this.domHandler.getOuterHeight(_this.el.nativeElement.parentElement) * (parseInt(_this.scrollHeight) / 100) + 'px';
            });
        }
    };
    DataTable.prototype.calculateScrollbarWidth = function () {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    DataTable.prototype.hasFooter = function () {
        if (this.footerRows) {
            return true;
        }
        else {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    DataTable.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            multiSortMeta: this.multiSortMeta
        };
    };
    DataTable.prototype.toggleRow = function (row) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }
        var expandedRowIndex = this.findExpandedRowIndex(row);
        if (expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit(row);
        }
        else {
            this.expandedRows.push(row);
            this.onRowExpand.emit(row);
        }
    };
    DataTable.prototype.findExpandedRowIndex = function (row) {
        var index = -1;
        if (this.expandedRows) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i] == row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowExpanded = function (row) {
        return this.findExpandedRowIndex(row) != -1;
    };
    DataTable.prototype.reset = function () {
        this.sortField = null;
        this.sortOrder = 1;
        this.filteredValue = null;
        this.filters = {};
        if (this.paginator) {
            this.paginate({
                first: 0,
                rows: this.rows
            });
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.visibleColumns = function () {
        return this.columns.filter(function (c) { return !c.hidden; });
    };
    DataTable.prototype.exportCSV = function () {
        var _this = this;
        var data = this.value, csv = "data:text/csv;charset=utf-8,";
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field) {
                csv += this.columns[i].field;
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body        
        this.value.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                if (_this.columns[i_1].field) {
                    csv += _this.resolveFieldData(record, _this.columns[i_1].field);
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        window.open(encodeURI(csv));
    };
    DataTable.prototype.ngOnDestroy = function () {
        //remove event listener
        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }
        if (this.scrollable) {
            this.bodyScrollListener();
            this.headerScrollListener();
            if (this.percentageScrollHeight) {
                this.resizeScrollListener();
            }
        }
        if (this.resizableColumns) {
            this.documentColumnResizeListener();
            this.documentColumnResizeEndListener();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowDblclick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "headerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "globalFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "sortOrder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "multiSortMeta", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "csvSeparator", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onFilter", void 0);
    __decorate([
        core_1.ContentChild(common_1.Header), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(common_2.Footer), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "expandableRows", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowCollapse", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataTable.prototype, "rowExpansionTemplate", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'p-dataTable',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" \n            [ngClass]=\"{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive, 'ui-datatable-stacked': stacked, 'ui-datatable-resizable': resizableColumns}\">\n            <div class=\"ui-datatable-header ui-widget-header\" *ngIf=\"header\" [ngStyle]=\"{'width': scrollWidth}\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datatable-tablewrapper\" *ngIf=\"!scrollable\">\n                <table>\n                    <thead>\n                        <tr *ngIf=\"!headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"let col of columns;let lastCol = last\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,\n                                'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}\" \n                                [draggable]=\"reorderableColumns\" (dragstart)=\"onColumnDragStart($event)\" (dragover)=\"onColumnDragover($event)\" (dragleave)=\"onColumnDragleave($event)\" (drop)=\"onColumnDrop($event)\">\n                                <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\" (mousedown)=\"initColumnResize($event)\">&nbsp;</span>\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                        <tr *ngFor=\"let headerRow of headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"let col of headerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,\n                                'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}\">\n                                <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\" (mousedown)=\"initColumnResize($event)\">&nbsp;</span>\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tfoot *ngIf=\"hasFooter()\">\n                        <tr *ngIf=\"!footerRows\">\n                            <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [ngClass]=\"{'ui-state-default':true}\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\">{{col.footer}}</th>\n                        </tr>\n                        <tr *ngFor=\"let footerRow of footerRows\">\n                            <th *ngFor=\"let col of footerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\"\n                                [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-state-default':true}\">{{col.footer}}</th>\n                        </tr>\n                    </tfoot>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                            <tr #rowElement class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                    (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\"\n                                    [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                                <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                    <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"!col.template\">{{resolveFieldData(rowData,col.field)}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"col.template\">\n                                        <p-columnTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnTemplateLoader>\n                                    </span>\n                                    <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                            (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData)\"/>\n                                    <div class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"\n                                        *ngIf=\"col.expander\" (click)=\"toggleRow(rowData)\"></div>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                                <td [attr.colspan]=\"visibleColumns().length\">\n                                    <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                                </td>\n                            </tr>\n                        </template>\n                    </tbody>\n                </table>\n                <div class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\"></div>\n                <span class=\"fa fa-arrow-down ui-datatable-reorder-indicator-up\" style=\"position: absolute; display: none;\"></span>\n                <span class=\"fa fa-arrow-up ui-datatable-reorder-indicator-down\" style=\"position: absolute; display: none;\"></span>\n            </div>\n            <div class=\"ui-widget-header ui-datatable-scrollable-header\" *ngIf=\"scrollable\" [ngStyle]=\"{'width': scrollWidth}\">\n                <div class=\"ui-datatable-scrollable-header-box\">\n                    <table>\n                        <thead>\n                            <tr>\n                                <th #headerCell *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                    [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,\n                                    'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}\">\n                                    <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\">&nbsp;</span>\n                                    <span class=\"ui-column-title\">{{col.header}}</span>\n                                    <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                         [ngClass]=\"{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}\"></span>\n                                    <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                </th>\n                            </tr>\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <div class=\"ui-datatable-scrollable-body\" *ngIf=\"scrollable\" [ngStyle]=\"{'width': scrollWidth}\">\n                <table>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                    <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                        <tr #rowElement class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\"\n                                [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                            <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"!col.template\">{{resolveFieldData(rowData,col.field)}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"col.template\">\n                                    <p-columnTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnTemplateLoader>\n                                </span>\n                                <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                        (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData)\"/>\n                                <div class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"\n                                    *ngIf=\"col.expander\" (click)=\"toggleRow(rowData)\"></div>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                            <td [attr.colspan]=\"visibleColumns().length\">\n                                <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                            </td>\n                        </tr>\n                    </template>\n                    </tbody>\n                </table>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\"\n                (onPageChange)=\"paginate($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datatable-footer ui-widget-header\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator, inputtext_1.InputText, columntemplateloader_1.ColumnTemplateLoader, rowexpansionloader_1.RowExpansionLoader],
            providers: [domhandler_1.DomHandler]
        }),
        __param(3, core_1.Query(column_1.Column)), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.QueryList, core_1.Renderer, core_1.ChangeDetectorRef])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.js.map