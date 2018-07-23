import Swal from 'sweetalert2';
import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild, ViewChildren} from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageGalleryModel, ImageGalleryResponse} from "./image-gallery.model";
import{ImageGalleryImageEditorComponent} from "./image-gallery-image-editor.component";
import {FadeInDirective}from '../../../shared/directives/fadeInDirective';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'image-gallery-image-list',
  templateUrl: './image-gallery-image-list.html',
  providers: [ImageGalleryService]
})

export class ImageListComponent implements OnInit {

  objListResponse: ImageGalleryResponse;
  error: any;
  albumId: string;
  @ViewChild('prevCoverImage') prevCoverImage: ElementRef;
  showImageForm: boolean = false;
  imageId: string;
  displayedColumns = ['SN','Image Title','Active','Cover Image', 'Actions'];
  dataSource:any;
  // /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  preIndex: number = 0;
  // /* End Pagination */

  @ViewChildren('coverImage') coverImageElement: any;
  
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private _objService: ImageGalleryService, private eleRef: ElementRef) {
    activatedRoute.params.subscribe(param => this.albumId=param['albumId']);
  }

  ngOnInit() {
    this.getAlbumImageList();
  }

  getAlbumImageList() {
    this._objService.getAlbumImageList(this.albumId, this.perPage, this.currentPage)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: ImageGalleryResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);    
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  edit(imageId: string) {
    this.router.navigate(['/imagegallery/album/gallery/' + this.albumId + '/editor', imageId]);
  }

  addImage() {
    this.router.navigate(['/imagegallery/album/gallery/' + this.albumId + '/editor']);
  }

  delete(imageId: string) {
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
        this._objService.deleteAlbumImage(this.albumId, imageId)
          .subscribe(res=> {
              this.getAlbumImageList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });

  }

  back() {
    this.router.navigate(['/imagegallery/album']); // cancelled true
  }

  changeCoverImage(e: any) {
    let imageId = e.value;
  Swal({
        title: "Are you sure?",
        text: "You are going to change the cover image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, change it!",
      })
      .then((isConfirm)=> {
        if (isConfirm.value) {
          let objImage: ImageGalleryModel = new ImageGalleryModel();
          objImage._id = imageId;
          objImage.coverImage = true;
          this._objService.updateCoverImage(this.albumId, objImage)
            .subscribe(res=> {
                this.getAlbumImageList();
                Swal("Changed!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error, "info");
              });
        } else {
          this.coverImageElement.filter((element: any) => {
            if(element.value === imageId)
              element.checked = false;
          });
        }
      });

  }


  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getAlbumImageList();
  }


}

