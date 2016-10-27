import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ImageSliderService} from "./image-slider.service";
import{ImageSliderModel} from "./image-slider.model";
import {ImageSliderEditorComponent}from "./image-slider-editor.component";

@Component({
    selector: 'image-slider-list',
    templateUrl: 'admin-templates/image-slider/image-slider-list.html'
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
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
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
        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                let objSlider:ImageSliderModel = new ImageSliderModel();
                objSlider._id = id;
                objSlider.deleted = true;
                this._objService.deleteImageSlider(objSlider)
                    .subscribe(res=> {
                            this.getImageSliderList();
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });
    }

    showSliderList(arg) {
        if (!arg) // is not Canceled
            this.getImageSliderList();
        this.showForm = false;
        this.sortTable();
    }


}

