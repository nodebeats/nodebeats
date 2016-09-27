import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {NewsService} from "./news.service";
import {NewsImageModel, NewsImageResponse} from "./news.model";

// import {Pagination} from 'fuel-ui/fuel-ui';
import{NewsImageEditorComponent} from "./news-image-editor.component";
@Component({
    selector: 'news-image-list',
    templateUrl: 'admin-templates/news/news-image-list.html'
})

export class NewsImageListComponent implements OnInit {

    objListResponse:NewsImageResponse;
    error:any;
    @Input() newsId:string;
    @ViewChild('prevCoverImage') prevCoverImage:ElementRef;
    @Output() showNewsListEvent:EventEmitter<any> = new EventEmitter();
    showImageForm:boolean = false;
    imageId:string;
    /* Pagination */
    // perPage:number = 10;
    // currentPage:number = 1;
    // totalPage:number = 1;
    // nextPage:number = 1;
    /* End Pagination */


    constructor(private _objService:NewsService, private eleRef:ElementRef) {
    }

    ngOnInit() {
        this.getNewsImageList();
    }

    getNewsImageList() {
        this._objService.getNewsImageList(this.newsId)
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

    bindList(objRes:NewsImageResponse) {
        this.objListResponse = objRes;
        if (objRes.image.length > 0) {
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

    delete(id:string) {
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();

                this._objService.deleteNewsImage(this.newsId, id)
                    .subscribe(res=> {
                            this.getNewsImageList();
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
        this.showNewsListEvent.emit(true); // cancelled true
    }

    showImageList(arg) {
        if (!arg) // is not Canceled
            this.getNewsImageList();
        this.showImageForm = false;
    }

    changeCoverImage(args) {
        let newsImageId = args.target.value;
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
                let objNewsImage:NewsImageModel = new NewsImageModel();
                objNewsImage._id = newsImageId;
                objNewsImage.coverImage = true;
                this._objService.updateNewsCoverImage(this.newsId, prevCoverImageId, objNewsImage)
                    .subscribe(res=> {
                            this.getNewsImageList();
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
                let prevCoverImageId = "";
                if (this.prevCoverImage.nativeElement.value)
                    jQuery('input[name=rdbCoverImage][value=' + this.prevCoverImage.nativeElement.value + ']').prop('checked', true);
                //    this.eleRef.nativeElement.querySelector('input:radio').value = this.prevCoverImage.nativeElement.value;
            }
        });
    }

    // vppChanged(event:Event) {
    //     this.perPage = Number((<HTMLSelectElement>event.srcElement).value);
    //     this.getNewsImageList();
    // }
    //
    // pageChanged(arg) {
    //     if (arg != this.nextPage) {
    //         this.nextPage = arg;
    //         this.currentPage = arg;
    //         this.getNewsImageList();
    //     }
    // }


}

