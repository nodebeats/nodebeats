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
var ImageListComponent = (function () {
    // /* End Pagination */
    function ImageListComponent(_objService, eleRef) {
        this._objService = _objService;
        this.eleRef = eleRef;
        this.objListResponse = new image_gallery_model_1.ImageGalleryResponse();
        this.showAlbumListEvent = new core_1.EventEmitter();
        this.showImageForm = false;
        // /* Pagination */
        this.perPage = 10;
        this.currentPage = 1;
        this.totalPage = 1;
        this.nextPage = 1;
        this.preIndex = 0;
    }
    ImageListComponent.prototype.ngOnInit = function () {
        this.getAlbumImageList();
    };
    ImageListComponent.prototype.getAlbumImageList = function () {
        var _this = this;
        this._objService.getAlbumImageList(this.albumId, this.perPage, this.currentPage)
            .subscribe(function (objRes) { return _this.bindList(objRes); }, function (error) { return _this.errorMessage(error); });
    };
    ImageListComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    ImageListComponent.prototype.bindList = function (objRes) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));
        /* Pagination */
        if (objRes.dataList.length > 0) {
            var totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;
            /*End Pagination */
            setTimeout(function () {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: { sorter: false },
                        3: { sorter: false },
                        4: { sorter: false }
                    }
                });
            }, 50);
        }
    };
    ImageListComponent.prototype.edit = function (id) {
        this.showImageForm = true;
        this.imageId = id;
    };
    ImageListComponent.prototype.addImage = function () {
        this.showImageForm = true;
        this.imageId = null;
    };
    ImageListComponent.prototype.delete = function (imageId) {
        var _this = this;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                _this._objService.deleteAlbumImage(_this.albumId, imageId)
                    .subscribe(function (res) {
                    _this.getAlbumImageList();
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
    ImageListComponent.prototype.back = function () {
        this.showAlbumListEvent.emit(true); // cancelled true
    };
    ImageListComponent.prototype.showImageList = function (arg) {
        if (!arg)
            this.getAlbumImageList();
        this.showImageForm = false;
    };
    ImageListComponent.prototype.changeCoverImage = function (e) {
        var _this = this;
        var imageId = e.target.value;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to change cover image ?',
            'theme': 'red',
            'onConfirm': function (e, btn) {
                e.preventDefault();
                // let prevCoverImage:NewsImageModel[] = this.objListResponse.image.filter(function (img:NewsImageModel) {
                //     return img.coverImage == true;
                // });
                // if (prevCoverImage.length > 0)
                //  prevCoverImageId = prevCoverImage[0]._id;
                var prevCoverImageId = _this.prevCoverImage ? _this.prevCoverImage.nativeElement.value : "";
                var objImage = new image_gallery_model_1.ImageGalleryModel();
                objImage._id = imageId;
                objImage.coverImage = true;
                _this._objService.updateCoverImage(_this.albumId, objImage)
                    .subscribe(function (res) {
                    _this.getAlbumImageList();
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
            },
            "onDeny": function (e) {
                if (!_this.prevCoverImage)
                    jQuery('input[name="rdbCoverImage"]').prop('checked', false);
                else if (_this.prevCoverImage && _this.prevCoverImage.nativeElement.value)
                    jQuery('input[name=rdbCoverImage][value=' + _this.prevCoverImage.nativeElement.value + ']').prop('checked', true);
                else
                    return false;
            }
        });
    };
    ImageListComponent.prototype.pageChanged = function (event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getAlbumImageList();
        jQuery(".tablesorter").trigger("update");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageListComponent.prototype, "albumId", void 0);
    __decorate([
        core_1.ViewChild('prevCoverImage'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImageListComponent.prototype, "prevCoverImage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageListComponent.prototype, "showAlbumListEvent", void 0);
    ImageListComponent = __decorate([
        core_1.Component({
            selector: 'image-gallery-image-list',
            templateUrl: 'admin-templates/image-gallery/image-gallery-image-list.html',
            providers: [image_gallery_service_1.ImageGalleryService]
        }), 
        __metadata('design:paramtypes', [image_gallery_service_1.ImageGalleryService, core_1.ElementRef])
    ], ImageListComponent);
    return ImageListComponent;
}());
exports.ImageListComponent = ImageListComponent;
//# sourceMappingURL=image-gallery-image-list.component.js.map