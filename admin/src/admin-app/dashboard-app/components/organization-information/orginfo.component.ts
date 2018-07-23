import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {OrganizationInfoService} from "./orginfo.service";
import {OrganizationModel} from "./orginfo.model";
import {AlertModel} from "../../../shared/models/alert.model";
import {ValidationService} from "../../../shared/services/validation.service";
import{CountryListService, CountryModel}from "../../../shared/services/countrylist.service";
import{Config}from "../../../shared/configs/general.config";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import Swal from 'sweetalert2';

@Component({
  selector: 'google-analytics',
  templateUrl: './orginfo.html'
})
export class OrganizationInfoComponent implements OnInit, AfterViewInit {
  objAlert: AlertModel = new AlertModel();
  orgInfoForm: FormGroup;
  objCountyList: CountryModel[];
  isPost: boolean;
  isSubmitted: boolean = false;
  orgId:string;
  imageExtension:any;
  imagePath:any;
  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultImage;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.small;
  /* End Image Upload handle */

  constructor(private _objService: OrganizationInfoService, private _formBuilder: FormBuilder, private countryService: CountryListService) {
    this.orgInfoForm = this._formBuilder.group({
      orgName: ['', Validators.required],
      "country": ['', Validators.required],
      "city": ['', Validators.required],
      "streetAddress": ['', Validators.required],
      "organizationEmail": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      "imageFormControl": this.imageFormControl,
      region: [''],
      state: [''],
      addressLine: [''],
      zipAddress: [''],
      postalCode: [''],
      faxNumber: [''],
      phoneNumber: [''],
      mobileNumber: [''],
      facebookURL: ['', ValidationService.urlValidator],
      twitterURL: ['', ValidationService.urlValidator],
      googlePlusURL: ['', ValidationService.urlValidator],
      linkedInURL: ['', ValidationService.urlValidator],
      youtubeURL: ['', ValidationService.urlValidator],
      instagramURL: ['', ValidationService.urlValidator],
      slogan: ['']
    });
  }

  ngOnInit() {
    this.getCountryList();
    this.getOrgInfo();
    this.objAlert.showAlert("info", "Information", "Please fill the necessary information about the organization.");
  }

  ngAfterViewInit() {
    let path = Config.DefaultImage;
    this.drawImageToCanvas(path);
  }

  getCountryList() {
    this.countryService.getCountryList()
      .subscribe(res=> {
        this.objCountyList = res;
      });
  }

  getOrgInfo() {
    this._objService.getOrgInfoDetail()
      .subscribe(res =>this.bindInfo(res),
        error => this.errorMessage(error));
  }

  bindInfo(objOrg: OrganizationModel) {
    this.imageExtension = objOrg.imageProperties? objOrg.imageProperties.imageExtension: '';
    this.imagePath = objOrg.imageProperties? objOrg.imageProperties.imagePath : '';
    this.orgId=objOrg._id;
    (<FormControl>this.orgInfoForm.controls['imageFormControl']).patchValue(this.fileName);
    this.orgInfoForm.patchValue({
      orgName: objOrg.orgName,
      country: objOrg.country,
      city: objOrg.city,
      streetAddress: objOrg.streetAddress,
      organizationEmail: objOrg.organizationEmail,
      region: objOrg.region,
      state: objOrg.state,
      addressLine: objOrg.addressLine,
      zipAddress: objOrg.zipAddress,
      postalCode: objOrg.postalCode,
      faxNumber: objOrg.faxNumber,
      phoneNumber: objOrg.phoneNumber,
      mobileNumber: objOrg.mobileNumber,
      facebookURL: objOrg.facebookURL,
      twitterURL: objOrg.twitterURL,
      googlePlusURL: objOrg.googlePlusURL,
      linkedInURL: objOrg.linkedInURL,
      youtubeURL: objOrg.youtubeURL,
      instagramURL: objOrg.instagramURL,
      slogan: objOrg.slogan
    })
    let path = Config.DefaultImage;
      if (objOrg.logoImageName) {
        this.fileName = objOrg.logoImageName;
        let cl = Config.Cloudinary;
        path = cl.url(objOrg.logoImageName);
      }
      else{
        path = Config.DefaultAvatar;
      }
    this.drawImageToCanvas(path);
  }

  saveOrgInfo() {
    this.isSubmitted = true;
    if (this.orgInfoForm.valid) {
      if (!this.orgId) {
        this.isPost = true;
        this._objService.saveOrgInfo(this.orgInfoForm.value, this.file)
          .subscribe((res: any) => this.resStatusMessage(res),
            (error: any) => this.errorMessage(error));
      }
      else {
        this.isPost = this.file ? true : false;
        this._objService.updateOrgInfo(this.orgInfoForm.value,this.file, this.orgId, this.imageDeleted)
          .subscribe((res: any) => this.resStatusMessage(res),
            (error: any) => this.errorMessage(error));
      }
    }

  }

  resStatusMessage(res: any) {
    if (this.isPost)
      this.getOrgInfo();
    this.file = null;
    Swal("Success !", res.message, "success")
  }

  errorMessage(objResponse: any) {
    this.objAlert.showAlert("danger", "Alert !!", objResponse, true);
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
  /* End Image Handler */
}

