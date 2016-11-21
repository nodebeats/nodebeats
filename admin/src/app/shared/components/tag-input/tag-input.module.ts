import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TagInputComponent} from './tag-input.component';
import {TagInputItemComponent} from './tag-input-item.component';
import {TypeaheadModule} from "../ng2-bootstrap/components/typeahead/typeahead.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TypeaheadModule
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
