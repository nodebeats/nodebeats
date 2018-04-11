import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {CommentSettingComponent} from './comment-setting.component';


export const CommentRoute: Routes = [
  {path:'', component: CommentSettingComponent, data: {breadcrumb: 'Comment Setting'}}
];

@NgModule({
  imports: [RouterModule.forChild(CommentRoute)],
  exports: [RouterModule],
})

export class CommentSettingRouting { }