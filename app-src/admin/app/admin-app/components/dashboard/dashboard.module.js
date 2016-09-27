"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var shared_module_1 = require('../../../shared/shared.module');
var primeng_1 = require('primeng/primeng');
var dashboard_component_1 = require("./dashboard.component");
var dashboard_service_1 = require("./dashboard.service");
var dashboard_component_2 = require('./dashboard.component');
var animate_counter_component_1 = require("../../../shared/components/animate-counter.component");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, primeng_1.ChartModule],
            declarations: [dashboard_component_1.UserCount, dashboard_component_1.PageViewComponent, dashboard_component_2.DashboardComponent,
                dashboard_component_1.CountryWiseChart, dashboard_component_1.BrowserAnalysisChart,
                dashboard_component_1.LastWeekVsThisWeekAnalysisChart, animate_counter_component_1.AnimateCounterComponent],
            providers: [dashboard_service_1.DashboardService]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map