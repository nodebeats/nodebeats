import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSliderEditorComponent } from "./image-slider-editor.component";
import { ImageSliderComponent } from './image-silder-list.component';
export const ImageSliderRoutes: Routes = [
  { path: '', component: ImageSliderComponent, data: {breadcrumb: 'Image Slider List'} },
  { path: 'editor', component: ImageSliderEditorComponent, data: {breadcrumb: 'Image Slider Editor'}},
  { path: 'editor/:id', component: ImageSliderEditorComponent, data: {breadcrumb: 'Image Slider Editor'}}
];

@NgModule({
  imports: [RouterModule.forChild(ImageSliderRoutes)],
  exports: [RouterModule],
})

export class ImageSliderRouting { }
