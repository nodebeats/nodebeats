import { BlogDocEditorComponent } from './blog-doc-editor.component';
import { BlogCategoryEditorComponent } from './blog-category-editor.component';
import { BlogCategoryListComponent } from './blog-category-list.component';
import { BlogEditorComponent } from './blog-editor.component';
import { BlogListComponent } from './blog-list.component';
import { BlogManagementComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDocListComponent } from './blog-doc-list.component';
import { BlogMetaTagEditorComponent } from './blog-metatag.component';

const BlogRoutes: Routes = [
    {path: '', component: BlogManagementComponent,
        children: [
            {path: '', component: BlogListComponent},
            {path: 'editor', component: BlogEditorComponent},
            {path: 'editor/:id', component: BlogEditorComponent},
            {path: 'documents/:blogId', component: BlogDocListComponent},
            {path: 'documents/:blogId/editor', component: BlogDocEditorComponent},
            {path: 'documents/:blogId/editor/:docId', component: BlogDocEditorComponent},
            {path: 'metatag/:blogId', component: BlogMetaTagEditorComponent},            
            {path: 'category', component: BlogCategoryListComponent},
            {path: 'category/editor', component: BlogCategoryEditorComponent},            
            {path: 'category/editor/:id', component: BlogCategoryEditorComponent}           
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(BlogRoutes)],
    exports: [RouterModule]
})

export class BlogRouting {

}