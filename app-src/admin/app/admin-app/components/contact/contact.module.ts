import {NgModule}      from '@angular/core';
import {ContactService} from "./contact.service";
import{ContactListCompoent} from"./contact-list.component";
import {ContactViewComponent} from "./contact-view.component";
import{SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [ContactViewComponent, ContactListCompoent],
    providers: [ContactService]
})

export class ContactModule {
}