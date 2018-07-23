// import {ApplicationLogService} from  './application-log.service'
// import {ApplicationLogModel, ApplicationLogResponse} from './application-log.model';
// import {ApplicationLogComponent}from "./application-log-list.component";
// import {Observable} from "rxjs/Rx";
// import {
//   inject,
//   async,
//   TestBed
// } from '@angular/core/testing'
// import {SharedModule} from "../../../shared/shared.module";
// import {RouterTestingModule} from "@angular/router/testing";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// class MockService extends ApplicationLogService {

//   objResponse: ApplicationLogResponse = new ApplicationLogResponse();
//   objModel: ApplicationLogModel = new ApplicationLogModel();

//   constructor() {
//     super(null);
//     this.objModel._id = "123456abcdef";
//     this.objModel.errorMessage = "error";
//     this.objModel.errorNotified = false;
//     this.objModel.errorStack = "detail on error";
//     this.objModel.errorType = "syntax error";
//     this.objModel.addedBy = "system";
//     this.objResponse.currentPage = 1;
//     this.objResponse.totalItems = 1;
//     this.objResponse.dataList = [this.objModel];
//   }

//   getApplicationLog(perPage: number, currentPage: number, startDate?: string, endDate?: string): Observable<ApplicationLogResponse> {

//     return Observable.of(this.objResponse);
//   };

//   deleteAllLog(): Observable<any> {
//     this.objResponse.dataList = [];
//     return Observable.of({
//       success: true,
//       message: 'log deleted'
//     })
//   }
// }

// describe('Application Log', ()=> {
//   beforeEach(()=> {
//     TestBed.configureTestingModule({
//       imports: [BrowserAnimationsModule,SharedModule, RouterTestingModule],
//       declarations: [ApplicationLogComponent],
//       providers: [
//         {provide: ApplicationLogService, useClass: MockService}
//       ]
//     });
//   });
//   beforeEach(async(()=> {
//     TestBed.compileComponents();
//   }));

//   it('should get the list of application log when authenticated', async(()=> {
//     var fixture = TestBed.createComponent(ApplicationLogComponent);
//     fixture.detectChanges();
//     var component = fixture.debugElement.componentInstance;
//     expect(component.showModal).toBe(false);
//     expect(component.objResponse.dataList.length).toBeGreaterThan(0);
//     expect(component.objResponse.dataList[0].addedBy).toBe("system");
//   }));

//   it('should get the show the application log detail clicked on show detail', async(()=> {
//     var fixture = TestBed.createComponent(ApplicationLogComponent);
//     fixture.detectChanges();
//     var component = fixture.debugElement.componentInstance;
//     var compiled = fixture.debugElement.nativeElement;
//     compiled.querySelector('td a.fa-eye').click();
//     expect(component.showModal).toBe(true);
//   }));

// });
