import {Component, OnInit} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogDocumentModel} from "./blog.model";
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
    swal("Alert !", objResponse.message, "info");
  }

  bindList(objRes:BlogDocumentModel[]) {
    this.objListResponse = objRes;
    this.dataSource = new MatTableDataSource(this.objListResponse);
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
    this.router.navigate(['/blog/documents/'+ this.blogId + '/editor', id]);
  }

  addDoc() {
    this.router.navigate(['/blog/documents/'+ this.blogId + '/editor']);    
  }

  delete(id:string) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Document !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      ()=> {
        this._objService.deleteBlogDoc(this.blogId, id)
          .subscribe(res=> {
              this.getBlogDocList();
              swal("Deleted!", res.message, "success");
            },
            error=> {
              swal("Alert!", error.message, "info");

            });
      });
  }

  back() {
    this.router.navigate(['/blog']);
  }
}

