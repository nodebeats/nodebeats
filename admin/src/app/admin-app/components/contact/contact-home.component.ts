import {Component} from '@angular/core';

@Component({
    selector: "contact-home",
    template: `
    <div class="d-flex flex-row-reverse">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb nb-breadcrumb">
                <li class="breadcrumb-item"><a [routerLink]="['/dashboard']">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Contact List</li>
            </ol>
        </nav>
        <h1 class="nb-heading-one mr-auto">Contact List</h1>
    </div>
    <router-outlet></router-outlet>
    `
})
export class ContactHomeComponent {}