import { ApiAccessService } from './api-access.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../shared/shared.module';
import { ComponentFixture, async, TestBed, tick } from '@angular/core/testing';
import { ApiAccessEditorComponent } from './api-access-editor.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RoleService } from '../role-management/role.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

class mockApiAccessService extends ApiAccessService {
    apiDetail: any = {_id: '1234', routeApi: '/api/news', roleName: 'admin', active: true};
    
    getAccessDetail(id: string): Observable<any> {
        return Observable.of(this.apiDetail);
    }

    updateAccess(obj: any, id: string) {
        return Observable.of("Updated Successfully!")
    }
}

describe('Api Access Editor Component', () => {
    let fixture : ComponentFixture<ApiAccessEditorComponent>;
    let app : ApiAccessEditorComponent;
    let getRoleSpy;
    let mockRoleService;
    let mockApiService;

    beforeEach(async(() => {
        const roleList: any[] = [
            {_id: '123', roleName: 'superadmin'},
            {_id: '1234', roleName: 'admin'},
            {_id: '12345', roleName: 'user'}            
        ];

        mockRoleService = jasmine.createSpyObj('RoleService', ['getRoleList']);
        getRoleSpy = mockRoleService.getRoleList.and.returnValue(Observable.of(roleList));
        mockApiService = jasmine.createSpyObj('ApiAccessService', ['updateAccess']);

        TestBed.configureTestingModule({
            declarations: [ApiAccessEditorComponent],
            imports: [
                SharedModule, RouterTestingModule, BrowserAnimationsModule
            ],
            providers: [
                {provide: ApiAccessService, useClass: mockApiAccessService},
                {provide: RoleService, useValue: mockRoleService}
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ApiAccessEditorComponent);
            app = fixture.componentInstance;
        });
    }));

    it('should have isSubmitted variable as false', async(() => {
        expect(app.isSubmitted).toBeFalsy();
    }));

    it('should set isSubmitted to true', async(() => {
        app.saveApiAccess();
        expect(app.isSubmitted).toBeTruthy();
    }));

    it('should call getRoleList method after component initialization', async(() => {
        app.ngOnInit();
        fixture.whenStable().then(() => {
            expect(getRoleSpy.calls.any()).toBe(true, 'getRoleList called');
        })
    }));
    
    it('form should be invalid', async(() => {
        app.apiAccessForm.controls['routeApi'].setValue('');
        app.apiAccessForm.controls['roleName'].setValue('');
        app.apiAccessForm.controls['active'].setValue('');        
        expect(app.apiAccessForm.valid).toBeFalsy();
    }));

    it('form should be valid', () => {
        app.apiAccessForm.controls['routeApi'].setValue('/api/news');
        app.apiAccessForm.controls['roleName'].setValue(['superadmin, admin, user']);
        app.apiAccessForm.controls['active'].setValue(true);
        fixture.detectChanges();
        expect(app.apiAccessForm.valid).toBeTruthy();
    });

    it('should call the saveApiAccess method', async(() => {
        fixture.detectChanges();
        spyOn(app, 'saveApiAccess');
        const el = fixture.debugElement.query(By.css('button')).nativeElement;
        el.click();
        expect(app.saveApiAccess).toHaveBeenCalledTimes(1);
    }));
    
    it('should call the triggerCancelForm method', async(() => {
        fixture.detectChanges();
        spyOn(app, 'triggerCancelForm');
        const buttonList = fixture.debugElement.queryAll(By.css('button'));
        buttonList[1].nativeElement.click();
        expect(app.triggerCancelForm).toHaveBeenCalledTimes(1);
    }));

    // it('should update the api access data', async(() => {
    //     // spyOn(mockApiService, 'updateAccess');
    //     app.accessId = '1234';
    //     app.apiAccessForm.controls['routeApi'].setValue('/api/news');
    //     app.apiAccessForm.controls['roleName'].setValue(['superadmin, admin, user']);
    //     app.apiAccessForm.controls['active'].setValue(true);
    //     fixture.detectChanges();
    //     const el = fixture.debugElement.query(By.css('button')).nativeElement;
    //     el.click();
    //     fixture.whenStable().then(() => {
    //         expect(mockApiService.updateAccess).toHaveBeenCalledTimes(1);
    //     })
    // }))

});