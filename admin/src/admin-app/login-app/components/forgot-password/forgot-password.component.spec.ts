import { Observable } from 'rxjs/Observable';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from './../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async, tick, fakeAsync, ComponentFixture } from "@angular/core/testing";
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordModel } from './forgot-password.model';
import { By } from '@angular/platform-browser';

let component: ForgotPasswordComponent;
let fixture: ComponentFixture<ForgotPasswordComponent>;

class MockService extends ForgotPasswordService{
    constructor() {
        super(null);
    }

    forgotPassword(objModel: ForgotPasswordModel): Observable<any> {
        return Observable.of(
            {
                message: 'Please check your email',
                status: 200
            }
        )
    }
}

describe('Forgot Password Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
            declarations: [ForgotPasswordComponent]
        }).overrideComponent(ForgotPasswordComponent, {
            set: {
                providers: [
                    {provide: ForgotPasswordService, useClass: MockService}
                ]
            }
        }).compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(ForgotPasswordComponent);
            component = fixture.debugElement.componentInstance;
        });
    }));

    it('should show the form is invalid', async(() => {
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('button')).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(component.forgotPasswordForm.valid).toBeFalsy();
    }));

    it('should show the success message', async(() => {
        fixture.detectChanges();
        component.forgotPasswordForm.controls.email.patchValue('help@nodebeats.com');
        component.forgotPasswordForm.controls.securityQuestion.patchValue("Who was your childhood hero ?");
        component.forgotPasswordForm.controls.securityAnswer.patchValue('Salman Khan');
        fixture.detectChanges();
        expect(component.forgotPasswordForm.valid).toBeTruthy();
        let button = fixture.debugElement.query(By.css('button')).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(component.objResponse).toBe('Please check your email');
    }));
})