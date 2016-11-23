import{Component}from'@angular/core';

@Component({
    selector: 'image-gallery',
    templateUrl: './image-gallery.html'
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

