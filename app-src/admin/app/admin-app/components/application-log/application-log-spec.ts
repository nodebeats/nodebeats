import {HTTP_PROVIDERS} from "@angular/http";
import {ApplicationLogService} from  './application-log.service'
import {ApplicationLogModel, ApplicationLogResponse} from './application-log.model';
import {ApplicationLogComponent}from "./application-log-list.component";
import {Observable} from "rxjs/Rx";
import {FormBuilder} from '@angular/forms';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {DIRECTIVES} from '../../../../app-config/platform/browser-directives';
import {
    inject,
    addProviders,
    async
} from '@angular/core/testing'
import{
    TestComponentBuilder,
    ComponentFixture
} from '@angular/compiler/testing';
class MockService extends ApplicationLogService {

    objResponse:ApplicationLogResponse = new ApplicationLogResponse();
    objModel:ApplicationLogModel = new ApplicationLogModel();
    constructor() {
        super(null);
        this.objModel._id = "123456abcdef";
        this.objModel.errorMessage = "error";
        this.objModel.errorNotified = false;
        this.objModel.errorStack = "detail on error";
        this.objModel.errorType = "syntax error";
        this.objModel.addedBy = "system";
        this.objResponse.currentPage = 1;
        this.objResponse.totalItems = 1;
        this.objResponse.dataList = [this.objModel];
    }

    getApplicationLog(perPage:number, currentPage:number, startDate?:string, endDate?:string):Observable<ApplicationLogResponse> {

        return Observable.of(this.objResponse);
    };
    deleteAllLog():Observable<any> {
        this.objResponse.dataList =[];
        return Observable.of({
            success:true,
            message:'log deleted'
        })
    }
}

describe('Application Log', ()=> {

    beforeEach(() => {

        addProviders([
            FormBuilder,
            disableDeprecatedForms(),
            provideForms(),
            HTTP_PROVIDERS,
            DIRECTIVES
        ]);

    });

    it('should get the list of application log when authenticated', async(inject([TestComponentBuilder], (tcb)=> {
        return tcb.overrideProviders(ApplicationLogComponent, [
            {provide: ApplicationLogService, useClass: MockService}
        ])
            .createAsync(ApplicationLogComponent).then((fixture:ComponentFixture<ApplicationLogComponent>) => {
                fixture.detectChanges();
                var component = fixture.debugElement.componentInstance;
                expect(component.showModal).toBe(false);
                expect(component.objResponse.dataList.length).toBeGreaterThan(0);
                expect(component.objResponse.dataList[0].addedBy).toBe("system");
            });
    })));

    it('should get the show the application log detail clicked on show detail', async(inject([TestComponentBuilder], (tcb)=> {
        return tcb.overrideProviders(ApplicationLogComponent, [
            {provide: ApplicationLogService, useClass: MockService}
        ])
            .createAsync(ApplicationLogComponent).then((fixture:ComponentFixture<ApplicationLogComponent>) => {
                fixture.detectChanges();
                var component = fixture.debugElement.componentInstance;
               var compiled = fixture.debugElement.nativeElement;
                compiled.querySelector('td a.fa-eye').click();
                expect(component.showModal).toBe(true);
            });
    })));

});