import {NgModule}      from '@angular/core';
import {ContactService} from "./contact.service";
import{ContactListComponent} from"./contact-list.component";
import {ContactViewComponent} from "./contact-view.component";
import {ContactHomeComponent} from "./contact-home.component";
import {SharedModule} from '../../../shared/shared.module';
import {ContactRouting} from './contact.routing';

@NgModule({
    imports: [SharedModule.forRoot(), ContactRouting],
    declarations: [ContactViewComponent, ContactListComponent, ContactHomeComponent],
    providers: [ContactService]
})

export class ContactModule {
}