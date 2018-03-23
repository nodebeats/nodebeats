import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {PartnerModel} from "./partner.model";
import {PartnerService} from "./partner.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../../shared/services/validation.service";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'partner-editor',
  templateUrl: './partner-editor.html'
})
export class PartnerEditorComponent implements OnInit,AfterViewInit {
  // objPartner: PartnerModel = new PartnerModel();
  // @Input() partnerId: string;
  // @Output() showPartnerListEvent: EventEmitter<any> = new EventEmitter();
  partnerId:string;
  partnerForm: FormGroup;
  isSubmitted: boolean = false;
  imageExtension: any;
  imagePath: any;

  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */


  constructor(private location:Location,private activatedRoute:ActivatedRoute,private _objService: PartnerService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param=>this.partnerId=param['id']);
    this.partnerForm = _formBuilder.group({
      "partnerName": ['', Validators.required],
      "imageAltText": ['', Validators.required],
      "linkURL": ['', Validators.compose([Validators.required, ValidationService.urlValidator])],
      "active": [''],
      "imageFormControl": this.imageFormControl
    });
  }

  ngAfterViewInit() {
    if (!this.partnerId)
      this.drawImageToCanvas(Config.DefaultImage);
  }

  ngOnInit() {
    if (this.partnerId)
      this.getImageDetail();
  }

  getImageDetail() {
    this._objService.getPartnerDetail(this.partnerId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes: PartnerModel) {
    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';
    this.fileName = objRes.imageName;
    this.partnerForm.patchValue({
      partnerName: objRes.partnerName,
      imageAltText: objRes.imageAltText,
      linkURL: objRes.linkURL,
      active: objRes.active,
      

    });
    (<FormControl>this.partnerForm.controls['imageFormControl']).patchValue(this.fileName);
    this.fileName = objRes.imageName;
    let path: string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
    }
    else
      path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }


  savePartner() {
    this.isSubmitted = true;
    (<FormControl>this.partnerForm.controls['imageFormControl']).patchValue(this.fileName);

    if (this.partnerForm.valid) {
      if (!this.partnerId) {
        this._objService.savePartner(this.partnerForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updatePartner(this.partnerForm.value, this.file, this.imageDeleted, this.partnerId)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave: any) {
    swal("Success !", objSave.message, "success")
    this.location.back();
  }

  triggerCancelForm() {
    this.location.back();
  }

  errorMessage(objResponse: any) {
    swal("Alert !", objResponse.message, "info");

  }

  /*Image handler */
  changeFile(args) {
    this.file = args;
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

