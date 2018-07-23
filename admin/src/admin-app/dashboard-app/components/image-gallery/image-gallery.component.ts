import{Component}from'@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'image-gallery',
    templateUrl: './image-gallery.html'
})
export class ImageGalleryComponent {

    constructor( private router: Router) {

    }
}

