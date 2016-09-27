import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageGalleryModel, ImageGalleryResponse} from "./image-gallery.model";
import{ImageGalleryImageEditorComponent} from "./image-gallery-image-editor.component";
import {Paginator} from 'primeng/primeng';
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

@Component({
    selector: 'image-gallery-image-list',
    templateUrl: 'admin-templates/image-gallery/image-gallery-image-list.html',
    providers: [ImageGalleryService]
})

export class ImageListComponent implements OnInit {

    objListResponse:ImageGalleryResponse = new ImageGalleryResponse();
    error:any;
    @Input() albumId:string;
    @ViewChild('prevCoverImage') prevCoverImage:ElementRef;
    @Output() showAlbumListEvent:EventEmitter<any> = new EventEmitter();
    showImageForm:boolean = false;
    imageId:string;
    // /* Pagination */
    perPage:number = 10;
    currentPage:number = 1;
    totalPage:number = 1;
    nextPage:number = 1;
    preIndex:number = 0;
    // /* End Pagination */


    constructor(private _objService:ImageGalleryService, private eleRef:ElementRef) {
    }

    ngOnInit() {
        this.getAlbumImageList();
    }

    getAlbumImageList() {
        this._objService.getAlbumImageList(this.albumId, this.perPage, this.currentPage)
            .subscribe(objRes =>this.bindList(objRes),
                error => this.errorMessage(error));
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    bindList(objRes:ImageGalleryResponse) {
        this.objListResponse = objRes;
        this.preIndex = (this.perPage * (this.currentPage - 1));

        /* Pagination */
        if (objRes.dataList.length > 0) {
            let totalPage = objRes.totalItems / this.perPage;
            this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

            /*End Pagination */
            setTimeout(()=> {
                jQuery('.tablesorter').tablesorter({
                    headers: {
                        2: {sorter: false},
                        3: {sorter: false},
                        4: {sorter: false}
                    }
                });
            }, 50);
        }
    }

    edit(id:string) {
        this.showImageForm = true;
        this.imageId = id;
    }

    addImage() {
        this.showImageForm = true;
        this.imageId = null;
    }

    delete(imageId:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteAlbumImage(this.albumId, imageId)
                    .subscribe(res=> {
                            this.getAlbumImageList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });
    }

    back() {
        this.showAlbumListEvent.emit(true); // cancelled true
    }

    showImageList(arg) {
        if (!arg) // is not Canceled
            this.getAlbumImageList();
        this.showImageForm = false;
    }

    changeCoverImage(e) {
        let imageId = e.target.value;
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to change cover image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                // let prevCoverImage:NewsImageModel[] = this.objListResponse.image.filter(function (img:NewsImageModel) {
                //     return img.coverImage == true;
                // });
                // if (prevCoverImage.length > 0)
                //  prevCoverImageId = prevCoverImage[0]._id;
                let prevCoverImageId = this.prevCoverImage ? this.prevCoverImage.nativeElement.value : "";
                let objImage:ImageGalleryModel = new ImageGalleryModel();
                objImage._id = imageId;
                objImage.coverImage = true;
                this._objService.updateCoverImage(this.albumId, objImage)
                    .subscribe(res=> {
                            this.getAlbumImageList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            },
            "onDeny": (e)=> {
                if (this.prevCoverImage.nativeElement.value)
                    jQuery('input[name=rdbCoverImage][value=' + this.prevCoverImage.nativeElement.value + ']').prop('checked', true);

            }
        });
    }


    pageChanged(event) {
        this.perPage = event.rows;
        this.currentPage = (Math.floor(event.first / event.rows)) + 1;
        this.getAlbumImageList();
        jQuery(".tablesorter").trigger("update");
    }


}

