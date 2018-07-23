import {NgModule}      from '@angular/core';
import {CloudinaryService} from "./cloudinary.service";
import {CloudinarySettingComponent} from"./cloudinary.component";
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CloudinaryRouting} from './cloudinary.routing';

@NgModule({
    imports: [SharedModule.forRoot(), CloudinaryRouting],
    declarations: [CloudinarySettingComponent],
    providers: [CloudinaryService]
})

export class CloudinaryModule {
}