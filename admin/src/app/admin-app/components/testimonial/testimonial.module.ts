import {NgModule}      from '@angular/core';
import {TestimonialService} from "./testimonial.service";
import {TestimonialEditorComponent} from"./testimonial-editor.component";
import {TestimonialComponent} from"./testimonial-list.component";

import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [TestimonialComponent, TestimonialEditorComponent],
    providers: [TestimonialService]
})

export class TestimonialModule {
}