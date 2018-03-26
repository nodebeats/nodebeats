import {NgModule} from '@angular/core';
import {ContactListComponent} from './contact-list.component';
import {ContactViewComponent} from './contact-view.component';
import {ContactHomeComponent} from './contact-home.component';
import {Routes, RouterModule} from '@angular/router';

export const ContactRoute: Routes = [
    {path:'', component: ContactHomeComponent,
    children: [
        {path:'', component: ContactListComponent},
        {path:'detail/:id', component: ContactViewComponent}
    ]
}
]

@NgModule({
    imports: [RouterModule.forChild(ContactRoute)],
    exports: [RouterModule],
  })


export class ContactRouting{    }