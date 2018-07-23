import { Component, OnInit, Inject } from '@angular/core';
import { BlogService } from '../../../admin-app/dashboard-app/components/blog/blog.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { BlogModel } from '../../../admin-app/dashboard-app/components/blog/blog.model';
import { SeoService } from '../../shared/seo.service';
import { Config } from '../../../admin-app/shared/configs/general.config';

const BLOG_KEY = makeStateKey('blogDetail');
const TAGS_KEY = makeStateKey('blogTagsList');

@Component({
  selector: 'app-test',
  template: `
    <img src="{{blogDetail?.bannerImage}}" />
    <h1>{{blogDetail?.blogTitle}}</h1>
    <p *ngIf="blogDetail" [innerHTML]="blogDetail.blogDescription">
                
    </p>
  `,
  styles: [],
  providers: [BlogService]
})

export class TestComponent implements OnInit {
  blogTagsList: any[] = [];  
  blogDetail: BlogModel;
  blogId: string = '5ad6083893ce894b849b1b82';

  constructor(@Inject(SeoService)private seo: SeoService, @Inject(BlogService)private blogService: BlogService, @Inject(TransferState)private state: TransferState) { }

  ngOnInit() {
    this.blogTagsList = this.state.get(TAGS_KEY, null as any);    
    this.blogDetail = this.state.get(BLOG_KEY, null as any);
    if(!this.blogTagsList)
      this.getBlogTags();
    if(!this.blogDetail)
      this.getBlogDetail();
  }

  getBlogDetail() {
    this.blogService.getBlogDetail(this.blogId)
      .subscribe(res => {
        this.blogDetail = res;
        this.blogDetail.bannerImage = this.getImgSrc(this.blogDetail.bannerImage);
        console.log("Banner Image", this.blogDetail.bannerImage);
        this.state.set(BLOG_KEY, this.blogDetail as BlogModel);
        this.setSeoTags();
      });
  }

  getImgSrc(image: string) {
    return Config.Cloudinary.url(image, {height: 300, width:1050, crop: 'fill' }); 
  }
      
  getBlogTags() {
    this.blogService.getBlogTagList()
      .subscribe(res => { 
        this.blogTagsList = res;
        this.state.set(TAGS_KEY, this.blogTagsList as any);
      });
  }

  setSeoTags() {
    if(this.blogDetail) {
      this.seo.setTitle("Blog | " + this.blogDetail.blogSummary);
      this.seo.setSchemaData(this.blogDetail.blogTitle, this.blogDetail.blogSummary, this.blogDetail.bannerImage);
      this.seo.setMetaData(this.blogDetail.blogTitle, "Blog", this.blogDetail.blogSummary, "www.nodebeats.com", this.blogDetail.bannerImage);
      this.seo.setTwitterCard("nodebeats", this.blogDetail.blogTitle, this.blogDetail.blogSummary, "nodebeats", this.blogDetail.bannerImage);
    }
  }
}
