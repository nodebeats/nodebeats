import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ImageGalleryModel} from "./image-gallery.model";
import {ImageGalleryService} from "./image-gallery.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';

//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
@Component({
    selector: 'image-gallery-image-editor',
    templateUrl: 'admin-templates/image-gallery/image-gallery-image-editor.html'
})
export class ImageGalleryImageEditorComponent implements OnInit,AfterViewInit {
    objImage:ImageGalleryModel = new ImageGalleryModel();
    @Input() imageId:string;
    @Input() albumId:string;
    @Output() showImageListEvent:EventEmitter<any> = new EventEmitter();
    imageForm:FormGroup;
    isSubmitted:boolean = false;
    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasCanvas:number = ImageCanvasSizeEnum.wide;
    /* End Image Upload handle */

    constructor(private _objService:ImageGalleryService, private _formBuilder:FormBuilder) {
        this.imageForm = this._formBuilder.group({
            "imageTitle": ['', Validators.required],
            "imageAltText": ['', Validators.required],
            "imageFormControl": this.imageFormControl,
            "active": ['']
        });
    }

    ngAfterViewInit() {
        if (!this.imageId)
            this.drawImageToCanvas(Config.DefaultImage);
    }

    ngOnInit() {
        if (this.imageId)
            this.getAlbumImageDetail();
    }

    getAlbumImageDetail() {
        this._objService.getImageDetail(this.albumId, this.imageId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:ImageGalleryModel) {
        this.objImage = objRes;
        let path:string = "";
        if (this.objImage.imageName) {
            this.fileName = this.objImage.imageName;
            (<FormControl>this.imageForm.controls['imageFormControl']).patchValue(this.fileName);
            var cl = Config.Cloudinary;
            path = cl.url(this.objImage.imageName);
        }
        else
            path = Config.DefaultImage;
        this.drawImageToCanvas(path);
    }


    saveImage() {
        this.isSubmitted = true;
        (<FormControl>this.imageForm.controls['imageFormControl']).patchValue(this.fileName);
        if (this.imageForm.valid) {
            if (!this.imageId) {
                this._objService.saveImage(this.albumId, this.objImage, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateImage(this.albumId, this.objImage, this.file, this.imageDeleted)
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
                this._objService.deleteImageFile(this.objImage.imageName, this.objImage.imageProperties.imageExtension, this.objImage.imageProperties.imagePath)
                    .subscribe(res=> {
                            this.imageDeleted = true;
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

