import Swal from 'sweetalert2';
import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ImageGalleryModel} from "./image-gallery.model";
import {ImageGalleryService} from "./image-gallery.service";
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'image-gallery-image-editor',
  templateUrl: './image-gallery-image-editor.html'
})

export class ImageGalleryImageEditorComponent implements OnInit,AfterViewInit {
  imageExtension: any;
  imagePath: any;
  imageId:string;
  albumId:string;
  imageForm:FormGroup;
  isSubmitted:boolean = false;
  /* Image Upload Handle*/
  imageDeleted:boolean = false;
  file:File;
  fileName:string = "";
  drawImagePath:string = Config.DefaultImage;
  imageFormControl:FormControl = new FormControl('', Validators.required);
  canvasSize:number = ImageCanvasSizeEnum.wide;
  /* End Image Upload handle */

  constructor(private location: Location, private _objService:ImageGalleryService, private _formBuilder:FormBuilder, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => this.albumId = param['albumId']);
    activatedRoute.params.subscribe(param => this.imageId = param['imageId']);
    
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
    this.fileName=objRes.imageName;
    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';
    (<FormControl>this.imageForm.controls['imageFormControl']).patchValue(this.fileName);
    this.imageForm.patchValue({
      imageTitle:objRes.imageTitle,
      imageAltText:objRes.imageAltText,
      active:objRes.active
    })
    let path:string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
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
        this._objService.saveImage(this.albumId, this.imageForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateImage(this.albumId, this.imageForm.value, this.file,this.imageId, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave:any) {
    this.triggerCancelForm();
    Swal("Success !", objSave.message, "success");
  }

  triggerCancelForm() {
    this.location.back();
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  /*Image handler */
  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path:string) {
    this.drawImagePath = path;
  }

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
  /* End ImageHandler */
}

