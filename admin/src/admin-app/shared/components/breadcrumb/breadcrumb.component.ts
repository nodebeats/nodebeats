import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [ './breadcrumb.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
    prevUrl: any;
    breadcrumbs$: any;
    //  = this.router.events
    //     .filter(event => event instanceof NavigationEnd)
    //     .distinctUntilChanged()
    //     .map(event => this.buildBreadCrumb(this.activatedRoute.root));
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.breadcrumbs$ = this.buildBreadCrumb(this.activatedRoute.root);
        this.router.events
            .subscribe(res => {
                this.breadcrumbs$ = this.buildBreadCrumb(this.activatedRoute.root);
            })
    }

    buildBreadCrumb(route: ActivatedRoute, url: string = '/',
                    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
        const label = route.routeConfig ? route.routeConfig.data ? route.routeConfig.data[ 'breadcrumb' ] :'Dashboard' : 'Home';
        const path = route.routeConfig ? route.routeConfig.path : '';
        let nextUrl: string;
        if(path != ''){
            if(path.indexOf(':')> -1){
                let keys = Object.keys(route.params["_value"]);
                let newUrl = path;
                for(let i in keys){
                    newUrl = newUrl.replace(':'+keys[i], route.params["value"][keys[i]]);
                }
                nextUrl = `${url}${newUrl}/`;
                this.prevUrl = nextUrl;
            }
            else{
                nextUrl = `${url}${path}/`;
                this.prevUrl = nextUrl;
            }
        }
        else{
            if(this.prevUrl)
                nextUrl = this.prevUrl;
            else
                nextUrl = '/';
        }
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        // console.log(breadcrumb)
        const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
}
