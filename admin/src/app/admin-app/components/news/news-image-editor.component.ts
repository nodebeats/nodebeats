import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {NewsImageModel} from "./news.model";
import {NewsService} from "./news.service";
import {Config} from "../../../shared/configs/general.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";


@Component({
  selector: 'news-image-editor',
  templateUrl: './news-image-editor.html'
  // styles: [style]
})
export class NewsImageEditorComponent implements OnInit,AfterViewInit {
  objNewsImage: NewsImageModel = new NewsImageModel();
  @Input() newsImageId: string;
  @Input() newsId: string;
  @Output() showImageListEvent: EventEmitter<any> = new EventEmitter();
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


  constructor(private _objService: NewsService, private _formBuilder: FormBuilder) {
    this.newsImageForm = this._formBuilder.group({
      "imageTitle": ['', Validators.required],
      "imageAltText": ['', Validators.required],
      "imageFormControl": this.imageFormControl,
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
    this.objNewsImage = objRes;
    let path: string = "";
    if (this.objNewsImage.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.objNewsImage.imageName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  saveNewsImage() {
    this.isSubmitted = true;
    if (this.newsImageForm.valid) {
      if (!this.newsImageId) {
        this._objService.saveNewsImage(this.newsId, this.objNewsImage, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateNewsImage(this.newsId, this.objNewsImage, this.file, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }

    }
  }

  resStatusMessage(objSave: any) {
    this.showImageListEvent.emit(false); // is Form Canceled
    swal("Success !", objSave.message, "success")

  }

  triggerCancelForm() {
    let isCanceled = true;
    this.showImageListEvent.emit(isCanceled);
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
        this._objService.deleteImage(this.objNewsImage.imageName, this.objNewsImage.imageProperties.imageExtension, this.objNewsImage.imageProperties.imagePath)
          .subscribe(res=> {
              this.imageDeleted = true;
              this.objNewsImage.imageName = "";
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

