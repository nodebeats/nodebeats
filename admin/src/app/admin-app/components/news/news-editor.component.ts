import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {NewsCategoryModel, NewsModel} from "./news.model";
import {NewsService} from "./news.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'news-editor',
  templateUrl: './news-editor.html'
})
export class NewsEditorComponent implements AfterViewInit,OnInit {
  objNews: NewsModel = new NewsModel();
  imageExtension: any;
  imagePath: any;
  objCatList: NewsCategoryModel[];
  newsId:string;
  // @Input() newsId: string;
  // @Output() showListEvent: EventEmitter<any> = new EventEmitter();
  newsForm: FormGroup;
  id: string = "";
  editorFormControl: FormControl = new FormControl('', Validators.required);
  isSubmitted: boolean = false;
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */


  constructor(private location:Location,private activatedRoute:ActivatedRoute,private _objService: NewsService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param=>this.newsId=param['id']);
    this.newsForm = this._formBuilder.group({
      "newsTitle": ['', Validators.required],
      "newsSummary": ['', Validators.required],
      "newsAuthor": ['', Validators.required],
      "categoryID": ['', Validators.required],
      "newsDate": ['', Validators.required],
      "active": [''],
      "newsDescription": this.editorFormControl
    });
  }

  ngAfterViewInit() {
    if (!this.newsId) {
      this.drawImageToCanvas(Config.DefaultImage);
    }
  }

  ngOnInit() {
    this.getCategoryList();
    if (this.newsId)
      this.getNewsDetail();

  }

  getCategoryList() {
    this._objService.getNewsCategoryList(true)/*active*/
      .subscribe(res=>this.bindCatList(res),
        error=>this.errorMessage(error)
      )
  }

  bindCatList(objCatList:NewsCategoryModel[]){
    this.objCatList = objCatList;
  }

  changeDateFormat(data: string) {
    return new Date(data);
  }

  getNewsDetail() {
    this._objService.getNewsDetail(this.newsId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes: NewsModel) {
    this.imageExtension = objRes.image[0].imageProperties.imageExtension;
    this.imagePath = objRes.image[0].imageProperties.imagePath;
    this.objNews.newsDescription = objRes.newsDescription;
    objRes.newsDate = this.changeDateFormat(objRes.newsDate);
    // this.objNews = objRes;
    this.newsForm.patchValue({
      newsTitle: objRes.newsTitle,
      newsSummary: objRes.newsSummary,
      categoryID: objRes.categoryID,
      newsAuthor: objRes.newsAuthor,
      newsDate: objRes.newsDate,
      active: objRes.active,
    })
    this.editorFormControl.patchValue(objRes.newsDescription);
    this.imageFormControl.patchValue(objRes.image[0].imageName);
    this.fileName = objRes.image[0].imageName;
    let path: string = "";
    if (objRes.image[0]) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.image[0].imageName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  saveNews() {
    this.isSubmitted = true;
    // (<FormControl>this.newsForm.controls["editorFormControl"]).patchValue(this.newsForm.value);
    if (this.newsForm.valid) {
      if (!this.newsId) {
        this._objService.saveNews(this.newsForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateNews(this.newsForm.value, this.file, this.imageDeleted, this.newsId)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));

      }
    }
  }

  resStatusMessage(objSave: any) {
    // this.showListEvent.emit(false); // is Form Canceled
    swal("Success !", objSave.message, "success")
    this.location.back();

  }

  editorValueChange(args) {
    // this.newsForm = args;
    (<FormControl>this.newsForm.controls["newsDescription"]).patchValue(args);
  }

  triggerCancelForm() {
    // let isCanceled = true;
    // this.showListEvent.emit(isCanceled);
    this.location.back();
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");

  }

  /*Image Handler */
  changeFile(args) {
    this.file = args;
    this.fileName = this.file.name;
    // this.drawImageToCanvas(this.fileName);
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
  }

  deleteImage(imageId) {
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

  /* End Image Handler */

}

