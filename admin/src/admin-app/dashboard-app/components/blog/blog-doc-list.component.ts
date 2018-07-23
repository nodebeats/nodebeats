import {Component, OnInit} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogDocumentModel} from "./blog.model";
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'blog-doc-list',
  templateUrl: './blog-doc-list.html'
})

export class BlogDocListComponent implements OnInit {
  displayedColumns = ['SN','Doc Title', 'Active', 'Actions'];
  dataSource: any;  
  objListResponse:BlogDocumentModel[];
  error:any;
  blogId:string;
  showForm:boolean = false;
  docId:string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _objService:BlogService) {
    activatedRoute.params.subscribe(param => this.blogId = param['blogId'])
  }

  ngOnInit() {
    this.getBlogDocList();
  }

  getBlogDocList() {
    this._objService.getBlogDocList(this.blogId)
      .subscribe(objRes =>this.bindList(objRes),
        error => this.errorMessage(error));
  }

  errorMessage(objResponse:any) {
    Swal("Alert !", objResponse, "info");
  }

  bindList(objRes:BlogDocumentModel[]) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse);
  }

  edit(id:string) {
    this.router.navigate(['/blog/documents/'+ this.blogId + '/editor', id]);
  }

  addDoc() {
    this.router.navigate(['/blog/documents/'+ this.blogId + '/editor']);    
  }

  delete(id:string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Document !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result)=> {
        if(result.value){
        this._objService.deleteBlogDoc(this.blogId, id)
          .subscribe(res=> {
              this.getBlogDocList();
              Swal("Deleted!", res.message, "success");
            },
            error=> {
              Swal("Alert!", error, "info");
            });
          }
      });
  }

  back() {
    this.router.navigate(['/blog']);
  }
}

