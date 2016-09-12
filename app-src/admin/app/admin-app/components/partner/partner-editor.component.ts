import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {PartnerModel} from "./partner.model";
import {PartnerService} from "./partner.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../../shared/services/validation.service";

//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
@Component({
    selector: 'partner-editor',
    templateUrl: 'admin-templates/partner/partner-editor.html',
    directives: [FormControlMessages, ImageUploader],
    // styles: [style]
})
export class PartnerEditorComponent implements OnInit,AfterViewInit {
    objPartner:PartnerModel = new PartnerModel();
    @Input() partnerId:string;
    @Output() showPartnerListEvent:EventEmitter<any> = new EventEmitter();
    partnerForm:FormGroup;
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */


    constructor(private _objService:PartnerService, private _formBuilder:FormBuilder) {
        this.partnerForm = _formBuilder.group({
            "partnerName": ['', Validators.required],
            "imageAltText": ['', Validators.required],
            "linkURL": ['', Validators.compose([Validators.required,ValidationService.urlValidator])],
            "active": [''],
            "imageFormControl": this.imageFormControl
        });
    }

    ngAfterViewInit() {
        if (!this.partnerId)
            this.drawImageToCanvas(Config.DefaultImage);
    }

    ngOnInit() {
        if (this.partnerId)
            this.getImageDetail();
    }

    getImageDetail() {
        this._objService.getPartnerDetail(this.partnerId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:PartnerModel) {
        this.objPartner = objRes;
        this.fileName = this.objPartner.imageName;
        (<FormControl>this.partnerForm.controls['imageFormControl']).updateValue(this.fileName);
        let path:string = "";
        if (this.objPartner.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objPartner.imageName);
        }
        else
            path = Config.DefaultImage;
        this.drawImageToCanvas(path);
    }


    savePartner() {
        this.isSubmitted = true;
        (<FormControl>this.partnerForm.controls['imageFormControl']).updateValue(this.fileName);

        if (this.partnerForm.valid) {
            if (!this.partnerId) {
                this._objService.savePartner(this.objPartner, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updatePartner(this.objPartner, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showPartnerListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showPartnerListEvent.emit(isCanceled);
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
                this._objService.deleteImage(this.objPartner.imageName, this.objPartner.imageProperties.imageExtension, this.objPartner.imageProperties.imagePath)
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

