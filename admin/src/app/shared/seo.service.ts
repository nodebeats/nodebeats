import { HOST_URL } from '../../admin-app/shared/configs/env.config';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable()

export class SeoService{
  titleService: Title;
  metaService: Meta;
  siteUrl: string;
  constructor(private router: Router, titleService: Title, private meta: Meta){
    this.siteUrl = HOST_URL + this.router.url;
    this.titleService = titleService;
    this.metaService = meta;
  }

  setTitle(newTitle: string){
    this.titleService.setTitle(newTitle);
  }

  setMetaData(title: string, type: string, summary: string, siteName: string, image?: string){
    this.metaService.addTags([
      {property: 'og:title', content: title},
      {property: 'og:type', content: type},
      {property: 'og:url', content: this.siteUrl},
      {property: 'og:description', content: summary},
      {property: 'og:site_name', content: siteName}
    ]);
    if(image){
      this.metaService.addTag({property: 'og:image', content: image});
    }
  }

  setTwitterCard(site: string, title: string, summary: string, creator: string, image?:string){
    this.metaService.addTags([
        {property: 'twitter:card', content: "summary"},
        {property: 'twitter:site', content: '@' + site},        
        {property: 'twitter:title', content: title},
        {property: 'twitter:description', content: summary},
        {property: 'twitter:creator', content: creator},      
    ]);
    if(image)
      this.metaService.addTag({property: 'twitter:image:src', content: image}); //image must be atleast 120*120px
  }

  setSchemaData(name: string, summary: string, image?: string){  // For Google plus
    this.metaService.addTags([
      {itemprop: 'name', content: name},
      {itemprop: 'description', content: summary}
    ]);
    if(image){
      this.metaService.addTag({itemprop: 'image', content: image});
    }
  }

  setArticleData(publishTime: string, modifiedTime: string, articleSection: string, articleTag: string) {  // Article data for fb share
    this.metaService.addTags([
        {property: 'article:published_time', content: publishTime},
        {property: 'article:modified_time', content: modifiedTime},
        {property: 'article:section', content: articleSection},
        {property: 'article:tag', content: articleTag}        
    ]);
  }
}
