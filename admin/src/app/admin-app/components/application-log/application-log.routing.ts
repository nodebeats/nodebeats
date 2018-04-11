import {NgModule} from "@angular/core";
import {ApplicationLogComponent} from "./application-log-list.component";
import {Routes, RouterModule, Router} from "@angular/router";

export const ApplicationLogRoute: Routes=[
    {path:'', component:ApplicationLogComponent, data: {breadcrumb: 'Error Log List'}}
]

@NgModule({
    imports:[RouterModule.forChild(ApplicationLogRoute)],
    exports:[RouterModule]
})

export class ApplicationLogRouting { 

}