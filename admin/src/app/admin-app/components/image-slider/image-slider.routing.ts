import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSliderEditorComponent } from "./image-slider-editor.component";
import { ImageSliderComponent } from './image-silder-list.component';
export const ImageSliderRoutes: Routes = [
  { path: '', component: ImageSliderComponent },
  { path: 'editor', component: ImageSliderEditorComponent },
  { path: 'editor/:id', component: ImageSliderEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ImageSliderRoutes)],
  exports: [RouterModule],
})

export class ImageSliderRouting { }
