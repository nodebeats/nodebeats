import {NgModule}      from '@angular/core';
import {TestimonialService} from "./testimonial.service";
import {TestimonialEditorComponent} from "./testimonial-editor.component";
import {TestimonialComponent} from "./testimonial-list.component";
import {TestimonialRouting} from './testimonial.route';
import {SharedModule} from '../../../shared/shared.module';
import { XhrService } from '../../../shared/services/xhr.service';

@NgModule({
    imports: [SharedModule.forRoot(),TestimonialRouting],
    declarations: [TestimonialComponent, TestimonialEditorComponent],
    providers: [TestimonialService, XhrService]
})

export class TestimonialModule {
}