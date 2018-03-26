import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TagInputComponent} from './tag-input.component';
import {TagInputItemComponent} from './tag-input-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TagInputComponent,
        TagInputItemComponent
    ],
    exports: [
        TagInputComponent
    ]
})
export class RlTagInputModule {
}
