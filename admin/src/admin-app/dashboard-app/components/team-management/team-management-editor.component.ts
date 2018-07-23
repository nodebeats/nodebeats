import {Component, AfterViewInit, OnInit} from '@angular/core';
import {TeamManagementModel} from "./team-managment.model";
import {TeamManagementService} from "./team-managment.service";
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ValidationService} from "../../../shared/services/validation.service";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'team-management-editor',
  templateUrl: './team-management-editor.html'
})
export class TeamManagementEditorComponent implements OnInit,AfterViewInit {
  memberId: string;
  teamMgmtForm: FormGroup;
  isSubmitted: boolean = false;

  /* Image Upload Handle*/
  imageDeleted: boolean = false;
  file: File;
  fileName: string = "";
  drawImagePath: string = Config.DefaultAvatar;
  imageFormControl: FormControl = new FormControl('', Validators.required);
  canvasSize: number = ImageCanvasSizeEnum.small;
  imageExtension:any;
  imagePath:any;
  /* End Image Upload handle */


  constructor(private location: Location, private activatedRoute: ActivatedRoute, private _objService: TeamManagementService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param => this.memberId = param['memberId']);
    this.teamMgmtForm = this._formBuilder.group({
      teamMemberName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      imageFormControl: this.imageFormControl,
      designation: ['', Validators.required],
      address: [''],
      description: [''],
      facebookURL: ['', ValidationService.urlValidator],
      twitterURL: ['', ValidationService.urlValidator],
      googlePlusURL: ['', ValidationService.urlValidator],
      linkedInURL: ['', ValidationService.urlValidator],
      active: ['']
    });

  }

  ngAfterViewInit() {
    if (!this.memberId)
      this.drawImageToCanvas(Config.DefaultAvatar);
  }

  ngOnInit() {
    if (this.memberId)
      this.getTeamMemberDetail();
  }

  getTeamMemberDetail() {
    this._objService.getTeamMemberDetail(this.memberId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes: TeamManagementModel) {
    this.fileName=objRes.imageName;

    this.imageExtension = objRes.imageProperties? objRes.imageProperties.imageExtension: '';
    this.imagePath = objRes.imageProperties? objRes.imageProperties.imagePath : '';

    (<FormControl>this.teamMgmtForm.controls['imageFormControl']).patchValue(this.fileName);
    this.teamMgmtForm.patchValue({
      teamMemberName: objRes.teamMemberName,
      email: objRes.email,
      designation: objRes.designation,
      address: objRes.address,
      description: objRes.description,
      facebookURL: objRes.facebookURL,
      twitterURL: objRes.twitterURL,
      googlePlusURL: objRes.googlePlusURL,
      linkedInURL: objRes.linkedInURL,
      active: objRes.active

    })
    let path: string = "";
    if (objRes.imageName) {
      var cl = Config.Cloudinary;
      path = cl.url(objRes.imageName);
    }
    else
      path = Config.DefaultAvatar;
    this.drawImageToCanvas(path);
  }

  saveTeamMember() {
    this.isSubmitted = true;
    if (this.teamMgmtForm.valid) {
      if (!this.memberId) {
        this._objService.saveTeamMember(this.teamMgmtForm.value, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateTeamMember(this.teamMgmtForm.value,this.memberId, this.file, this.imageDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave: any) {
    this.triggerCancelForm();
    Swal("Success !", objSave.message, "success");
  }

  triggerCancelForm() {
    this.location.back();
  }

  errorMessage(objResponse: any) {
   Swal("Alert !", objResponse, "info");
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


  /* End ImageHandler */
}

