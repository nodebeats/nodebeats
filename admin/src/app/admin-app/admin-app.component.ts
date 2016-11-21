import {Component, OnInit} from '@angular/core';
import {Config} from '../shared/configs/general.config';
import {CloudinaryService} from "./components/cloudinary/cloudinary.service";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-index.html'
})


export class AdminAppComponent implements OnInit {
    public containerSlide:boolean = false;

    constructor(private cloudinaryService:CloudinaryService) {
        // modal.defaultViewContainer = viewContainerRef;
        // Read the RouteConfig annotation so we can pass it to the breadcrumb component
        // let annotations = Reflect.getOwnMetadata('annotations', AppComponent);
        // for (let i = 0; i < annotations.length; i += 1) {
        //     if (annotations[i].constructor.name === 'RouteConfig') {
        //         this.routeConfig = annotations[i].configs;
        //     }
        // }
    }

    ngOnInit() {
        this.setCloudinaryName();
    }

    setCloudinaryName() {
        this.cloudinaryService.getCloudinarySettings()
            .subscribe(res=>Config.setCloudinary(res.cloudinaryCloudName),
                err=>this.handleErrorMsg(err));
    }

    handleErrorMsg(res:any) {
        console.log(res.message);
    }

    toggleContainer(args) {
        this.containerSlide = args;
    }
}
