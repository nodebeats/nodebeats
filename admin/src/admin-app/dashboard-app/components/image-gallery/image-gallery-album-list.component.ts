import Swal from "sweetalert2";
import {
  Component,
  OnInit
} from "@angular/core";
import { ImageGalleryService } from "./image-gallery.service";
import { ImageAlbumModel, ImageAlbumResponse } from "./image-gallery.model";
import { ImageAlbumEditorComponent } from "./image-gallery-album-editor.component";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "image-gallery-album-list",
  templateUrl: "./image-gallery-album-list.html"
})
export class ImageAlbumListComponent implements OnInit {
  objListResponse: ImageAlbumResponse;
  displayedColumns = ["SN", "Album Name", "Active", "Actions"];
  dataSource: any;
  showForm: boolean = false;
  albumId: string;
  // /* Pagination */
  pageSizeOptions = [5, 10, 25, 50, 100];
  perPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 1;
  // /* End Pagination */
  preIndex: number = 0;

  ngOnInit() {
    this.getAlbumList();
  }

  constructor(
    private _objService: ImageGalleryService,
    private router: Router
  ) {}

  getAlbumList() {
    this._objService
      .getImageAlbumList(this.perPage, this.currentPage)
      .subscribe(res => this.bindList(res), error => this.errorMessage(error));
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes: ImageAlbumResponse) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse.dataList);
    this.totalItems = objRes.totalItems;
    this.preIndex = (this.perPage * (this.currentPage - 1));
  }

  addImageAlbum() {
    this.router.navigate(["/imagegallery/album/editor"]);
  }

  edit(id: string) {
    this.router.navigate(["/imagegallery/album/editor", id]);
  }

  showImageList(albumId: string) {
    this.router.navigate(["/imagegallery/album/gallery", albumId]);
  }

  delete(id: string) {
    Swal({
      title: "Are you sure?",
      text: "You will not be able to recover this Album !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        let objTemp: ImageAlbumModel = new ImageAlbumModel();
        objTemp._id = id;
        objTemp.deleted = true;
        this._objService.deleteImageAlbum(objTemp).subscribe(
          res => {
            this.getAlbumList();
            Swal("Deleted!", res.message, "success");
          },
          error => {
            Swal("Alert!", error, "info");
          }
        );
      }
    });
  }

  pageChanged(event: any) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getAlbumList();
  }
}
