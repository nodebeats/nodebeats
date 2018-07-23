import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerEditorComponent } from "./partner-editor.component";
import { PartnerComponent } from './partner-list.component';
export const PartnerRoutes: Routes = [
  { path: '', component: PartnerComponent },
  { path: 'editor', component: PartnerEditorComponent },
  { path: 'editor/:id', component: PartnerEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PartnerRoutes)],
  exports: [RouterModule],
})

export class PartnerRouting { }
