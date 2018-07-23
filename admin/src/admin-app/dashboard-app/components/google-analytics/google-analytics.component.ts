import {Component, OnInit} from '@angular/core';
import {GoogleAnalyticsService} from "./google-analytics.service";
import {GoogleAnalyticsModel} from "./google-analytics.model";
import {Alert} from "../../../shared/components/alert/alert";
import {AlertModel} from "../../../shared/models/alert.model";
import {ValidationService}from "../../../shared/services/validation.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {DocumentUploader} from "../../../shared/components/doc-uploader.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'google-analytics',
  templateUrl: './google-analytics.html'
})
export class GoogleAnalyticsComponent implements OnInit {
  objAnalytics: GoogleAnalyticsModel = new GoogleAnalyticsModel();
  error: any;
  objAlert: AlertModel = new AlertModel();
  analyticsForm: FormGroup;
  isPost: boolean;
  isSubmitted: boolean = false;

  /* file upload */
  allowedExt: string[] = ['json'];
  allowedSize: number = 1; //MB
  fileDeleted: boolean = false;
  file: File;
  fileName: string = "";
  docFormControl: FormControl = new FormControl('', Validators.required);
  /* End File Upload handle */

  constructor(private _objService: GoogleAnalyticsService, private _formBuilder: FormBuilder) {
    this.analyticsForm = this._formBuilder.group({
      trackingId: ['', Validators.required],
      viewId: ['', Validators.required],
      docFormControl: this.docFormControl,
      pollingInterval: ['5', Validators.compose([ValidationService.minValueValidator(1), Validators.required])]
    });
  }

  ngOnInit() {
    this.getGoogleAnalytics();
  }

  getGoogleAnalytics() {
    this._objService.getAnalyticsDetail()
      .subscribe(res =>this.detailView(res),
        error => this.errorMessage(error));
  }

  detailView(objRes: GoogleAnalyticsModel) {
    objRes.pollingInterval = objRes.pollingInterval / 60000;
    this.objAnalytics = objRes;
    this.fileName = this.objAnalytics.serviceAccountKeyFileName;
    // this.isFresh = false;
  }

  saveAnalytics() {
    this.isSubmitted = true;
    //this.fileControl.updateValue(this.fileName);
    if (this.analyticsForm.valid) {
      let objAnalyticsSave = new GoogleAnalyticsModel();
      Object.assign(objAnalyticsSave, this.objAnalytics);
      objAnalyticsSave.pollingInterval = this.analyticsForm.controls['pollingInterval'].value * 60000;
      if (!this.objAnalytics._id) {
        this.isPost = true;
        this._objService.saveGoogleAnalytics(objAnalyticsSave, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this.isPost = false;
        this._objService.updateGoogleAnalytics(objAnalyticsSave, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  // validateForm() {
  //     if ((this.objAnalytics.api_Key != "" && typeof this.objAnalytics.api_Key != "undefined") || (this.objAnalytics.host != "" && typeof this.objAnalytics.host != "undefined"))
  //         return true;
  //     else {
  //         this.objAlert.showAlert("danger", "Alert !!", "Please Enter Either Host or API Key");
  //
  //     }
  // }

  resStatusMessage(objResponse: any) {
    this.objAlert.hideAlert();
    if (this.isPost)
      this.getGoogleAnalytics();
    Swal("Success !", objResponse.message, "success")
  }

  errorMessage(res: any) {
    this.objAlert.showAlert("danger", "Alert !!", res, true);
  }

  /*
   File Handle
   */
  onFileSelect(args: any) {
    this.file = args;
    if (this.file)
      this.fileName = this.file.name;
  }

  onDeleteFile(imageId: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this File !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        this._objService.deleteFile(this.objAnalytics.serviceAccountKeyFileName, this.objAnalytics.docProperties.docPath)
          .subscribe(res=> {
              this.fileName = "";
             Swal("Deleted!", res.message, "success");
            },
            error=> {
             Swal("Alert!", error, "info");
            });
          }
      });
  }

}

