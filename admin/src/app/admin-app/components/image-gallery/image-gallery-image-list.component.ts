import {Component, ElementRef, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
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

  objListResponse: ImageGalleryResponse = new ImageGalleryResponse();
  error: any;
  albumId: string;
  dataSource:any;
  @ViewChild('prevCoverImage') prevCoverImage: ElementRef;
  showImageForm: boolean = false;
  imageId: string;
  displayedColumns = ['SN','Image Title','Active','Cover Image', 'Actions'];
  // /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 1;
  // /* End Pagination */


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
    swal("Alert !", objResponse.message, "info");

  }

  bindList(objRes: ImageGalleryResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);    
    this.preIndex = (this.perPage * (this.currentPage - 1));
    this.totalItems = objRes.totalItems;
    /* Pagination */
    if (objRes.dataList.length > 0) {

      /*End Pagination */
      if (!this.bindSort) {
        this.bindSort = true;
        this.sortTable();
      }
      else
        jQuery("table").trigger("update", [true]);
    }
  }

  sortTable() {
    setTimeout(()=> {
      jQuery('.tablesorter').tablesorter({
        headers: {
          2: {sorter: false},
          3: {sorter: false},
          4: {sorter: false}
        }
      });
    }, 50);

  }

  edit(imageId: string) {
    this.router.navigate(['/imagegallery/album/gallery/' + this.albumId + '/editor', imageId]);
    // this.showImageForm = true;
    // this.imageId = imageId;
  }

  addImage() {
    this.router.navigate(['/imagegallery/album/gallery/' + this.albumId + '/editor']);
    // this.showImageForm = true;
    // this.imageId = null;
  }

  delete(imageId: string) {
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
        this._objService.deleteAlbumImage(this.albumId, imageId)
          .subscribe(res=> {
              this.getAlbumImageList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }

  back() {
    this.router.navigate(['/imagegallery/album']); // cancelled true
  }

  showImageList(arg) {
    if (!arg) // is not Canceled
    {
      this.getAlbumImageList();
    }
    this.showImageForm = false;
    this.sortTable();
  }

  changeCoverImage(e) {
    let imageId = e.value;
    swal({
        title: "Are you sure?",
        text: "You are going to change the cover image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, change it!",
        closeOnConfirm: false
      },
      (isConfirm)=> {
        if (isConfirm) {
          let prevCoverImageId = this.prevCoverImage ? this.prevCoverImage.nativeElement.value : "";
          let objImage: ImageGalleryModel = new ImageGalleryModel();
          objImage._id = imageId;
          objImage.coverImage = true;
          this._objService.updateCoverImage(this.albumId, objImage)
            .subscribe(res=> {
                this.getAlbumImageList();
                swal("Changed!", res.message, "success");
              },
              error=> {
                swal("Alert!", error.message, "info");

              });

        } else {
          let prevCoverImageId = "";
          if (this.prevCoverImage.nativeElement.value)
            jQuery('input[name=rdbCoverImage][value=' + this.prevCoverImage.nativeElement.value + ']').prop('checked', true);

        }
      });

  }


  pageChanged(event) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getAlbumImageList();
  }


}

