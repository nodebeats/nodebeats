import {
    Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {EventModel} from "./event.model";
import {EventService} from "./event.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {Calendar} from 'primeng/primeng';
import * as moment from 'moment';
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";

//declare var require;
//const styles:string = require('../../../shared/components/datepicker/src/my-date-picker/my-date-picker.component.css');
@Component({
    selector: 'event-editor',
    templateUrl: 'admin-templates/event-management/event-editor.html'
})
export class EventEditorComponent implements OnInit,AfterViewInit {
    objEvent:EventModel = new EventModel();
    @Input() eventId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    eventForm:FormGroup;
    isSubmitted:boolean = false;
    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultWideImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.wide;
    /* End Image Upload handle */


    constructor(private _objService:EventService, private _formBuilder:FormBuilder) {
        this.eventForm = this._formBuilder.group({
            "eventTitle": ['', Validators.required],
            "description": ['', Validators.required],
            "venue": ['', Validators.required],
            "venueAddress": ['', Validators.required],
            "startDate": ['', Validators.required],
            "endDate": [''],
            "imageFormControl": this.imageFormControl,
            "active": [''],
        });
    }

    ngAfterViewInit() {
        if (!this.eventId)
            this.drawImageToCanvas(Config.DefaultWideImage);
    }

    ngOnInit() {
        if (this.eventId)
            this.getEventDetail();
    }

    getEventDetail() {
        this._objService.getEventById(this.eventId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:EventModel) {
        this.objEvent = objRes;
        this.objEvent.startDate = this.changeDateFormatToView(this.objEvent.startDate);
        this.objEvent.endDate = this.changeDateFormatToView(this.objEvent.endDate);
        this.fileName = this.objEvent.imageName;
        let path:string = "";
        if (this.objEvent.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objEvent.imageName, {width: 300, height: 150, crop: 'fill'});
        }
        else
            path = Config.DefaultWideImage;
        this.drawImageToCanvas(path);
    }


    saveEvent() {
        this.isSubmitted = true;
        (<FormControl>this.eventForm.controls['imageFormControl']).patchValue(this.fileName);
        if (this.eventForm.valid) {
            if (!this.eventId) {
                this._objService.saveEvent(this.objEvent, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateEvent(this.objEvent, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    changeDateFormatToView(data:string) {
        return moment(data).format("YYYY-MM-DD HH:mm");
    }

    /*Image handler */

    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    deleteImage(imageId) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteImage(this.objEvent.imageName, this.objEvent.imageProperties.imageExtension, this.objEvent.imageProperties.imagePath)
                    .subscribe(res=> {
                            this.imageDeleted = true;
                            this.drawImageToCanvas(Config.DefaultWideImage);
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

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    /* End Image handler */


}