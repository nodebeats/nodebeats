import {Component, OnInit} from '@angular/core';
import {Config} from '../shared/configs/general.config';
import {CloudinaryService} from "./components/cloudinary/cloudinary.service";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard-index.html',
    styleUrls: ['dashboard-app.components.scss'],
})

export class DashboardAppComponent implements OnInit {
    public containerSlide:boolean = false;

    constructor(private cloudinaryService:CloudinaryService) {               
    }

    ngOnInit() {
        this.setCloudinaryName();
    }

    setCloudinaryName() {
        this.cloudinaryService.getCloudinarySettings()
            .subscribe(res=>{
                Config.setCloudinary(res.cloudinaryCloudName, res.cloudinaryApiKey, res.cloudinaryApiSecret)
            },
                err=>this.handleErrorMsg(err));
    }

    handleErrorMsg(res:any) {
        console.log(res.message);
    }

    toggleContainer(args: any) {
        this.containerSlide = args;
    }
}
