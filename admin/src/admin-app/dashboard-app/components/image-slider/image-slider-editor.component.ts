import Swal from 'sweetalert2';
import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ImageSliderModel} from "./image-slider.model";
import {ImageSliderService} from "./image-slider.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'image-slider-editor',
  templateUrl: './image-slider-editor.html'
})
export class ImageSliderEditorComponent implements OnInit,AfterViewInit {
  imageExtension: any;
  imagePath: any;
  sliderId:string;
  imageSliderForm: FormGroup;
  isSubmitted: boolean = false;

  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */


  constructor(private router: Router, private activatedRoute:ActivatedRoute,private _objService: ImageSliderService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param=>this.sliderId=param['id']);
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

  bindDetail(objRes: ImageSliderModel) {
    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';
    this.fileName = objRes.imageName;
    this.imageSliderForm.patchValue({
      imageTitle:objRes.imageTitle,
      imageAltText:objRes.imageAltText,
      imagePrimaryContent:objRes.imagePrimaryContent,
      imageSecondaryContent:objRes.imageSecondaryContent,
      active:objRes.active
    });
    (<FormControl>this.imageSliderForm.controls['imageFormControl']).patchValue(this.fileName);
    let path: string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  saveImageSlider() {
    this.isSubmitted = true;
    (<FormControl>this.imageSliderForm.controls['imageFormControl']).patchValue(this.fileName);
    if (this.imageSliderForm.valid) {
      if (!this.sliderId) {
        this._objService.saveImageSlider(this.imageSliderForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateImageSlider(this.imageSliderForm.value, this.file,this.sliderId, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave: any) {
    this.triggerCancelForm();
    Swal("Success !", objSave.message, "success");
  }

  triggerCancelForm() {
    this.router.navigate(['/imageslider']);
  }

  errorMessage(objResponse: any) {
   Swal("Alert !", objResponse, "info");
  }

  /*Image handler */
  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }

  deleteImage(id: string) {
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


  /* End ImageHandler */
}

