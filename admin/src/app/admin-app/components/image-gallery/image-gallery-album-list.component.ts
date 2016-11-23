import {Component, ElementRef, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageAlbumModel, ImageAlbumResponse} from "./image-gallery.model";
import {ImageAlbumEditorComponent} from "./image-gallery-album-editor.component";
import {Paginator} from 'primeng/primeng';

@Component({
  selector: 'image-gallery-album-list',
  templateUrl: './image-gallery-album-list.html'
})

export class ImageAlbumListComponent implements OnInit {

  objListResponse:ImageAlbumResponse;
  showForm:boolean = false;
  albumId:string;
  @Output() showImageListEvent:EventEmitter<any> = new EventEmitter();
  @Input() isCanceled:string;
  // /* Pagination */
  perPage:number = 10;
  currentPage:number = 1;
  totalPage:number = 1;
  first:number = 0;
  bindSort:boolean = false;
  preIndex:number = 0;
  // /* End Pagination */

  ngOnInit() {
    this.getAlbumList();
  }

  constructor(private _objService:ImageGalleryService) {
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
    this.preIndex = (this.perPage * (this.currentPage - 1));

    /* Pagination */
    if (objRes.dataList.length > 0) {
      let totalPage = objRes.totalItems / this.perPage;
      this.totalPage = totalPage > 1 ? Math.ceil(totalPage) : 1;

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
    this.showForm = true;
    this.albumId = null;
  }

  edit(id:string) {
    this.showForm = true;
    this.albumId = id;
  }

  showList(args) {
    this.showForm = false;
    if (!args)// if not Cancelled
      this.getAlbumList();
    this.sortTable();
  }

  showImageList(albumId:string) {
    this.showImageListEvent.emit(albumId);
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
    this.perPage = event.rows;
    this.currentPage = (Math.floor(event.first / event.rows)) + 1;
    this.first = event.first;
    if (event.first == 0)
      this.first = 1;
    this.getAlbumList();
  }


}

