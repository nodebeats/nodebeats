import{Component}from'@angular/core';
import{ImageAlbumListComponent} from "./image-gallery-album-list.component";
import{ImageListComponent} from "./image-gallery-image-list.component";

@Component({
    selector: 'image-gallery',
    templateUrl: '../../views/image-gallery/image-gallery.html'
})
export class ImageGalleryComponent {
    isImageList:boolean = false;
    albumId:string;
    isCanceled:boolean;

    constructor() {

    }

    showAlbumList(args) {
        this.isImageList = false;
        this.isCanceled = args;
    }

    showImageList(args) {
        this.isImageList = true;
        this.albumId = args;
    }


}

