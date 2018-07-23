import Swal from 'sweetalert2';
import {Component, AfterViewInit, OnInit, Input, OnChanges, OnDestroy, Inject} from '@angular/core';
import * as moment from 'moment';
import {DashboardResponseModel} from './dashboard.model';
import {DashboardService} from './dashboard.service';

declare var gapi:any;
@Component({
  selector: 'browser-chart',
  template: `
  <div *ngIf="pieChartData?.length>0">
    <canvas baseChart
          [data]="pieChartData"
          [labels]="pieChartLabels"
          [chartType]="pieChartType"></canvas>
  </div>
  `
})
export class BrowserAnalysisChart implements OnChanges {
  public pieChartLabels:string[];
  public pieChartData:number[];
  public pieChartType:string = 'pie';
 
  @Input() viewId:string;

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
          response.rows.forEach(function (row: any, i: any) {
            label.push(row[0]);
            value.push(+row[1]);
          });
        this.pieChartLabels = label;
        this.pieChartData = value;
      })
      .catch((err:any)=>{});
  }
}

@Component({
  selector: 'country-chart',
  template: `
  <div *ngIf="doughnutChartData?.length>0">
    <canvas baseChart
                [data]="doughnutChartData"
                [labels]="doughnutChartLabels"
                [chartType]="doughnutChartType">
    </canvas>
  </div>
  `
})
export class CountryWiseChart implements OnChanges {
  public doughnutChartLabels:string[];
  public doughnutChartData:number[];
  public doughnutChartType:string = 'doughnut';
  @Input() viewId:string;

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
          response.rows.forEach(function (row: any, i: any) {
            label.push(row[0]);
            value.push(+row[1]);
          });
        this.doughnutChartLabels = label;
        this.doughnutChartData = value;
      })

      .catch((err:any)=>console.log(err));

  }
}

@Component({
  selector: 'user-count',
  template: ` 
    <div class="row">
      <div class="col-lg-6">
        <div class="media">
          <i class="fas fa-user-plus rd "></i>
          <div class="media-body p-2">
            <h5>New Users</h5>
            <span class="count"><animate-counter [valueToCount]="newUserCount"></animate-counter></span>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="media">
          <i class="fas fa-users grn"></i>
          <div class="media-body p-2">
            <h5>Returning Users</h5>
            <span class="count"><animate-counter [valueToCount]="returningUserCount"></animate-counter></span>
          </div>
        </div>
      </div>
    </div>`,
    styleUrls: ['./dashboard.scss'],
})
export class UserCount implements OnChanges {
  activeUserCount:number = 0;
  newUserCount:number = 0;
  returningUserCount:number = 0;
  @Input() viewId:string;

  constructor(@Inject(DashboardService)private objService:DashboardService) {
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
        Swal("Alert !", err.error.message, "info");
      });
  }


}

@Component({
  selector: 'page-view',
  template: `
  <div class="media">
    <a target="_blank" class="media-link" href="https://analytics.google.com"></a>
    <i class="fas fa-eye blue"></i>
    <div class="media-body p-2">
      <h5>Page Views</h5>
      <span class="count"><animate-counter [valueToCount]="pageView"></animate-counter></span>
    </div>
  </div>
  `,
  styleUrls: ['./dashboard.scss']
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
  template: `
  <div *ngIf="lineChartData">
    <canvas baseChart width="800" height="150"
    [datasets]="lineChartData"
    [labels]="lineChartLabels"
    [options]="lineChartOptions"
    [colors]="lineChartColors"
    [legend]="lineChartLegend"
    [chartType]="lineChartType"
    (chartHover)="chartHovered($event)"
    (chartClick)="chartClicked($event)"></canvas>
</div>
  `
})
export class LastWeekVsThisWeekAnalysisChart implements OnChanges {
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  @Input() viewId: string;

  constructor(private objService:DashboardService) {
  }

  ngOnChanges() {
    if (this.viewId){
      this.getSessionData();
    }
  }

  getSessionData() {
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
            data1 = results[0].rows.map(function (row: any) {
              return +row[2];
            });
            data2 = results[1].rows.map(function (row: any) {
              return +row[2];
            });
            labels = results[1].rows.map(function (row: any) {
              return +row[0];
            });
            labels = labels.map(function (label: string) {
              return moment(label, 'YYYYMMDD').format('ddd');
            });
          }
          this.lineChartData = [
            {data: data1, label: 'This Week'},
            {data: data2, label: 'Last Week'},
          ];
          this.lineChartLabels = labels;
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
    Swal("Alert !", objResponse, "info");
  }

  authenticateAnalyticsApi(res:DashboardResponseModel) {
    let pollingInterval:number = 1000;//1 min default
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