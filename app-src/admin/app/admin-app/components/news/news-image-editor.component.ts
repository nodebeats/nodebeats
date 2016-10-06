import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {NewsImageModel} from "./news.model";
import {NewsService} from "./news.service";
import {Config} from "../../../shared/configs/general.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";


@Component({
    selector: 'news-image-editor',
    templateUrl: 'admin-templates/news/news-image-editor.html'
    // styles: [style]
})
export class NewsImageEditorComponent implements OnInit,AfterViewInit {
    objNewsImage:NewsImageModel = new NewsImageModel();
    @Input() newsImageId:string;
    @Input() newsId:string;
    @Output() showImageListEvent:EventEmitter<any> = new EventEmitter();
    newsImageForm:FormGroup;
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    /* End Image Upload handle */


    constructor(private _objService:NewsService, private _formBuilder:FormBuilder) {
        this.newsImageForm = this._formBuilder.group({
            "imageTitle": ['', Validators.required],
            "imageAltText": ['', Validators.required],
            "imageFormControl": this.imageFormControl,
            active: ['']
        });

    }

    ngAfterViewInit() {
        if (!this.newsImageId)
            this.drawImageToCanvas(Config.DefaultImage);
    }

    ngOnInit() {
        if (this.newsImageId)
            this.getNewsImageDetail();
    }

    getNewsImageDetail() {
        this._objService.getNewsImageDetail(this.newsId, this.newsImageId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:NewsImageModel) {
        this.objNewsImage = objRes;
        let path:string = "";
        if (this.objNewsImage.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objNewsImage.imageName);
        }
        else
            path = Config.DefaultImage;
        this.drawImageToCanvas(path);
    }


    saveNewsImage() {
        this.isSubmitted = true;
        if (this.newsImageForm.valid) {
            if (!this.newsImageId) {
                this._objService.saveNewsImage(this.newsId, this.objNewsImage, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateNewsImage(this.newsId, this.objNewsImage, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }

        }
    }

    resStatusMessage(objSave:any) {
        this.showImageListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showImageListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    /*Image handler */
    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    deleteImage(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteImage(this.objNewsImage.imageName, this.objNewsImage.imageProperties.imageExtension, this.objNewsImage.imageProperties.imagePath)
                    .subscribe(res=> {
                            this.imageDeleted = true;
                            this.objNewsImage.imageName = "";
                            this.drawImageToCanvas(Config.DefaultImage);
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


    /* End ImageHandler */
}

