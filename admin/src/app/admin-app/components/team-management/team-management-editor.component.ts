import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TeamManagementModel} from "./team-managment.model";
import {TeamManagementService} from "./team-managment.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ValidationService} from "../../../shared/services/validation.service";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
    selector: 'team-management-editor',
    templateUrl: '../../views/team-management/team-management-editor.html'
    // styles: [style]
})
export class TeamManagementEditorComponent implements OnInit,AfterViewInit {
    objTeam:TeamManagementModel = new TeamManagementModel();
    @Input() memberId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    teamMgmtForm:FormGroup;
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultAvatar;
    imageFormControl:FormControl = new FormControl('');
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */


    constructor(private _objService:TeamManagementService, private _formBuilder:FormBuilder) {
        this.teamMgmtForm = this._formBuilder.group({
            "teamMemberName": ['', Validators.required],
            "email": ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            "imageFormControl": this.imageFormControl,
            designation: ['',Validators.required],
            address: [''],
            description: [''],
            fbUrl: ['', ValidationService.urlValidator],
            twitterUrl: ['', ValidationService.urlValidator],
            gplusUrl: ['', ValidationService.urlValidator],
            linkendinUrl: ['', ValidationService.urlValidator],
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

    bindDetail(objRes:TeamManagementModel) {
        this.objTeam = objRes;
        let path:string = "";
        if (this.objTeam.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objTeam.imageName);
        }
        else
            path = Config.DefaultAvatar;
        this.drawImageToCanvas(path);
    }


    saveTeamMember() {
        this.isSubmitted = true;
        if (this.teamMgmtForm.valid) {
            if (!this.memberId) {
                this._objService.saveTeamMember(this.objTeam, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateTeamMember(this.objTeam, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showListEvent.emit(false); // is Form Canceled
      swal("Success !", objSave.message, "success")

    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
      swal("Alert !", objResponse.message, "info");

    }

    /*Image handler */
    changeFile(args) {
        this.file = args;
        if (this.file) {
        }
        this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    deleteImage(id:string) {
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
          this._objService.deleteImage(this.objTeam.imageName, this.objTeam.imageProperties.imageExtension, this.objTeam.imageProperties.imagePath)
            .subscribe(res=> {
                this.imageDeleted = true;
                this.objTeam.imageName="";
                this.drawImageToCanvas(Config.DefaultAvatar);
                swal("Deleted!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });
        });

    }


    /* End ImageHandler */
}

