import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {NewsService} from "./news.service";
import {NewsImageModel, NewsImageResponse} from "./news.model";
import {ActivatedRoute,Router} from '@angular/router';
import {Location} from '@angular/common';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'news-image-list',
  templateUrl: './news-image-list.html'
})

export class NewsImageListComponent implements OnInit {
  objListResponse: NewsImageResponse;
  newsId: string;
  previousCoverImageId: string;
  showImageForm: boolean = false;
  imageId: string;
  displayedColumns = ['SN','Image Title','Active','Cover Image', 'Actions'];
  dataSource:any;

  constructor(private location:Location,private router:Router,private activatedRoute:ActivatedRoute,private _objService: NewsService) {
    activatedRoute.params.subscribe(param=> this.newsId= param['id']);
  }

  ngOnInit() {
    this.getNewsImageList();
  }

  getNewsImageList() {
    this._objService.getNewsImageList(this.newsId)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes: NewsImageResponse) {
    this.objListResponse = objRes;
    const filteredArray = this.objListResponse.image.filter(
      image => image.coverImage === true
    );
    this.previousCoverImageId = filteredArray[0]._id;
    this.dataSource = new MatTableDataSource(this.objListResponse.image);
  }

  edit(newsImageId: string) {
    this.router.navigate(['/news/image/'+ this.newsId +'/editor',newsImageId]);
  }

  addImage() {
    this.router.navigate(['/news/image/'+ this.newsId + '/editor']);
  }

  delete(id: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Image !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
          this._objService.deleteNewsImage(this.newsId, id)
            .subscribe(res=> {
                this.getNewsImageList();
                Swal("Deleted!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error.message, "info");
              });
          }
          else{
            console.log(result);
          }
      });
  }

  back() {
    this.location.back();
  }

  changeCoverImage(args) {
    console.log(args)
    let newsImageId = args.value;
    Swal({
          title: "Are you sure?",
          text: " you sure to change cover image ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, change it!"
        })
        .then((isConfirm)=> {
          if (isConfirm.value) {
            // let prevCoverImageId = this.prevCoverImage ? this.prevCoverImage.nativeElement.value : "";
            let objNewsImage: NewsImageModel = new NewsImageModel();
            objNewsImage._id = newsImageId;
            objNewsImage.coverImage = true;
            this._objService.updateNewsCoverImage(this.newsId, this.previousCoverImageId, objNewsImage)
              .subscribe(res=> {
                  this.getNewsImageList();
                  Swal("Changed!", res.message, "success");
                },
                error=> {
                  Swal("Alert!", error.message, "info");
                })
          } else   {
            this.previousCoverImageId = "";
            // let radio_button = document.getElementById('radio'+newsImageId);
            // console.log(radio_button)
            args.source._checked = false;
          }
        });
  }
}

