import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {NewsCategoryModel, NewsModel} from "./news.model";
import {NewsService} from "./news.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";


@Component({
    selector: 'news-editor',
    templateUrl: '../../views/news/news-editor.html'
    // styles: [style]
})
export class NewsEditorComponent implements AfterViewInit,OnInit {
    objNews:NewsModel = new NewsModel();
    objCatList:NewsCategoryModel[];
    @Input() newsId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    newsForm:FormGroup;
    id:string = "";
    editorFormControl:FormControl = new FormControl('', Validators.required)
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */


    constructor(private _objService:NewsService, private _formBuilder:FormBuilder) {
        this.objNews.newsDate = new Date().toLocaleDateString();
        this.newsForm = this._formBuilder.group({
            "newsTitle": ['', Validators.required],
            "newsSummary": ['', Validators.required],
            "newsAuthor": ['', Validators.required],
            "editorFormControl": this.editorFormControl,
            "selectCategory": ['', Validators.required],
            "newsDate": ['', Validators.required],
            "imageFormControl": this.imageFormControl,
            "active": ['']
        });

    }

    ngAfterViewInit() {
        if (!this.newsId)
            this.drawImageToCanvas(Config.DefaultImage);
    }

    ngOnInit() {
        this.getCategoryList();
        if (this.newsId)
            this.getNewsDetail();

    }

    getCategoryList() {
        this._objService.getNewsCategoryList(true)/*active*/
            .subscribe(res=>this.objCatList = res,
                error=>this.errorMessage(error)
            )
    }

    getNewsDetail() {
        this._objService.getNewsDetail(this.newsId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:NewsModel) {
        this.objNews = objRes;
        this.objNews.newsDate = new Date(this.objNews.newsDate).toLocaleDateString();
        this.editorFormControl.patchValue(objRes.newsDescription);
        this.imageFormControl.patchValue(objRes.image[0].imageName);
        this.fileName = objRes.image[0].imageName;
        let path:string = "";
        if (this.objNews.image[0]) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objNews.image[0].imageName);
        }
        else
            path = Config.DefaultImage;
        this.drawImageToCanvas(path);
    }


    saveNews() {
        this.isSubmitted = true;
        (<FormControl>this.newsForm.controls["editorFormControl"]).patchValue(this.objNews.newsDescription ? this.objNews.newsDescription : "");
        if (this.newsForm.valid) {
            if (!this.newsId) {
                this._objService.saveNews(this.objNews, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateNews(this.objNews, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));

            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showListEvent.emit(false); // is Form Canceled
      swal("Success !", objSave.message, "success")

    }

    editorValueChange(args) {
        this.objNews.newsDescription = args;
        // (<FormControl>this.newsForm.controls["editorFormControl"]).updateValue(args);
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    /*Image Handler */
    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    /* End Image Handler */

}

