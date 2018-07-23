import {Component, OnInit} from '@angular/core';
import {BlogDocumentModel} from "./blog.model";
import {BlogService} from "./blog.service";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'blog-doc-editor',
  templateUrl: './blog-doc-editor.html'
})
export class BlogDocEditorComponent implements OnInit {
  objBlogDoc: BlogDocumentModel = new BlogDocumentModel();
  docId: string;
  blogId: string;
  blogDocForm: FormGroup;
  isSubmitted: boolean = false;
  /* File Upload Handle*/
  allowedExt: string[] = ['pdf', 'doc', 'ppt', 'pptx', 'docx'];/// For valdiation of file ext
  allowedSize: number = 3;
  fileDeleted: boolean = false;
  file: File;
  fileName: string;
  docFormControl: FormControl = new FormControl('', Validators.required);
  /* End File Upload handle */

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _objService: BlogService, private _formBuilder: FormBuilder) {
    activatedRoute.params.subscribe(param => this.blogId = param['blogId']);
    activatedRoute.params.subscribe(param => this.docId = param['docId']);    
    this.blogDocForm = this._formBuilder.group({
      "docTitle": ['', Validators.required],
      "docFormControl": this.docFormControl,
      active: ['']
    });
  }

  ngOnInit() {
    if (this.docId)
      this.getBlogDocDetail();
  }

  getBlogDocDetail() {
    this._objService.getBlogDocDetail(this.blogId, this.docId)
      .subscribe(res =>this.bindDetail(res),
        error => this.errorMessage(error));
  }

  bindDetail(objRes: BlogDocumentModel) {
    this.objBlogDoc = objRes;
    this.fileName = this.objBlogDoc.documentName;
  }

  saveBlogDoc() {
    this.isSubmitted = true;
    this.docFormControl.patchValue(this.fileName);
    if (this.blogDocForm.valid) {
      if (!this.docId) {
        this._objService.saveDocument(this.blogId, this.objBlogDoc, this.file)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
      else {
        this._objService.updateDocumnet(this.blogId, this.objBlogDoc, this.file, this.fileDeleted)
          .subscribe(res => this.resStatusMessage(res),
            error => this.errorMessage(error));
      }
    }
  }

  resStatusMessage(objSave: any) {
    this.triggerCancelForm();
    Swal("Success !", objSave.message, "success");
  }

  triggerCancelForm() {
    this.router.navigate(['/blog/documents', this.blogId]);
  }

  errorMessage(objResponse: any) {
    Swal("Alert !", objResponse, "info");
  }

  /*file handler */
  onFileSelect(args: any) {
    this.file = args;
    if (this.file)
      this.fileName = this.file.name;
  }

  onDeleteFile(id: string) {
  Swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Document !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result)=> {
        if(result.value){
          this._objService.deleteDoc(this.objBlogDoc.documentName, this.objBlogDoc.docProperties.documentMimeType, this.objBlogDoc.docProperties.docPath)
            .subscribe(res=> {
                this.fileDeleted = true;
                this.fileName = "";
                Swal("Deleted!", res.message, "success");
              },
              error=> {
                Swal("Alert!", error, "info");
              });
          }
      });
  }
  /* End File Handler */
}

