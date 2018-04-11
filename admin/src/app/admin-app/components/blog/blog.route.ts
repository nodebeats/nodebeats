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
    {path: '', component: BlogManagementComponent, data: {breadcrumb: 'Blog Management'}, 
        children: [
            {path: '', component: BlogListComponent, data: {breadcrumb: 'Blog List'}},
            {path: 'editor', component: BlogEditorComponent, data: {breadcrumb: 'Blog Editor'}},
            {path: 'editor/:id', component: BlogEditorComponent, data: {breadcrumb: 'Blog Editor'}},
            {path: 'documents/:blogId', component: BlogDocListComponent, data: {breadcrumb: 'Blog Documents List'}},
            {path: 'documents/:blogId/editor', component: BlogDocEditorComponent, data: {breadcrumb: 'Blog Document Editor'}},
            {path: 'documents/:blogId/editor/:docId', component: BlogDocEditorComponent, data: {breadcrumb: 'Blog Document Editor'}},
            {path: 'metatag/:blogId', component: BlogMetaTagEditorComponent, data: {breadcrumb: 'Blog Meta Tag Editor'}},            
            {path: 'category', component: BlogCategoryListComponent, data: {breadcrumb: 'Blog Category'}},
            {path: 'category/editor', component: BlogCategoryEditorComponent, data: {breadcrumb: 'Blog Category Editor'}},            
            {path: 'category/editor/:id', component: BlogCategoryEditorComponent, data: {breadcrumb: 'Blog Category Editor'}}           
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(BlogRoutes)],
    exports: [RouterModule]
})

export class BlogRouting {

}