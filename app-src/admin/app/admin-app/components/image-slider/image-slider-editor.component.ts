import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ImageSliderModel} from "./image-slider.model";
import {ImageSliderService} from "./image-slider.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
@Component({
    selector: 'image-slider-editor',
    templateUrl: 'admin-templates/image-slider/image-slider-editor.html',
    directives: [FormControlMessages, ImageUploader],
    // styles: [style]
})
export class ImageSliderEditorComponent implements OnInit,AfterViewInit {
    objSlider:ImageSliderModel = new ImageSliderModel();
    @Input() sliderId:string;
    @Output() showSliderListEvent:EventEmitter<any> = new EventEmitter();
    imageSliderForm:FormGroup;
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */


    constructor(private _objService:ImageSliderService, private _formBuilder:FormBuilder) {
        this.imageSliderForm = _formBuilder.group({
            "imageTitle": ['', Validators.required],
            "imageAltText": ['', Validators.required],
            "imagePrimaryContent": [''],
            "imageSecondaryContent": [''],
            "active": [''],
            "imageFormControl": this.imageFormControl
        });

    }

    ngAfterViewInit() {
        if (!this.sliderId)
            this.drawImageToCanvas(Config.DefaultImage);
    }

    ngOnInit() {
        if (this.sliderId)
            this.getImageDetail();
    }

    getImageDetail() {
        this._objService.getImageSliderDetail(this.sliderId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:ImageSliderModel) {
        this.objSlider = objRes;
        this.fileName = this.objSlider.imageName;
        (<FormControl>this.imageSliderForm.controls['imageFormControl']).updateValue(this.fileName);
        let path:string = "";
        if (this.objSlider.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objSlider.imageName);
        }
        else
            path = Config.DefaultImage;
        this.drawImageToCanvas(path);
    }


    saveImageSlider() {
        this.isSubmitted = true;
        (<FormControl>this.imageSliderForm.controls['imageFormControl']).updateValue(this.fileName);

        if (this.imageSliderForm.valid) {
            if (!this.sliderId) {
                this._objService.saveImageSlider(this.objSlider, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateImageSlider(this.objSlider, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showSliderListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showSliderListEvent.emit(isCanceled);
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
                this._objService.deleteImage(this.objSlider.imageName, this.objSlider.imageProperties.imageExtension, this.objSlider.imageProperties.imagePath)
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

