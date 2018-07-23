import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { TeamManagementEditorComponent } from './team-management-editor.component';
import { SharedModule } from './../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TeamManagementService } from './team-managment.service';
import { TeamManagementModel } from './team-managment.model';
import { By } from '@angular/platform-browser';

let component: TeamManagementEditorComponent;
let fixture: ComponentFixture<TeamManagementEditorComponent>;
let service: TeamManagementService;

class MockService extends TeamManagementService {
    constructor() {
        super(null, null, null);
    }

    saveTeamMember(objModel: TeamManagementModel, file: File): Observable<any> {
        // console.log('================================>', "inside")
        return Observable.of({
            message: 'Team member saved successfully'
        })
    }

    getTeamMemberDetail(id: string): Observable<any> {
        let objModel: TeamManagementModel = new TeamManagementModel();
        return Observable.of(objModel);
    }

}

describe('Team Management Editor Component', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
          declarations: [TeamManagementEditorComponent]
      }).overrideComponent(TeamManagementEditorComponent, {
          set: {
              providers: [
                  {provide: TeamManagementService, useClass: MockService}
              ]
          }
      }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TeamManagementEditorComponent);
        component = fixture.debugElement.componentInstance;
        service = fixture.debugElement.injector.get(TeamManagementService);
      });
  }));

  it('should show status of form whether it is valid or invalid', async(() => {
      fixture.detectChanges();
      expect(component.teamMgmtForm.valid).toBeFalsy();
      component.teamMgmtForm.controls.teamMemberName.patchValue('abcd');
      component.teamMgmtForm.controls.email.patchValue('abcd@gmail.com');
      component.teamMgmtForm.controls.imageFormControl.patchValue('image');
      component.teamMgmtForm.controls.designation.patchValue('abcd');
      fixture.detectChanges();
      expect(component.teamMgmtForm.valid).toBeTruthy();
  }));

  it('should get the data according to the id', fakeAsync(()=> {

  })
)

//   it('should submit the form and display response message', async(() => {
//     let spy = spyOn(service, 'saveTeamMember');
//     let modifiedDate = new Date();
//     let file = new File(['test-file.jpg'], "{lastModified : modifiedDate, type: 'image/jpeg'}");
//     component.file = file;
//     component.teamMgmtForm.controls.teamMemberName.patchValue('abcd');
//     component.teamMgmtForm.controls.email.patchValue('abcd@gmail.com');
//     component.teamMgmtForm.controls.imageFormControl.patchValue('image');
//     component.teamMgmtForm.controls.designation.patchValue('abcd');
//     fixture.detectChanges();
//     expect(component.teamMgmtForm.valid).toBeTruthy();
//     let button = fixture.debugElement.query(By.css('button')).nativeElement;
//     button.click();
//     fixture.detectChanges();
//     // expect(spy.calls.any()).toBe(true);
//     // expect(component.isSubmitted).toBeTruthy();
// }));
})
