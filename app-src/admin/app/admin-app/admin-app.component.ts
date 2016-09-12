import {Component, ViewContainerRef, OnInit} from '@angular/core';
import {TopNavCmp} from './components/topnav/topnav';
import {SidebarCmp} from './components/sidebar/sidebar'
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserListComponent} from "./components/user-management/user-list.component";
import{NewsManagementComponent}from "./components/news/news-management.component";
import{EmailServiceComponent} from "./components/email-service/email-service.component";

import {ApplicationLogComponent} from './components/application-log/application-log-list.component';
import{BlogManagementComponent} from './components/blog/blog.component';

//import {BreadcrumbComponent} from "../../shared/components/breadcumb.component";
import {CloudinarySettingComponent} from "./components/cloudinary/cloudinary.component";
import{GoogleAnalyticsComponent}from"./components/google-analytics/google-analytics.component";
import{OrganizationInfoComponent} from "./components/organization-information/orginfo.component";
import{ImageSliderComponent} from "./components/image-slider/image-silder-list.component";
import{ContactListCompoent} from "./components/contact/contact-list.component";
import{GoogleMapComponent} from "./components/google-map/google-map.component";
import{ImageGalleryComponent} from "./components/image-gallery/image-gallery.component";
import{TestimonialComponent} from "./components/testimonial/testimonial-list.component";
import{TeamManagementComponent} from "./components/team-management/team-managment-list.component";
import{HtmlContentComponent} from "./components/html-content/html-content-list.component";
import{EventComponent} from "./components/event-management/event-list.component";
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';
import {RequestOptions} from "@angular/http";
import {Config} from '../shared/configs/general.config';
import {CloudinaryService} from './components/cloudinary/cloudinary.service'
@Component({
    selector: 'admin-dashboard',
    templateUrl: 'admin-app/admin-index.html',
    directives: [SidebarCmp, TopNavCmp, SpinnerComponent],
    precompile: [UserListComponent],
    providers: [CloudinaryService]
})


export class AdminAppComponent implements OnInit {
    public routeConfig:String[];
    public containerSlide:boolean = false;

    constructor(private cloudinaryService:CloudinaryService) {
        // modal.defaultViewContainer = viewContainerRef;
        // Read the RouteConfig annotation so we can pass it to the breadcrumb component
        // let annotations = Reflect.getOwnMetadata('annotations', AppComponent);
        // for (let i = 0; i < annotations.length; i += 1) {
        //     if (annotations[i].constructor.name === 'RouteConfig') {
        //         this.routeConfig = annotations[i].configs;
        //     }
        // }
    }

    ngOnInit() {
        this.setCloudinaryName();
    }

    setCloudinaryName() {
        this.cloudinaryService.getCloudinarySettings()
            .subscribe(res=>Config.setCloudinary(res.cloudinaryCloudName),
                err=>this.handleErrorMsg(err));
    }

    handleErrorMsg(res:any) {
        console.log(res.message);
    }

    toggleContainer(args) {
        this.containerSlide = args;
    }
}