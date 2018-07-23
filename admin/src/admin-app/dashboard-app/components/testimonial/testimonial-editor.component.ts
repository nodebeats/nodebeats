import Swal from 'sweetalert2';
import {Component, AfterViewInit, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TestimonialModel} from "./testimonial.model";
import {TestimonialService} from "./testimonial.service";
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ValidationService} from "../../../shared/services/validation.service";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'testimonial-editor',
  templateUrl: './testimonial-editor.html'
})
export class TestimonialEditorComponent implements OnInit,AfterViewInit {
  imageExtension: any;
  imagePath: any;
  testimonialId:string;
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


  constructor(private location: Location, private activatedRoute: ActivatedRoute, private _objService:TestimonialService, private _formBuilder:FormBuilder) {
    activatedRoute.params.subscribe(param => this.testimonialId = param['testimonialId']);
    this.testimonialForm = this._formBuilder.group({
      personName: ['', Validators.required],
      organization: ['', Validators.required],
      testimonialContent: ['', Validators.required],
      email: ['', ValidationService.emailValidator],
      designation: [''],
      facebookURL: ['', ValidationService.urlValidator],
      twitterURL: ['', ValidationService.urlValidator],
      gPlusURL: ['', ValidationService.urlValidator],
      linkedInURL: ['', ValidationService.urlValidator],
      active: [''],
      imageFormControl: this.imageFormControl
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
    
    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';

    this.testimonialForm.patchValue({
      personName:objRes.personName,
      organization: objRes.organization,
      testimonialContent: objRes.testimonialContent,
      email: objRes.email,
      designation: objRes.designation,
      facebookURL: objRes.facebookURL,
      twitterURL: objRes.twitterURL,
      gPlusURL: objRes.gPlusURL,
      linkedInURL: objRes.linkedInURL,
      active: objRes.active,
    });

    (<FormControl>this.testimonialForm.controls['imageFormControl']).patchValue(this.fileName);
    this.fileName = objRes.imageName;

    let path:string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
    }
    else
      path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }


  saveTestimonial() {
    this.isSubmitted = true;
    if (this.testimonialForm.valid) {
      if (!this.testimonialId) {
        this._objService.saveTestimonial(this.testimonialForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateTestimonial(this.testimonialForm.value, this.file, this.imageDeleted, this.testimonialId)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave:any) {
    this.location.back();
    Swal("Success !", objSave.message, "success")
  }

  triggerCancelForm() {
    this.location.back();
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  /*Image handler */

  deleteImage(id:string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
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

  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path:string) {
    this.drawImagePath = path;
  }
  /* End ImageHandler */
}

