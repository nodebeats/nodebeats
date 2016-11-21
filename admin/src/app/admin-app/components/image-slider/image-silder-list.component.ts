import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ImageSliderService} from "./image-slider.service";
import{ImageSliderModel} from "./image-slider.model";
import {ImageSliderEditorComponent}from "./image-slider-editor.component";

@Component({
  selector: 'image-slider-list',
  templateUrl: '../../views/image-slider/image-slider-list.html'
})

export class ImageSliderComponent implements OnInit {

  objListResponse:ImageSliderModel[];
  error:any;
  showForm:boolean = false;
  sliderId:string;

  ngOnInit() {
    this.getImageSliderList();
  }

  constructor(private _objService:ImageSliderService) {
  }

  getImageSliderList() {
    this._objService.getImageSliderList()
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");

  }

  bindList(objRes:ImageSliderModel[]) {
    this.objListResponse = objRes;
    if (objRes.length > 0) {
      this.sortTable();

    }
  }

  sortTable() {
    setTimeout(()=> {
      jQuery('.tablesorter').tablesorter({
        headers: {
          2: {sorter: false},
          3: {sorter: false}
        }
      });
    }, 50);
  }

  edit(id:string) {
    this.showForm = true;
    this.sliderId = id;
  }

  addImage() {
    this.showForm = true;
    this.sliderId = null;
  }

  delete(id:string) {
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
        let objSlider:ImageSliderModel = new ImageSliderModel();
        objSlider._id = id;
        objSlider.deleted = true;
        this._objService.deleteImageSlider(objSlider)
          .subscribe(res=> {
              this.getImageSliderList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }

  showSliderList(arg) {
    if (!arg) // is not Canceled
      this.getImageSliderList();
    this.showForm = false;
    this.sortTable();
  }


}

