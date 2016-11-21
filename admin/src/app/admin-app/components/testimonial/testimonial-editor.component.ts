import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TestimonialModel} from "./testimonial.model";
import {TestimonialService} from "./testimonial.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ValidationService} from "../../../shared/services/validation.service";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'testimonial-editor',
  templateUrl: '../../views/testimonial/testimonial-editor.html'
  // styles: [style]
})
export class TestimonialEditorComponent implements OnInit,AfterViewInit {
  objTestimonial:TestimonialModel = new TestimonialModel();
  @Input() testimonialId:string;
  @Output() showListEvent:EventEmitter<any> = new EventEmitter();
  testimonialForm:FormGroup;
  isSubmitted:boolean = false;

  /* Image Upload Handle*/
  imageDeleted:boolean = false;
  file:File;
  fileName:string = "";
  drawImagePath:string = Config.DefaultAvatar;
  imageFormControl:FormControl = new FormControl('', Validators.required);
  canvasSize:number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */


  constructor(private _objService:TestimonialService, private _formBuilder:FormBuilder) {
    this.objTestimonial.testimonialDate = new Date().toLocaleDateString();
    this.testimonialForm = this._formBuilder.group({
      "personName": ['', Validators.required],
      "organization": ['', Validators.required],
      "testimonialContent": ['', Validators.required],
      "email": ['', ValidationService.emailValidator],
      "imageFormControl": this.imageFormControl,
      designation: [''],
      fbUrl: ['', ValidationService.urlValidator],
      twitterUrl: ['', ValidationService.urlValidator],
      gplusUrl: ['', ValidationService.urlValidator],
      linkendinUrl: ['', ValidationService.urlValidator],
      active: ['']
    });

  }

  ngAfterViewInit() {
    if (!this.testimonialId)
      this.drawImageToCanvas(Config.DefaultAvatar);
  }

  ngOnInit() {
    if (this.testimonialId)
      this.getTestimonialDetail();
  }

  getTestimonialDetail() {
    this._objService.getTestimonialDetail(this.testimonialId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes:TestimonialModel) {
    this.objTestimonial = objRes;
    this.objTestimonial.testimonialDate = new Date(this.objTestimonial.testimonialDate).toLocaleDateString();
    let path:string = "";
    if (this.objTestimonial.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.objTestimonial.imageName);
    }
    else
      path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }


  saveTestimonial() {
    this.isSubmitted = true;
    if (this.testimonialForm.valid) {
      if (!this.testimonialId) {
        this._objService.saveTestimonial(this.objTestimonial, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateTestimonial(this.objTestimonial, this.file, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave:any) {
    this.showListEvent.emit(false); // is Form Canceled
    swal("Success !", objSave.message, "success")

  }

  triggerCancelForm() {
    let isCanceled = true;
    this.showListEvent.emit(isCanceled);
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");

  }

  /*Image handler */

  deleteImage(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        this._objService.deleteImage(this.objTestimonial.imageName, this.objTestimonial.imageProperties.imageExtension, this.objTestimonial.imageProperties.imagePath)
          .subscribe(res=> {
              this.imageDeleted = true;
              this.objTestimonial.imageName = "";
              this.drawImageToCanvas(Config.DefaultAvatar);
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  changeFile(args) {
    this.file = args;
    if (this.file)
      this.fileName = this.file.name;
  }

  drawImageToCanvas(path:string) {
    this.drawImagePath = path;
  }

  /* End ImageHandler */
}

