import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HtmlContentEditorComponent } from "./html-content-editor.component";
import { HtmlContentComponent } from './html-content-list.component';
export const HtmlContentRoutes: Routes = [
  { path: '', component: HtmlContentComponent, data: {breadcrumb: 'Html Content List'} },
  { path: 'editor', component: HtmlContentEditorComponent, data: {breadcrumb: 'Html Content Editor'} },
  { path: 'editor/:id', component: HtmlContentEditorComponent, data: {breadcrumb: 'Html Content Editor'} }
];

@NgModule({
  imports: [RouterModule.forChild(HtmlContentRoutes)],
  exports: [RouterModule],
})

export class HtmlContentRouting { }
