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
/**
 * Created by sanedev on 4/8/16.
 */
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var primeng_1 = require('primeng/primeng');
require('plugins/Chart.bundle.js');
var moment = require('moment');
var dashboard_service_1 = require('./dashboard.service');
var animate_counter_component_1 = require('../../../shared/components/animate-counter.component');
var BrowserAnalysisChart = (function () {
    function BrowserAnalysisChart(objService) {
        this.objService = objService;
        this.data = {
            labels: [],
            datasets: []
        };
    }
    BrowserAnalysisChart.prototype.ngOnChanges = function () {
        if (this.viewId)
            this.getBrowserWiseData();
    };
    BrowserAnalysisChart.prototype.getBrowserWiseData = function () {
        var _this = this;
        this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'dimensions': 'ga:browser',
            'metrics': 'ga:pageviews',
            'sort': '-ga:pageviews',
            'max-results': 5
        })
            .then(function (response) {
            var label = [];
            var value = [];
            if (response.rows)
                response.rows.forEach(function (row, i) {
                    label.push(row[0]);
                    value.push(+row[1]);
                });
            _this.data = {
                labels: label,
                datasets: [
                    {
                        data: value,
                        backgroundColor: [
                            "#f03924",
                            "#36A2EB",
                            "#FFCE56",
                            '#E2EAE9',
                            '#2ab40b'
                        ],
                        hoverBackgroundColor: [
                            "#f03924",
                            "#36A2EB",
                            "#FFCE56",
                            '#E2EAE9',
                            '#2ab40b'
                        ]
                    }]
            };
        })
            .catch(function (err) { return console.log(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BrowserAnalysisChart.prototype, "viewId", void 0);
    BrowserAnalysisChart = __decorate([
        core_1.Component({
            selector: 'browser-chart',
            template: '<p-chart type="pie" [data]="data"></p-chart>',
            directives: [primeng_1.UIChart]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], BrowserAnalysisChart);
    return BrowserAnalysisChart;
}());
exports.BrowserAnalysisChart = BrowserAnalysisChart;
var CountryWiseChart = (function () {
    function CountryWiseChart(objService) {
        this.objService = objService;
        this.data = {
            labels: [],
            datasets: []
        };
    }
    CountryWiseChart.prototype.ngOnChanges = function () {
        if (this.viewId)
            this.getCounrtyWiseData();
    };
    CountryWiseChart.prototype.getCounrtyWiseData = function () {
        var _this = this;
        this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'dimensions': 'ga:country',
            'metrics': 'ga:sessions',
            'sort': '-ga:sessions',
            'max-results': 5
        })
            .then(function (response) {
            var label = [];
            var value = [];
            if (response.rows)
                response.rows.forEach(function (row, i) {
                    label.push(row[0]);
                    value.push(+row[1]);
                });
            _this.data = {
                labels: label,
                datasets: [
                    {
                        data: value,
                        backgroundColor: [
                            "#f03924",
                            "#36A2EB",
                            "#FFCE56",
                            '#E2EAE9',
                            '#2ab40b'
                        ],
                        hoverBackgroundColor: [
                            "#f03924",
                            "#36A2EB",
                            "#FFCE56",
                            '#E2EAE9',
                            '#2ab40b'
                        ]
                    }]
            };
        })
            .catch(function (err) { return console.log(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CountryWiseChart.prototype, "viewId", void 0);
    CountryWiseChart = __decorate([
        core_1.Component({
            selector: 'country-chart',
            template: '<p-chart type="doughnut" [data]="data"></p-chart>',
            directives: [primeng_1.UIChart]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], CountryWiseChart);
    return CountryWiseChart;
}());
exports.CountryWiseChart = CountryWiseChart;
var UserCount = (function () {
    function UserCount(objService) {
        this.objService = objService;
        this.activeUserCount = 0;
        this.newUserCount = 0;
        this.returningUserCount = 0;
    }
    UserCount.prototype.ngOnChanges = function () {
        if (this.viewId)
            this.getTotalUsers();
    };
    UserCount.prototype.getTotalUsers = function () {
        var _this = this;
        this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'dimensions': 'ga:userType',
            'metrics': 'ga:users',
            'max-results': 5,
            "start-date": "2005-01-01",
            "end-date": moment().format('YYYY-MM-DD')
        })
            .then(function (res) {
            if (res.rows.length > 0) {
                _this.newUserCount = res.rows[0][1];
                _this.returningUserCount = res.rows[1][1];
            }
        })
            .catch(function (err) {
            console.log(err.error.message);
            jQuery.jAlert({
                'title': 'Alert',
                'content': err.error.message,
                'theme': 'red'
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserCount.prototype, "viewId", void 0);
    UserCount = __decorate([
        core_1.Component({
            selector: 'user-count',
            template: " \n        <div class=\"col-xl-3 col-lg-6\">\n            <div class=\"card card-green card-inverse\">\n                <div class=\"card-header card-green\">\n                    <div class=\"row\">\n                        <div class=\"col-xs-3\">\n                            <i class=\"fa fa-user-plus fa-5x\"></i>\n                        </div>\n                        <div class=\"col-xs-9 text-xs-right\">\n                        <animate-counter [valueToCount]=\"newUserCount\"></animate-counter>\n                          \n                        </div>\n                    </div>\n                </div>\n                <div class=\"card-footer \">\n                    <a class=\"text-green\"  target=\"_blank\" href=\"https://analytics.google.com\">\n                        <span class=\"pull-xs-left\">New Users</span>\n                        <span class=\"pull-xs-right\"><i class=\"fa fa-arrow-circle-right\"></i></span>\n                        <div class=\"clearfix\"></div>\n                    </a>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <div class=\"card card-purple card-inverse\">\n                <div class=\"card-header card-purple\">\n                    <div class=\"row\">\n                        <div class=\"col-xs-3\">\n                            <i class=\"fa fa-user fa-5x\"></i>\n                        </div>\n                        <div class=\"col-xs-9 text-xs-right\">\n                              <animate-counter [valueToCount]=\"returningUserCount\"></animate-counter>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"card-footer \">\n                    <a class=\"text-purple\" target=\"_blank\" href=\"https://analytics.google.com\">\n                        <span class=\"pull-xs-left\">Returning Users</span>\n                        <span class=\"pull-xs-right\"><i class=\"fa fa-arrow-circle-right\"></i></span>\n                        <div class=\"clearfix\"></div>\n                    </a>\n                </div>\n            </div>\n        </div>",
            directives: [animate_counter_component_1.AnimateCounterComponent]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], UserCount);
    return UserCount;
}());
exports.UserCount = UserCount;
var PageViewComponent = (function () {
    function PageViewComponent(objService) {
        this.objService = objService;
        this.pageView = 0;
    }
    PageViewComponent.prototype.ngOnChanges = function () {
        if (this.viewId)
            this.getTotalPageView();
    };
    PageViewComponent.prototype.getTotalPageView = function () {
        var _this = this;
        var now = moment();
        this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'metrics': 'ga:pageviews',
            'max-results': 5,
            "start-date": "2005-01-01",
            "end-date": moment(now).format('YYYY-MM-DD')
        })
            .then(function (res) {
            if (res.rows.length > 0)
                _this.pageView = res.rows[0][0];
        })
            .catch(function (err) { return console.log(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PageViewComponent.prototype, "viewId", void 0);
    PageViewComponent = __decorate([
        core_1.Component({
            selector: 'page-view',
            template: " <div class=\"col-xl-3 col-lg-6\">\n            <div class=\"card card-orange card-inverse\">\n                <div class=\"card-header card-orange\">\n                    <div class=\"row\">\n                        <div class=\"col-xs-3\">\n                            <i class=\"fa fa-eye fa-5x\"></i>\n                        </div>\n                        <div class=\"col-xs-9 text-xs-right\">\n                               <animate-counter [valueToCount]=\"pageView\"></animate-counter>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"card-footer \">\n                    <a class=\"text-orange\"  target=\"_blank\" href=\"https://analytics.google.com;\">\n                        <span class=\"pull-xs-left\">Page Views</span>\n                        <span class=\"pull-xs-right\"><i class=\"fa fa-arrow-circle-right\"></i></span>\n                        <div class=\"clearfix\"></div>\n                    </a>\n                </div>\n            </div>\n        </div>",
            directives: [animate_counter_component_1.AnimateCounterComponent]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], PageViewComponent);
    return PageViewComponent;
}());
exports.PageViewComponent = PageViewComponent;
var LastWeekVsThisWeekAnalysisChart = (function () {
    function LastWeekVsThisWeekAnalysisChart(objService) {
        this.objService = objService;
        this.data = {
            labels: [],
            datasets: []
        };
    }
    LastWeekVsThisWeekAnalysisChart.prototype.ngOnChanges = function () {
        if (this.viewId)
            this.getSessionData();
    };
    LastWeekVsThisWeekAnalysisChart.prototype.getSessionData = function () {
        var _this = this;
        // Adjust `now` to experiment with different days, for testing only...
        // let now = moment(); // .subtract(3, 'day');
        var thisWeek = this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'dimensions': 'ga:date,ga:nthDay',
            'metrics': 'ga:sessions',
            'start-date': moment().day(0).format('YYYY-MM-DD'),
            'end-date': moment().format('YYYY-MM-DD')
        });
        var lastWeek = this.objService.queryGoogleApi({
            'ids': 'ga:' + this.viewId,
            'dimensions': 'ga:date,ga:nthDay',
            'metrics': 'ga:sessions',
            'start-date': moment().day(0).subtract(1, 'week')
                .format('YYYY-MM-DD'),
            'end-date': moment().day(6).subtract(1, 'week')
                .format('YYYY-MM-DD')
        });
        Promise.all([thisWeek, lastWeek])
            .then(function (results) {
            var data1 = [];
            var data2 = [];
            var labels = [];
            if (results.length > 0) {
                data1 = results[0].rows.map(function (row) {
                    return +row[2];
                });
                data2 = results[1].rows.map(function (row) {
                    return +row[2];
                });
                labels = results[1].rows.map(function (row) {
                    return +row[0];
                });
                labels = labels.map(function (label) {
                    return moment(label, 'YYYYMMDD').format('ddd');
                });
            }
            _this.data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Last Week',
                        borderColor: '#4bc0c0',
                        data: data2
                    },
                    {
                        label: 'This Week',
                        borderColor: '#058dc7',
                        data: data1
                    }
                ]
            };
        })
            .catch(function (err) {
            return console
                .log(err);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LastWeekVsThisWeekAnalysisChart.prototype, "viewId", void 0);
    LastWeekVsThisWeekAnalysisChart = __decorate([
        core_1.Component({
            selector: 'week-chart',
            template: "<p-growl [value]=\"msgs\"></p-growl>  \n                <p-chart type=\"line\" [data]=\"data\"></p-chart>",
            directives: [primeng_1.UIChart, primeng_1.Growl]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], LastWeekVsThisWeekAnalysisChart);
    return LastWeekVsThisWeekAnalysisChart;
}());
exports.LastWeekVsThisWeekAnalysisChart = LastWeekVsThisWeekAnalysisChart;
var NotificationCmp = (function () {
    function NotificationCmp() {
    }
    NotificationCmp = __decorate([
        core_1.Component({
            selector: 'notifications',
            templateUrl: 'admin-templates/dashboard/notifications.html',
            styleUrls: ['admin-templates/dashboard/css/home.css'],
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationCmp);
    return NotificationCmp;
}());
var DashboardComponent = (function () {
    function DashboardComponent(objService) {
        this.objService = objService;
        this.activeUserCount = 0;
        this.prevCount = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getAccessToken();
    };
    DashboardComponent.prototype.getAccessToken = function () {
        var _this = this;
        this.objService.getAccessToken()
            .subscribe(function (res) { return _this.authenticateAnalyticsApi(res); }, function (err) { return _this.errorMessage(err); });
    };
    DashboardComponent.prototype.errorMessage = function (objResponse) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    };
    DashboardComponent.prototype.authenticateAnalyticsApi = function (res) {
        var _this = this;
        var pollingInterval = 60000; //1 min default
        if (res.analyticsData)
            this.viewId = res.analyticsData.analyticsViewID;
        gapi.analytics.auth.authorize({
            'serverAuth': {
                'access_token': res.token.access_token
            }
        });
        if (res.analyticsData.pollingInterval)
            pollingInterval = res.analyticsData.pollingInterval;
        setInterval(function () {
            _this.getActiveUser(res.token.access_token);
        }, pollingInterval);
    };
    DashboardComponent.prototype.getActiveUser = function (accessToken) {
        var _this = this;
        var queryParam = "";
        queryParam += "ids=ga:" + this.viewId;
        queryParam += "&metrics=rt:activeUsers";
        queryParam += "&access_token=" + accessToken;
        this.objService.queryGoogleRealtimeApi(queryParam)
            .subscribe(function (res) {
            if (res.rows.length > 0) {
                _this.activeUserCount = res.rows[0][0];
                if (_this.activeUserCount == _this.prevCount)
                    _this.activeClass = "";
                else
                    _this.activeClass = _this.activeUserCount > _this.prevCount ? 'fa-caret-up' : 'fa-caret-down';
                _this.prevCount = _this.activeUserCount;
            }
            else {
                _this.activeUserCount = 0;
                _this.activeClass = "";
            }
        }, function (err) {
            console.log(err.error.message);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'admin-templates/dashboard/dashboard.html',
            styleUrls: ['admin-templates/dashboard/css/home.css'],
            providers: [dashboard_service_1.DashboardService],
            directives: [UserCount, PageViewComponent, CountryWiseChart, BrowserAnalysisChart, LastWeekVsThisWeekAnalysisChart]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map