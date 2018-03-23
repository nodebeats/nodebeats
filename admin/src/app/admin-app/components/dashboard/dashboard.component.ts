/**
 * Created by sanedev on 4/8/16.
 */
import {Component, AfterViewInit, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import {Message}from 'primeng/primeng';
import * as moment from 'moment';
import {DashboardResponseModel} from './dashboard.model';
import {DashboardService} from './dashboard.service';

declare var gapi:any;
@Component({
  selector: 'browser-chart',
  template: '<p-chart *ngIf="data.datasets.length>0" type="doughnut" [data]="data"></p-chart>'
})
export class BrowserAnalysisChart implements OnChanges {
  @Input() viewId:string;
  data:any = {
    labels: [],
    datasets: []
  };

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId)
      this.getBrowserWiseData();
  }

  getBrowserWiseData() {
    this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'dimensions': 'ga:browser',
      'metrics': 'ga:pageviews',
      'sort': '-ga:pageviews',
      'max-results': 5
    })
      .then((response:any)=> {
        let label:string[] = [];
        let value:number[] = [];
        if (response.rows)
          response.rows.forEach(function (row, i) {
            label.push(row[0]);
            value.push(+row[1]);
          });
        this.data = {
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
      .catch((err:any)=>{});
  }
}

@Component({
  selector: 'country-chart',
  template: '<p-chart *ngIf="data.datasets.length>0" type="doughnut" [data]="data"></p-chart>'
})
export class CountryWiseChart implements OnChanges {
  @Input() viewId:string;
  data:any = {
    labels: [],
    datasets: []
  };

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId)
      this.getCounrtyWiseData();
  }

  getCounrtyWiseData() {
    this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'dimensions': 'ga:country',
      'metrics': 'ga:sessions',
      'sort': '-ga:sessions',
      'max-results': 5
    })
      .then((response:any)=> {
        let label:string[] = [];
        let value:number[] = [];
        if (response.rows)
          response.rows.forEach(function (row, i) {
            label.push(row[0]);
            value.push(+row[1]);
          });
        this.data = {
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

      .catch((err:any)=>console.log(err));

  }
}

@Component({
  selector: 'user-count',
  template: ` 
        <div class="col-xl-3 col-lg-6">
            <div class="card card-green card-inverse">
                <div class="card-header card-green">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-user-plus fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-xs-right">
                        <animate-counter [valueToCount]="newUserCount"></animate-counter>
                          
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    <a class="text-green"  target="_blank" href="https://analytics.google.com">
                        <span class="pull-xs-left">New Users</span>
                        <span class="pull-xs-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6">
            <div class="card card-purple card-inverse">
                <div class="card-header card-purple">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-user fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-xs-right">
                              <animate-counter [valueToCount]="returningUserCount"></animate-counter>
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    <a class="text-purple" target="_blank" href="https://analytics.google.com">
                        <span class="pull-xs-left">Returning Users</span>
                        <span class="pull-xs-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </a>
                </div>
            </div>
        </div>`
})
export class UserCount implements OnChanges {
  activeUserCount:number = 0;
  newUserCount:number = 0;
  returningUserCount:number = 0;
  @Input() viewId:string;

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId)
      this.getTotalUsers();

  }

  getTotalUsers() {
    this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'dimensions': 'ga:userType',
      'metrics': 'ga:users',
      'max-results': 5,
      "start-date": "2005-01-01",
      "end-date": moment().format('YYYY-MM-DD')
    })
      .then((res:any)=> {
        if (res.rows && res.rows.length > 0) {
          this.newUserCount = res.rows[0][1];
          this.returningUserCount = res.rows[1][1];
        }
      })
      .catch((err:any)=> {
        swal("Alert !", err.error.message, "info");
      });
  }


}

@Component({
  selector: 'page-view',
  template: ` <div class="col-xl-3 col-lg-6">
            <div class="card card-orange card-inverse">
                <div class="card-header card-orange">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-eye fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-xs-right">
                               <animate-counter [valueToCount]="pageView"></animate-counter>
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    <a class="text-orange"  target="_blank" href="https://analytics.google.com;">
                        <span class="pull-xs-left">Page Views</span>
                        <span class="pull-xs-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </a>
                </div>
            </div>
        </div>`

})
export class PageViewComponent implements OnChanges {
  pageView:number = 0;
  @Input() viewId:string;

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId)
      this.getTotalPageView();
  }

  getTotalPageView() {
    let now = moment();
    this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'metrics': 'ga:pageviews',
      'max-results': 5,
      "start-date": "2005-01-01",
      "end-date": moment(now).format('YYYY-MM-DD')
    })
      .then((res:any)=> {
        if (res.rows.length > 0)
          this.pageView = res.rows[0][0];
      })
      .catch((err)=>console.log(err));
  }

}


@Component({
  selector: 'week-chart',
  template: `<p-chart *ngIf="data.datasets.length>0" type="line" [data]="data"></p-chart>`
})
export class LastWeekVsThisWeekAnalysisChart implements OnChanges {

  data:any = {
    labels: [],
    datasets: []
  };
  msgs:Message[];
  @Input() viewId;

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId)
      this.getSessionData();
  }

  getSessionData() {
    // Adjust `now` to experiment with different days, for testing only...
    // let now = moment(); // .subtract(3, 'day');
    let thisWeek = this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'dimensions': 'ga:date,ga:nthDay',
      'metrics': 'ga:sessions',
      'start-date': moment().day(0).format('YYYY-MM-DD'),
      'end-date': moment().format('YYYY-MM-DD')
    });

    let lastWeek = this.objService.queryGoogleApi({
      'ids': 'ga:' + this.viewId,
      'dimensions': 'ga:date,ga:nthDay',
      'metrics': 'ga:sessions',
      'start-date': moment().day(0).subtract(1, 'week')
        .format('YYYY-MM-DD'),
      'end-date': moment().day(6).subtract(1, 'week')
        .format('YYYY-MM-DD')
    });
    Promise.all<any>([thisWeek, lastWeek])
      .then((results:any)=> {
          let data1 = [];
          let data2 = [];
          let labels = [];
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
          this.data = {
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

        }
      )
      .catch(
        (err)=>
          console.log(err)
      );
  }
}


@Component({
  selector: 'home',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})

export class DashboardComponent implements OnInit,OnDestroy {

  viewId:string;
  activeUserCount:number = 0;
  private prevCount:number = 0;
  activeClass:string;
  pollRealTimeData:any;

  constructor(private objService:DashboardService) {
  }

  ngOnInit() {
    this.getAccessToken();
  }

  getAccessToken() {
    this.objService.getAccessToken()
      .subscribe((res)=>this.authenticateAnalyticsApi(res),
        err => this.errorMessage(err));
  }

  errorMessage(objResponse:any) {
    swal("Alert !", objResponse.message, "info");
  }

  authenticateAnalyticsApi(res:DashboardResponseModel) {
    let pollingInterval:number = 60000;//1 min default
    if (res.analyticsData)
      this.viewId = res.analyticsData.analyticsViewID;
    gapi.analytics.auth.authorize({
      'serverAuth': {
        'access_token': res.token.access_token
      }
    });
    if (res.analyticsData.pollingInterval)
      pollingInterval = res.analyticsData.pollingInterval;
    this.pollRealTimeData = setInterval(()=> {
      this.getActiveUser(res.token.access_token);
    }, pollingInterval);
  }


  getActiveUser(accessToken:string) {
    let queryParam:string = "";
    queryParam += "ids=ga:" + this.viewId;
    queryParam += "&metrics=rt:activeUsers";
    queryParam += "&access_token=" + accessToken;
    this.objService.queryGoogleRealtimeApi(queryParam)
      .subscribe(res => {
          if (res.rows && res.rows.length > 0) {
            this.activeUserCount = res.rows[0][0];
            if (this.activeUserCount == this.prevCount)
              this.activeClass = "";
            else
              this.activeClass = this.activeUserCount > this.prevCount ? 'fa-caret-up' : 'fa-caret-down';
            this.prevCount = this.activeUserCount;
          }
          else {
            this.activeUserCount = 0;
            this.activeClass = "";
          }

        },
        err=> {
          console.log(err.error.message);

        }
      );
  }

  ngOnDestroy() {
    if (this.pollRealTimeData)
      clearInterval(this.pollRealTimeData);
  }
}
