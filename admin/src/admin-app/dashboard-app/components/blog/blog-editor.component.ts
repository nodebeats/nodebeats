import { Router, ActivatedRoute } from '@angular/router';
 import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BlogTagModel, BlogModel, BlogCategoryResponse} from "./blog.model";
import {BlogService} from "./blog.service";
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'blog-editor',
  templateUrl: './blog-editor.html'
})
export class BlogEditorComponent implements AfterViewInit,OnInit {
  objBlog:BlogModel = new BlogModel();
  objCatList:BlogCategoryResponse = new BlogCategoryResponse();
  blogId:string;
  blogForm:FormGroup;
  editorFormControl:FormControl = new FormControl('', Validators.required);
  isSubmitted:boolean = false;
  autoCompleteData:string[];
  /* Image Upload Handle*/
  imageDeleted:boolean = false;
  file:File;
  fileName:string = "";
  drawImagePath:string = Config.DefaultWideImage;
  imageFormControl:FormControl = new FormControl('');
  canvasSize:number = ImageCanvasSizeEnum.wide;
  /* End Image Upload handle */

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _objService:BlogService, private _formBuilder:FormBuilder) {
    activatedRoute.params.subscribe(param => this.blogId = param['id']);
  }

  ngAfterViewInit() {
    if (!this.blogId)
      this.drawImageToCanvas(this.drawImagePath);
  }

  createForm() {
    this.blogForm = this._formBuilder.group({
      "blogTitle": ['', Validators.required],
      "blogSummary": ['', Validators.required],
      "blogAuthor": ['', Validators.required],
      "editorFormControl": this.editorFormControl,
      "blogCategory": ['', Validators.required],
      "tags": ['', Validators.required],
      "bannerImageTitle": [''],
      "bannerImageAltText": [''],
      "imageFormControl": this.imageFormControl,
      "status": [''],
      "active": ['']
    });
  }

  ngOnInit() {
    this.createForm();
    this.getCategoryList();
    /*active*/
    if (this.blogId)
      this.getBlogDetail();
    this.getBlogTagList();
  }

  getBlogTagList():void {
    this._objService.getBlogTagList()
      .subscribe(res =>this.bindTagForAutoComplete(res),
        error => this.errorMessage(error));
  }

  bindTagForAutoComplete(res:BlogTagModel[]) {
    let data:string[] = res.map(function (row) {
      return row.tag;
    });
    this.autoCompleteData = data;
  }

  getCategoryList() {
    this._objService.getBlogCategoryList(100, 1, true)
      .subscribe(res=>this.objCatList = res,
        error=>this.errorMessage(error)
      )
  }

  getBlogDetail() {
    this._objService.getBlogDetail(this.blogId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes:BlogModel) {
    let tags = objRes.tags.map(function (res: any) {
      return res.tag;
    });
    objRes.tags = tags;
    this.objBlog = objRes;
    this.editorFormControl.patchValue(objRes.blogDescription);
    let path:string = "";
    if (this.objBlog.bannerImage) {
      var cl = Config.Cloudinary;
      path = cl.url(this.objBlog.bannerImage);
    }
    else
      path = Config.DefaultWideImage;
    this.drawImageToCanvas(path);
  }


  saveBlog() {
    this.isSubmitted = true;
    this.editorFormControl.patchValue(this.objBlog.blogDescription);
    if (this.blogForm.valid) {
      if (!this.blogId) {
        this._objService.saveBlog(this.objBlog, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateBlog(this.objBlog, this.file, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave:any) {
    this.triggerCancelForm();
    Swal("Success !", objSave.message, "success");
  }

  editorValueChange(args: any) {
    this.objBlog.blogDescription = args;
    //  (<FormControl>this.newsForm.controls["editorFormControl"]).updateValue(args);
  }

  triggerCancelForm() {
    this.router.navigate(['/blog']);
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  /*Image Handler */
  changeFile(args: any) {
    this.file = args;
    this.fileName = this.file.name;
  }

  drawImageToCanvas(path:string) {
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
        this._objService.deleteImage(this.objBlog.bannerImage, this.objBlog.imageProperties.imageExtension, this.objBlog.imageProperties.imagePath)
          .subscribe(res=> {
              this.imageDeleted = true;
              this.objBlog.bannerImage = "";
              this.fileName = "";
              this.drawImageToCanvas(Config.DefaultWideImage);
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

