/**
 * Created by sanedev on 6/27/16.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'blog-management',
  templateUrl: './blog-management.html'
})

export class BlogManagementComponent {
  navLinks: any[] = [{label:'Blog', path: '/blog'}, {label: 'Blog Category', path: '/blog/category'}];  

  constructor() {
  }
}

