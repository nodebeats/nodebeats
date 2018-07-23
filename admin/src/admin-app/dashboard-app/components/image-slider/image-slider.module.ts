import {NgModule}      from '@angular/core';
import {ImageSliderComponent} from "./image-silder-list.component";
import {ImageSliderEditorComponent} from"./image-slider-editor.component";
import {ImageSliderService} from"./image-slider.service";
import {ImageSliderRouting} from './image-slider.routing';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule.forRoot(),ImageSliderRouting],
    declarations: [ImageSliderEditorComponent,
        ImageSliderComponent],
    providers: [ImageSliderService]
})

export class ImageSlideModule {
}