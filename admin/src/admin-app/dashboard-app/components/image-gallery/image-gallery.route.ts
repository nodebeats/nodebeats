import { NgModule } from '@angular/core';
import { ImageAlbumEditorComponent } from './image-gallery-album-editor.component';
import { ImageAlbumListComponent} from './image-gallery-album-list.component';
import { ImageGalleryImageEditorComponent } from './image-gallery-image-editor.component';
import { ImageListComponent } from './image-gallery-image-list.component';
import { ImageGalleryComponent} from './image-gallery.component';
import { Routes,RouterModule } from '@angular/router';

export const ImageGalleryRoute: Routes = [
    {path:'', component: ImageGalleryComponent, data: {breadcrumb: 'Image Gallery'},
    children: [
      {path: '', redirectTo: 'album', pathMatch: 'full'},
      {path: 'album', component: ImageAlbumListComponent, data: {breadcrumb: 'Image Album List'}},
      {path: 'album/editor', component: ImageAlbumEditorComponent, data: {breadcrumb: 'Image Album Editor'}},      
      {path: 'album/editor/:albumId', component: ImageAlbumEditorComponent, data: {breadcrumb: 'Image Album Editor'}},
      {path: 'album/gallery/:albumId',component: ImageListComponent, data: {breadcrumb: 'Image Gallery List'}},
      {path: 'album/gallery/:albumId/editor', component: ImageGalleryImageEditorComponent, data: {breadcrumb: 'Image Gallery Editor'}},
      {path: 'album/gallery/:albumId/editor/:imageId', component:ImageGalleryImageEditorComponent, data: {breadcrumb: 'Image Gallery Editor'}}
    ]}
  ];

@NgModule({
imports: [RouterModule.forChild(ImageGalleryRoute)],
exports: [RouterModule],
})

export class ImageGalleryRouting {}