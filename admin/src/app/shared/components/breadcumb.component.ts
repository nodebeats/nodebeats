// import {Component, Input} from '@angular/core';
// import {FORM_DIRECTIVES, NgClass} from '@angular/common';
// import {ROUTER_DIRECTIVES, RouteConfig, Router, RouteDefinition} from '@angular/router-deprecated';
//
// /**
//  * This component shows a router's paths as breadcrumb trails and allows you to navigate to any of them.
//  * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
//  * By providing a RouteConfig the component will be able to use the 'as' name to display in the breadcrumbs links.
//  */
// @Component({
//     selector: 'breadcrumb',
//     directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass],
//     template: `
//       <div>
//           <ul class="breadcrumb">
//               <li *ngFor="let url of urls; let last = last" [ngClass]="{'active': last}"> <!-- disable link of last item -->
//                   <a *ngIf="!last" (click)="navigateTo(url)">{{friendlyName(url)}}</a>
//                   <span *ngIf="last">{{friendlyName(url)}}</span>
//               </li>
//           </ul>
//       </div>
//     `,
//     styles: [`
//       .breadcrumb {
//         padding: 8px 15px;
//         margin-bottom: 20px;
//         list-style: none;
//         background-color: transparent;
//         border-radius: 3px;
//       }
//       .breadcrumb > li {
//         display: inline-block;
//       }
//       .breadcrumb > li + li:before {
//         content: "/";
//         padding: 0 5px;
//         color: #999999;
//       }
//       .breadcrumb > .active {
//         color: #555555;
//       }
//     `]
// })
// export class BreadcrumbComponent {
//
//     @Input('routeConfig') routeConfig:RouteDefinition[];
//     private _urls:String[];
//
//     constructor(private router:Router) {
//         this._urls = new Array();
//         this.router.subscribe((value) => {
//             this._urls.length = 0; //Fastest way to clear out array
//             this.generateBreadcrumbTrail(value);
//         })
//     }
//
//     generateBreadcrumbTrail(url:String):void {
//         this._urls.unshift(url); //Add url to beginning of array (since the url is being recursively broken down from full url to its parent paths)
//         if (url.lastIndexOf('/') > 0) {
//             this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Recursively add parent url
//         }
//     }
//
//     navigateTo(url:string):void {
//         this.router.navigateByUrl(url);
//     }
//
//     friendlyName(url:String):String {
//         if (this.routeConfig && url) {
//             let route:RouteDefinition;
//             for (let i = 0; i < this.routeConfig.length; i += 1) {
//                 route = this.routeConfig[i];
//                 if (url == route.path) {
//                     return route.as;
//                 }
//             }
//         }
//
//         return url;
//     }
//
//     get urls() {
//         return this._urls;
//     }
//
//     set urls(value) {
//         this._urls = value;
//     }
//
// }
