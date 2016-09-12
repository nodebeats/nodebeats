import {Component, ViewContainerRef} from '@angular/core';

import{LoginComponent} from './components/login/login.component';
@Component({
    selector: 'login-app',
    templateUrl: 'login-app/login-index.html',
    precompile:[LoginComponent]
})


export class LoginAppComponent {
    public routeConfig:String[];
    public containerSlide:boolean = false;

    constructor(private viewContainerRef:ViewContainerRef) {
        // modal.defaultViewContainer = viewContainerRef;
        // Read the RouteConfig annotation so we can pass it to the breadcrumb component
        // let annotations = Reflect.getOwnMetadata('annotations', AppComponent);
        // for (let i = 0; i < annotations.length; i += 1) {
        //     if (annotations[i].constructor.name === 'RouteConfig') {
        //         this.routeConfig = annotations[i].configs;
        //     }
        // }
    }

    toggleContainer(args) {
        this.containerSlide = args;
    }
}