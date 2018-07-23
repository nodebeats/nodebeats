import {NgModule} from '@angular/core';
import {ContactListComponent} from './contact-list.component';
import {ContactViewComponent} from './contact-view.component';
import {ContactHomeComponent} from './contact-home.component';
import {Routes, RouterModule} from '@angular/router';

export const ContactRoute: Routes = [
    {path:'', component: ContactHomeComponent, data: {breadcrumb: 'Contact'},
        children: [
            {path:'', component: ContactListComponent, data: {breadcrumb: 'Contact List'}},
            {path:'detail/:id', component: ContactViewComponent, data: {breadcrumb: 'Contact Details'}}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ContactRoute)],
    exports: [RouterModule],
  })


export class ContactRouting{    }