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
var image_gallery_service_1 = require("./image-gallery.service");
var image_gallery_model_1 = require("./image-gallery.model");
var ImageAlbumListComponent = (function () {
    function ImageAlbumListComponent(_objService) {
        this._objService = _objService;
        this.showForm = false;
        this.showImageListEvent = new core_1.EventEmitter();
        // /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.first = 0;
        this.bindSort = false;
        this.preIndex = 0;
    }
    // /* End Pagination */
    ImageAlbumListComponent.prototype.ngOnInit = function () {
        this.getAlbumList();
    };
    ImageAlbumListComponent.prototype.getAlbumList = function () {
        var _this = this;
        this._objService.getImageAlbumList(this.perPage, this.currentPage)
            .subscribe(function (res) { return _this.bindList(res); }, function (error) { return _this.errorMessage(error); });
    };
    ImageAlbumListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ImageAlbumListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        /* Pagination */
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            /*End Pagination */
            if (!this.bindSort) {
                this.bindSort = true;
                this.sortTable();
            }
            else
                jQuery("table").trigger("update", [true]);
        }
    };
    ImageAlbumListComponent.prototype.sortTable = function () {
        setTimeout(function () {
            jQuery('.tablesorter').tablesorter({
                headers: {
                    2: { sorter: false },
                    3: { sorter: false }
                }
            });
        }, 50);
    };
    ImageAlbumListComponent.prototype.addImageAlbum = function () {
        this.showForm = true;
        this.albumId = null;
    };
    ImageAlbumListComponent.prototype.edit = function (id) {
        this.showForm = true;
        this.albumId = id;
    };
    ImageAlbumListComponent.prototype.showList = function (args) {
        this.showForm = false;
        if (!args)
            this.getAlbumList();
        this.sortTable();
    };
    ImageAlbumListComponent.prototype.showImageList = function (albumId) {
        this.showImageListEvent.emit(albumId);
    };
    ImageAlbumListComponent.prototype.delete = function (id) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Album ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                var objTemp = new image_gallery_model_1.ImageAlbumModel();
                objTemp._id = id;
                objTemp.deleted = true;
                _this._objService.deleteImageAlbum(objTemp)
                    .subscribe(function (res) {
                    _this.getAlbumList();
                    jQuery.jAlert({
                        'title': 'Success',
                        'content': res.message,
                        'theme': 'green'
                    });
                }, function (error) {
                    jQuery.jAlert({
                        'title': 'Alert',
                        'content': error.message,
                        'theme': 'red'
                    });
                });
            }
        });
    };
    ImageAlbumListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.first = event.first;
        if (event.first == 0)
            this.first = 1;
        this.getAlbumList();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageAlbumListComponent.prototype, "showImageListEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageAlbumListComponent.prototype, "isCanceled", void 0);
    ImageAlbumListComponent = __decorate([
        core_1.Component({
            selector: 'image-gallery-album-list',
            templateUrl: 'admin-templates/image-gallery/image-gallery-album-list.html'
        }), 
        __metadata('design:paramtypes', [image_gallery_service_1.ImageGalleryService])
    ], ImageAlbumListComponent);
    return ImageAlbumListComponent;
}());
exports.ImageAlbumListComponent = ImageAlbumListComponent;
//# sourceMappingURL=image-gallery-album-list.component.js.map