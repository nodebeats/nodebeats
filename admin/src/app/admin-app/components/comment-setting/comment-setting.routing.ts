import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {CommentSettingComponent} from './comment-setting.component';


export const CommentRoute: Routes = [
  {path:'', component: CommentSettingComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(CommentRoute)],
  exports: [RouterModule],
})

export class CommentSettingRouting { }