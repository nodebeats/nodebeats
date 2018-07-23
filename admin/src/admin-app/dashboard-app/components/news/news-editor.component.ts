import Swal from 'sweetalert2';
import {Component, AfterViewInit, OnInit} from '@angular/core';
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
  today: any = new Date();  
  newsForm: FormGroup;
  editorFormControl: FormControl = new FormControl('', Validators.required);
  isSubmitted: boolean = false;
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  dataModel: any;
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
    this.objNews.newsDescription = objRes.newsDescription;
    this.imageExtension = objRes.image[0].imageProperties.imageExtension?objRes.image[0].imageProperties.imageExtension: '';
    this.imagePath = objRes.image[0].imageProperties.imagePath?objRes.image[0].imageProperties.imagePath: '';
    // objRes.newsDate = this.changeDateFormat(objRes.newsDate);
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
    this.fileName = objRes.image[0].imageName?objRes.image[0].imageName: '';
    let path: string = "";
    if (this.fileName) {
      var cl = Config.Cloudinary;
      path = cl.url(this.fileName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  saveNews() {
    this.isSubmitted = true;
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
    Swal("Success !", objSave.message, "success")
    this.location.back();
  }

  editorValueChange(args: any) {
    (<FormControl>this.newsForm.controls["newsDescription"]).patchValue(args);
  }

  triggerCancelForm() {
    this.location.back();
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  /*Image Handler */
  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path: string) {
    this.drawImagePath = path;
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
  /* End Image Handler */
}

