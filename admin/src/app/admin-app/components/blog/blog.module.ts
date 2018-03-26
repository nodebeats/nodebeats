import { BlogRouting } from './blog.route';
import {NgModule} from '@angular/core';
import {BlogService} from "./blog.service";
import {BlogEditorComponent} from"./blog-editor.component";
import {BlogCategoryEditorComponent} from  "./blog-category-editor.component";
import {BlogListComponent} from './blog-list.component';
import {BlogDocListComponent} from './blog-doc-list.component';
import {BlogMetaTagEditorComponent} from './blog-metatag.component';
import {SharedModule} from '../../../shared/shared.module';
import {RlTagInputModule} from '../../../shared/components/tag-input/tag-input.module';
import {BlogDocEditorComponent} from './blog-doc-editor.component';
import {BlogManagementComponent} from "./blog.component"
import {BlogCategoryListComponent} from './blog-category-list.component';

@NgModule({
  imports: [SharedModule.forRoot(), RlTagInputModule, BlogRouting],
  declarations: [BlogEditorComponent,
    BlogEditorComponent,
    BlogCategoryEditorComponent,
    BlogListComponent,
    BlogDocEditorComponent,
    BlogDocListComponent,
    BlogCategoryListComponent,
    BlogManagementComponent,
    BlogMetaTagEditorComponent,
  ],
  providers: [BlogService]
})

export class BlogModule {
}
