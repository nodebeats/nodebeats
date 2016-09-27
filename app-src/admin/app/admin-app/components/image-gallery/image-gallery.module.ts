import {NgModule}      from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageAlbumEditorComponent} from"./image-gallery-album-editor.component";
import {ImageAlbumListComponent} from"./image-gallery-album-list.component";
import {ImageGalleryImageEditorComponent} from"./image-gallery-image-editor.component";
import {ImageListComponent} from"./image-gallery-image-list.component";
import {SharedModule} from '../../../shared/shared.module';
import {ImageGalleryComponent} from "./image-gallery.component";

@NgModule({
    imports: [SharedModule],
    declarations: [ImageGalleryImageEditorComponent,
        ImageAlbumListComponent,
        ImageAlbumEditorComponent,
        ImageGalleryComponent,
        ImageListComponent],
    providers: [ImageGalleryService]
})

export class ImageGalleryModule {
}