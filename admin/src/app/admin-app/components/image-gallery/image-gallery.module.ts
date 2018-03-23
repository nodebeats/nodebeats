import {NgModule}      from '@angular/core';
import {ImageGalleryService} from "./image-gallery.service";
import {ImageAlbumEditorComponent} from"./image-gallery-album-editor.component";
import {ImageAlbumListComponent} from"./image-gallery-album-list.component";
import {ImageGalleryImageEditorComponent} from"./image-gallery-image-editor.component";
import {ImageListComponent} from"./image-gallery-image-list.component";
import {SharedModule} from '../../../shared/shared.module';
import {ImageGalleryComponent} from "./image-gallery.component";
import { XhrService } from "../../../shared/services/xhr.service";
import { ImageGalleryRouting} from "./image-gallery.route";

@NgModule({
    imports: [SharedModule.forRoot(),ImageGalleryRouting],
    declarations: [ImageGalleryImageEditorComponent,
        ImageAlbumListComponent,
        ImageAlbumEditorComponent,
        ImageGalleryComponent,
        ImageListComponent],
    providers: [ImageGalleryService, XhrService]
})

export class ImageGalleryModule {
}