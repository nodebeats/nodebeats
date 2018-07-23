import Swal from 'sweetalert2';
import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {ImageAlbumModel} from "./image-gallery.model";
import {ImageGalleryService} from "./image-gallery.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'image-gallery-album-editor',
  templateUrl: './image-gallery-album-editor.html'
})

export class ImageAlbumEditorComponent implements OnInit {
  albumId:string;
  imageAlbumForm:FormGroup;
  isSubmitted:boolean = false;

  constructor(private router: Router, private _objService:ImageGalleryService, private _formBuilder:FormBuilder, private activatedRoute:ActivatedRoute) {
   activatedRoute.params.subscribe(res => this.albumId =res['albumId']);
    this.imageAlbumForm = this._formBuilder.group({
        "albumName": ['', Validators.required],
        "albumDescription": ['', Validators.required],
        "active": ['']
      }
    );
  }

  ngOnInit() {
    if (this.albumId)
      this.getImageAlbumDetail();
  }

  getImageAlbumDetail() {
    this._objService.getImageAlbumDetail(this.albumId)
      .subscribe(res => this.bindDetail(res),
        error => this.errorMessage(error));
  }
  
  bindDetail(objRes:ImageAlbumModel){
    this.imageAlbumForm.setValue({
      albumName:objRes.albumName,
      albumDescription:objRes.albumDescription,
      active:objRes.active
    });
  }

  saveAlbum() {
    this.isSubmitted = true;
    if (this.imageAlbumForm.valid) {
      if (!this.albumId) {
        this._objService.saveImageAlbum(this.imageAlbumForm.value)
          .subscribe(res => this.resStatusMessage(res),
            error =>this.errorMessage(error));
      }
      else {
        this._objService.updateImageAlbum(this.imageAlbumForm.value,this.albumId)
          .subscribe(res => this.resStatusMessage(res),
            error =>this.errorMessage(error));
      }
    }
  }

  resStatusMessage(res:any) {
    this.triggerCancelForm();
    Swal("Success !", res.message, "success")
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  triggerCancelForm() {
    this.router.navigate(['/imagegallery/album']);
  }
}

