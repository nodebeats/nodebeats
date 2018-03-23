import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HtmlContentEditorComponent } from "./html-content-editor.component";
import { HtmlContentComponent } from './html-content-list.component';
export const HtmlContentRoutes: Routes = [
  { path: '', component: HtmlContentComponent },
  { path: 'editor', component: HtmlContentEditorComponent },
  { path: 'editor/:id', component: HtmlContentEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(HtmlContentRoutes)],
  exports: [RouterModule],
})

export class HtmlContentRouting { }
