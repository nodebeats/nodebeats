import {Component, ElementRef, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageAlbumModel, ImageAlbumResponse} from "./image-gallery.model";
import {ImageAlbumEditorComponent} from "./image-gallery-album-editor.component";
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'image-gallery-album-list',
  templateUrl: './image-gallery-album-list.html'
})

export class ImageAlbumListComponent implements OnInit {

  objListResponse:ImageAlbumResponse;
  displayedColumns = ['SN','Album Name','Active', 'Actions'];
  dataSource:any;
  showForm:boolean = false;
  albumId:string;
  @Output() showImageListEvent:EventEmitter<any> = new EventEmitter();
  @Input() isCanceled:string;
  // /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage:number = 10;
  currentPage:number = 1;
  totalItems:number = 1;
  bindSort:boolean = false;
  preIndex:number = 1;
  // /* End Pagination */

  ngOnInit() {
    this.getAlbumList();
  }

  constructor(private _objService:ImageGalleryService, private router:Router) {
  }

  getAlbumList() {
    this._objService.getImageAlbumList(this.perPage, this.currentPage)
      .subscribe(res=>this.bindList(res),
        error=>this.errorMessage(error)
      )
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:ImageAlbumResponse) {
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
          3: {sorter: false}
        }
      });
    }, 50);
  }

  addImageAlbum() {
    this.router.navigate(['/imagegallery/album/editor']);
  }

  edit(id:string) {
    this.router.navigate(['/imagegallery/album/editor', id]);
  }

  // showList(args) {
  //   this.router.navigate(['/album',args])
  //   // this.showForm = false;
  //   if (!args)// if not Cancelled
  //     this.getAlbumList();
  //   this.sortTable();
  // }

  showImageList(albumId:string) {
    this.router.navigate(['/imagegallery/album/gallery', albumId]);
  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Album !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        let objTemp:ImageAlbumModel = new ImageAlbumModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteImageAlbum(objTemp)
          .subscribe(res=> {
              this.getAlbumList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });

  }


  pageChanged(event) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;    
    this.getAlbumList();
  }


}

