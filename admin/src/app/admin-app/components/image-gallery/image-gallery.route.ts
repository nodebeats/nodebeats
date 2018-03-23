import { NgModule } from '@angular/core';
import { ImageAlbumEditorComponent } from './image-gallery-album-editor.component';
import { ImageAlbumListComponent} from './image-gallery-album-list.component';
import { ImageGalleryImageEditorComponent } from './image-gallery-image-editor.component';
import { ImageListComponent } from './image-gallery-image-list.component';
import { ImageGalleryComponent} from './image-gallery.component';
import { Routes,RouterModule } from '@angular/router';

export const ImageGalleryRoute: Routes = [
    {path:'', component: ImageGalleryComponent,
    children: [
      {path: '', redirectTo: 'album', pathMatch: 'full'},
      {path: 'album', component: ImageAlbumListComponent},
      {path: 'album/editor', component: ImageAlbumEditorComponent},      
      {path: 'album/editor/:albumId', component: ImageAlbumEditorComponent},
      {path: 'album/gallery/:albumId',component: ImageListComponent},
      {path: 'album/gallery/:albumId/editor', component: ImageGalleryImageEditorComponent},
      {path: 'album/gallery/:albumId/editor/:imageId', component:ImageGalleryImageEditorComponent}
    ]}
  ];

@NgModule({
imports: [RouterModule.forChild(ImageGalleryRoute)],
exports: [RouterModule],
})

export class ImageGalleryRouting {}