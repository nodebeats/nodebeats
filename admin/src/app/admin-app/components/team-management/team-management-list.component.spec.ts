import { FileOperrationService } from './../../../shared/services/fileOperation.service';
import { XhrService } from './../../../shared/services/xhr.service';
import { fakeAsync } from '@angular/core/testing';
import { TeamManagementComponent } from './team-management-list.component';
import { SharedModule } from './../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamManagementService } from './team-managment.service';
import { Observable } from 'rxjs/Observable';
import { TeamManagementResponse, TeamManagementModel } from './team-managment.model';
import { By } from '@angular/platform-browser';

let component: TeamManagementComponent;
let fixture: ComponentFixture<TeamManagementComponent>;
let service: TeamManagementService;

class MockService extends TeamManagementService {
    constructor() {
        super(null, null, null);
    }

    getTeamMemberList(perPage: number, currentPage: number): Observable<TeamManagementResponse> {
        let objResponse: TeamManagementResponse = new TeamManagementResponse();
        objResponse.totalItems = 5;
        return Observable.of(objResponse);
    }

    deleteTeamMember(objModel: TeamManagementModel): Observable<any> {
        return Observable.of({
            message: 'Person deleted successfully'
        })
    }
}

describe('Team Management List Component',() => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
            declarations: [TeamManagementComponent],
            providers: [TeamManagementService]
        }).overrideComponent(TeamManagementComponent, {
            set: {
                providers: [
                    {provide: TeamManagementService, useClass: MockService}
                ]
            }
        }).compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(TeamManagementComponent);
            component = fixture.debugElement.componentInstance;
            service = fixture.debugElement.injector.get(TeamManagementService);
        })
    }));

    it('should have resolve total Items to be 5', async(() => {
        expect(component.objListResponse).toBeUndefined();
        expect(component.dataSource).toBeUndefined();
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.objListResponse.totalItems).toEqual(5);
        expect(component.dataSource).toBeDefined();
    }));

    it('should successfully delete a team member', async(() => {
        expect(service instanceof MockService).toBeTruthy();
        let objData: TeamManagementModel = new TeamManagementModel();
        service.deleteTeamMember(objData).subscribe(res => {
            expect(res.message).toEqual('Person deleted successfully');
        });
    }))

    // it('should call the move up and down function', async(() => {
    //     const upSpy = spyOn(component, 'moveUp');
    //     const downSpy = spyOn(component, 'moveDown');
    //     component.ngOnInit();
    //     fixture.detectChanges();
    //     let compiled = fixture.debugElement.nativeElement;
    //     let button = fixture.debugElement.query(By.css('fa-caret-up'));
    //     console.log("===============================================================>", button);
    //     // button.click();
    //     fixture.detectChanges();
    //     expect(upSpy.calls.any()).toEqual(true);
    // }))
});