import Swal from 'sweetalert2';
import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ImageSliderService} from "./image-slider.service";
import {ImageSliderModel} from "./image-slider.model";
import {ImageSliderEditorComponent}from "./image-slider-editor.component";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'image-slider-list',
  templateUrl: './image-slider-list.html'
})

export class ImageSliderComponent implements OnInit {
  objListResponse:ImageSliderModel[];
  displayedColumns = ['SN','Image Title', 'Active','Actions'];
  dataSource:any;

  ngOnInit() {
    this.getImageSliderList();
  }

  constructor(private router:Router, private _objService:ImageSliderService) {
  }

  getImageSliderList() {
    this._objService.getImageSliderList()
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:ImageSliderModel[]) {
    this.objListResponse = objRes;
    // this.preIndex = (this.perPage * (this.currentPage - 1));    
    this.dataSource = new MatTableDataSource(this.objListResponse);    
  }

  edit(id:string) {
    this.router.navigate(['/imageslider/editor',id]);
  }

  addImage() {
    this.router.navigate(['/imageslider/editor']);
  }

  delete(id:string) {
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
        let objSlider:ImageSliderModel = new ImageSliderModel();
        objSlider._id = id;
        objSlider.deleted = true;
        this._objService.deleteImageSlider(objSlider)
          .subscribe(res=> {
              this.getImageSliderList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }
}

