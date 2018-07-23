import { Component } from "@angular/core";
import { CloudinaryService } from "../admin-app/dashboard-app/components/cloudinary/cloudinary.service";
import { Config } from "../admin-app/shared/configs/general.config";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(private cloudinaryService:CloudinaryService) {

    }

    ngOnInit() {
        this.setCloudinaryName();
    }

    setCloudinaryName() {
        this.cloudinaryService.getCloudinarySettings()
            .subscribe(res=>Config.setCloudinary(res.cloudinaryCloudName, res.cloudinaryApiKey, res.cloudinaryApiSecret),
                err=>this.handleErrorMsg(err));
    }

    handleErrorMsg(res:any) {
        console.log(res.message);
    }

}