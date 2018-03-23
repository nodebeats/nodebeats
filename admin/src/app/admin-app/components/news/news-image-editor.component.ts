import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {NewsImageModel} from "./news.model";
import {NewsService} from "./news.service";
import {Config} from "../../../shared/configs/general.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'news-image-editor',
  templateUrl: './news-image-editor.html'
  // styles: [style]
})
export class NewsImageEditorComponent implements OnInit,AfterViewInit {
  imageExtension: any;
  imagePath: any;
  newsId:string;
  newsImageId:string;
  // objNewsImage: NewsImageModel = new NewsImageModel();
  // @Input() newsImageId: string;
  // @Input() newsId: string;
  // @Output() showImageListEvent: EventEmitter<any> = new EventEmitter();
  newsImageForm: FormGroup;
  isSubmitted: boolean = false;

  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.wide;
  /* End Image Upload handle */


  constructor(private location:Location,private activatedRoute:ActivatedRoute,private _objService: NewsService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param=>this.newsId=param['id']);
    activatedRoute.params.subscribe(param=>this.newsImageId=param['imageId']);
    this.newsImageForm = this._formBuilder.group({
      imageTitle: ['', Validators.required],
      imageAltText: ['', Validators.required],
      imageFormControl: this.imageFormControl,
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

  bindDetail(objRes: NewsImageModel) {
    this.fileName = objRes.imageName;
    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';
    this.newsImageForm.patchValue({
      imageTitle: objRes.imageTitle,
      imageAltText: objRes.imageAltText,
      active: objRes.active,
    });
    this.imageFormControl.patchValue(objRes.imageName);
  // (<FormControl>this.newsImageForm.controls["imageFormControl"]).patchValue(this.newsImageForm.value);
    
    
    let path: string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  saveNewsImage() {
    this.isSubmitted = true;
    if (this.newsImageForm.valid) {
      if (!this.newsImageId) {
        this._objService.saveNewsImage(this.newsId, this.newsImageForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateNewsImage(this.newsId, this.newsImageId, this.newsImageForm.value, this.file, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }

    }
  }

  resStatusMessage(objSave: any) {
    // this.showImageListEvent.emit(false); // is Form Canceled
    swal("Success !", objSave.message, "success")
    this.location.back();

  }

  triggerCancelForm() {
    this.location.back();
    // let isCanceled = true;
    // this.showImageListEvent.emit(isCanceled);
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");

  }

  /*Image handler */
  changeFile(args) {
    this.file = args;
    if (this.file)
      this.fileName = this.file.name;
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }

  deleteImage(id: string) {
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
        this._objService.deleteImage(this.fileName, this.imageExtension, this.imagePath)
          .subscribe(res=> {
              this.imageDeleted = true;
              this.fileName = "";
              this.drawImageToCanvas(Config.DefaultImage);
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }


  /* End ImageHandler */
}

