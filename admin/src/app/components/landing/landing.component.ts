import { BlogModel } from './../../../admin-app/dashboard-app/components/blog/blog.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Component, OnInit, Inject, PLATFORM_ID, APP_ID } from "@angular/core";
import { BlogService } from "../../../admin-app/dashboard-app/components/blog/blog.service";
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../shared/seo.service';
import { Config } from '../../../admin-app/shared/configs/general.config';

const TAGS_KEY = makeStateKey('blogTagsList');
const BLOG_KEY = makeStateKey('blogDetail');

@Component({
    selector: 'client-landing',
    templateUrl: './landing.component.html'
})

export class LandingComponent implements OnInit{
    blogTagsList: any[] = [];
    blogId: string = '5ab4d835ff222b141d3a81de';
    blogDetail: BlogModel;
    websiteName: string = "Nodebeats";
    websiteDescription: string = "Nodebeats is an Open Source Content Management System, distributed under Apache License Version 2.0 attribution, and is regularly updated to avoid any pitfalls from legacy codes.";
    websiteImage: string = "http://res.cloudinary.com/nodebeats-v3/image/upload/v1523617702/nb2-v2.png";

    constructor(@Inject(SeoService)private seo: SeoService, @Inject(PLATFORM_ID) private platformId: Object, @Inject(APP_ID) private appId: string, @Inject(BlogService)private blogService: BlogService, @Inject(TransferState)private state: TransferState) { }
    
    ngOnInit() {
        this.setSeoTags();
        const platform = isPlatformBrowser(this.platformId);
        if(platform)
            this.startBanner();
        this.blogTagsList = this.state.get(TAGS_KEY, null as any);
        this.blogDetail = this.state.get(BLOG_KEY, null as any);        
        if(!this.blogTagsList){
            this.getBlogTags();
        }
        if(!this.blogDetail)
            this.getBlogDetail();
    }

    setSeoTags() {
        this.seo.setTitle("Nodebeats");
        this.seo.setSchemaData(this.websiteName, this.websiteDescription, this.websiteImage);
        this.seo.setMetaData(this.websiteName, "Website", this.websiteDescription, "www.nodebeats.com", this.websiteImage);
        this.seo.setTwitterCard("nodebeats", this.websiteName, this.websiteDescription, "nodebeats", this.websiteImage);
    }

    getBlogDetail() {
        this.blogService.getBlogDetail(this.blogId)
            .subscribe(res => {
                this.blogDetail = res;
                this.blogDetail.bannerImage = this.getImgSrc(this.blogDetail.bannerImage);
                this.state.set(BLOG_KEY, this.blogDetail as any);
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

    startBanner(){
        jQuery(".owl-carousel").owlCarousel({
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true
        });
    }
}