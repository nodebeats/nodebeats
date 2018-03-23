import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCategoryEditorComponent } from "./news-category-editor.component";
import { NewsCategoryListComponent } from './news-category-list.component';
import { NewsEditorComponent } from "./news-editor.component";
import { NewsImageEditorComponent } from './news-image-editor.component';
import { NewsImageListComponent } from "./news-image-list.component";
import { NewsListComponent } from './news-list.component';
import { NewsManagementComponent } from './news-management.component';

export const NewsRoute: Routes = [
  {path: '', component:NewsManagementComponent,
    children: [
    { path: '', component:NewsListComponent},
    { path: 'image/:id',component:NewsImageListComponent},
    { path: 'editor', component: NewsEditorComponent },
    { path: 'editor/:id', component: NewsEditorComponent },
    { path: 'image/:id/editor', component:NewsImageEditorComponent},
    { path: 'image/:id/editor/:imageId', component:NewsImageEditorComponent},
    { path: 'category', component: NewsCategoryListComponent},
    { path: 'category/editor', component:NewsCategoryEditorComponent},
    { path: 'category/editor/:id',component:NewsCategoryEditorComponent}
  ]
}  
];

@NgModule({
  imports: [RouterModule.forChild(NewsRoute)],
  exports: [RouterModule],
})

export class NewsRouting { }
