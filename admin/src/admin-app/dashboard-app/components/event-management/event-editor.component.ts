import Swal from 'sweetalert2';
import { ValidationService } from './../../../shared/services/validation.service';
import {
  Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import {EventModel} from "./event.model";
import {EventService} from "./event.service";
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import * as moment from 'moment';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import { basename } from 'path';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'event-editor',
  templateUrl: './event-editor.html'
})
export class EventEditorComponent implements OnInit,AfterViewInit {
  eventForm: FormGroup;
  eventId:string;
  isSubmitted: boolean = false;
  today: any = new Date();
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultWideImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.wide;
  sD:any;
  eD:any;
  imageExtension:any;
  imagePath:any;
  /* End Image Upload handle */

  constructor(private router: Router, private activatedRoute:ActivatedRoute,private _objService: EventService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param=>this.eventId=param['id']);
    this.eventForm = this._formBuilder.group({
      "eventTitle": ['', Validators.required],
      "eventDescription": ['', Validators.required],
      "venue": ['', Validators.required],
      "venueAddress": ['', Validators.required],
      "startDate": ['', Validators.required],
      "startHour": ['',Validators.compose([Validators.required, ValidationService.minValueValidator(0),ValidationService.maxValueValidator(23)])],
      "startMinute": ['',Validators.compose([Validators.required, ValidationService.minValueValidator(0),ValidationService.maxValueValidator(59)])],
      "endDate": [''],
      "endHour": ['',Validators.compose([Validators.required, ValidationService.minValueValidator(0),ValidationService.maxValueValidator(23)])],
      "endMinute": ['',Validators.compose([Validators.required, ValidationService.minValueValidator(0),ValidationService.maxValueValidator(59)])],
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

  onStartDateSelect(date: any) {
    this.sD = this.changeDateFormatToView(date);
  }

  onEndDateSelect(date: any) {
    this.eD = this.changeDateFormatToView(date);
  }

  getEventDetail() {
    this._objService.getEventById(this.eventId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes: EventModel) {
    this.imageExtension=objRes.imageProperties.imageExtension;
    this.imagePath=objRes.imageProperties.imagePath;
    this.fileName = objRes.imageName;
    (<FormControl>this.eventForm.controls['imageFormControl']).patchValue(this.fileName)
    this.sD = this.changeDateFormatToView(objRes.startDate);
    this.eD = this.changeDateFormatToView(objRes.endDate);
    let starthour:string = this.sD.getHours();
    let startminute:string = this.sD.getMinutes();
    let endhour:string = this.eD.getHours();
    let endminute:string = this.eD.getMinutes();
    this.eventForm.patchValue({
      eventTitle : objRes.eventTitle,
      eventDescription : objRes.eventDescription,
      venue: objRes.venue,
      venueAddress: objRes.venueAddress,
      startDate: this.sD,
      startHour: starthour,
      startMinute: startminute,
      endDate: this.eD,
      endHour: endhour,
      endMinute: endminute,
      active: objRes.active,
        })
    let path: string = "";
    if (this.fileName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.fileName, {width: 300, height: 150, crop: 'fill'});
    }
    else
      path = Config.DefaultWideImage;
    this.drawImageToCanvas(path);
  }


  saveEvent() {
    let fullStartDate:any = this.parseTime(
      this.eventForm.controls.startDate.value,
      this.eventForm.controls.startHour.value,
      this.eventForm.controls.startMinute.value
      );
      let fullEndDate:any = this.parseTime(
        this.eventForm.controls.endDate.value,
        this.eventForm.controls.endHour.value,
        this.eventForm.controls.endMinute.value
        );
    this.isSubmitted = false;
    (<FormControl>this.eventForm.controls['imageFormControl']).patchValue(this.fileName);
    (<FormControl>this.eventForm.controls['startDate']).patchValue(fullStartDate);
    (<FormControl>this.eventForm.controls['endDate']).patchValue(fullEndDate);
    if (this.eventForm.valid) {
      if (!this.eventId) {
        this._objService.saveEvent(this.eventForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateEvent(this.eventForm.value, this.file, this.eventId, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave: any) {
    Swal("Success !", objSave.message, "success");
    this.triggerCancelForm();
  }

  triggerCancelForm() {
    this.router.navigate(['/event']);
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  changeDateFormatToView(data: string) {
    return new Date(data);
  }

  /*Image handler */

  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  deleteImage(imageId: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
        this._objService.deleteImage(this.fileName, this.imageExtension, this.imagePath)
          .subscribe(res=> {
              this.imageDeleted = true;
              this.fileName = "";
              this.drawImageToCanvas(Config.DefaultImage);
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }
  /* End Image handler */

  parseTime(fullStartDate: Date, inputHour:string, inputMinute:string){
    let newDate:any = fullStartDate.toLocaleDateString();
    let splitDate:any = newDate.split("/");
    let date:any = new Date(splitDate[2],splitDate[0]-1,splitDate[1], parseInt(inputHour), parseInt(inputMinute),0,0);
    return date;
  }
}
