import {NgModule}      from '@angular/core';
import {CloudinaryService} from "./cloudinary.service";
import{CloudinarySettingComponent} from"./cloudinary.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [CloudinarySettingComponent],
    providers: [CloudinaryService]
})

export class CloudinaryModule {
}