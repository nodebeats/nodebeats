import { NgModule } from '@angular/core';
import { TestimonialComponent } from './testimonial-list.component';
import { Routes,RouterModule } from '@angular/router';
import {TestimonialEditorComponent} from './testimonial-editor.component';

export const TestimonialRoute: Routes = [
  {path:'', component: TestimonialComponent},
  {path: 'editor', component: TestimonialEditorComponent},
  {path: 'editor/:testimonialId', component: TestimonialEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(TestimonialRoute)],
  exports: [RouterModule],
})

export class TestimonialRouting { }