import { SharedModule } from './../../../shared/shared.module';
import {LoginService} from  './login.service'
import {LoginModel, LoginResponse} from './login.model';
import {LoginComponent}from "./login.component";
import {Observable} from "rxjs/Rx";
import {
  inject,
  async,
  TestBed
} from '@angular/core/testing'
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import {HttpModule} from "@angular/http";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {Config} from "../../../shared/configs/general.config";
import createSpy = jasmine.createSpy;
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { By } from '@angular/platform-browser';

//TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// export const IncludProvider = [
//     FormBuilder,
//     {provide: APP_BASE_HREF, useValue: '/'}, // must be second
//     {provide: ActivatedRoute, useClass: Mock},
//     {provide: Router, useClass: Mock},
// ];
//
class MockSingleLoginService extends LoginService {
  loggedIn: boolean = false;
  redirectUrl: string;

  constructor() {
    super(null);
  }

  isValidLogin = (): Observable<boolean>=> {
    return Observable.of(false);
  };

  login = (loginCred: LoginModel): Observable<LoginResponse>=> {
    let objResponse: LoginResponse = new LoginResponse();
    objResponse.success = false;
    return Observable.of(objResponse);
  };
}


describe("Verify Not Already Login", () => {
  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [LoginComponent],
      providers: [
        {provide: LoginService, useClass: MockSingleLoginService}
      ]
    });
  });
  beforeEach(async(()=> {
    TestBed.compileComponents();
  }));

  it('should check the Validation if there is previously stored token and respond with inValid Login',
    async(()=> {
      let fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      let component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(component.isValidLogin).toBe(false);
  }));

  it('should show the LoginForm', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('Nodebeats Login');
    let component = fixture.debugElement.componentInstance;
    expect(component.loginForm).toBeDefined();
  }));

  it('should show the required message when trying to login with empty username /password field',
    async(()=> {
      let fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent).toContain('User Name is required');
  }));

  it('should show the invalid credential message when trying to login with wrong credential', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let component = fixture.debugElement.componentInstance;
    component.loginForm.controls.username.patchValue("wrongUserName");
    component.loginForm.controls.password.patchValue("wrongPassword");
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.objResponse.success).toBe(false);
    expect(component.slide).toBe("expand");
  }));
});
/*
 * Note:  Here we cannot test the success login due to the full Page redirect  to the admin  page.
 * Hopefully will be able to solve this in next release with Angular 2 getting more stable
 * */
// export class Mock {
//
// }
class MockTFALoginService extends LoginService {
  constructor() {
    super(null);
  }

  isValidLogin = (): Observable<boolean> => {
    return Observable.of(false);
  };

  login = (loginCred: LoginModel): Observable<LoginResponse>=> {
    let objResponse: LoginResponse = new LoginResponse();
    switch (loginCred.username) {
      case "wrongUserName":
        objResponse.success = false;
        objResponse.message = "associated message";
        break;
      case "rightUserName":
        objResponse.success = true;
        objResponse.twoFactorAuthEnabled = true;
        objResponse.userId = "loginUserId";
        break;
    }
    return Observable.of(objResponse);
  };

  tfaVerification = (userId: string, token: number): Observable<LoginResponse> => {
    let objResponse: LoginResponse = new LoginResponse();
    switch (token.toString()) {
      case "123456":
        objResponse.success = false;
        objResponse.message = "TOTP Token not verified";
        break;
    }
    return Observable.of(objResponse);
  };
}
//
describe('Login with the TFA Enabled ', ()=> {

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [LoginComponent],
      providers: [
        {provide: LoginService, useClass: MockTFALoginService}
      ]
    });
  });
  beforeEach(async(()=> {
    TestBed.compileComponents();
  }));

  it('should check the Validation if there is previously stored token and respond with not Valid Login', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(component.isValidLogin).toBe(false);
  }));

  it('should show the LoginForm', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);

    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('Nodebeats Login');
    let component = fixture.debugElement.componentInstance;
    expect(component.loginForm).toBeDefined();
    expect(component.tfaEnabled).toBe(false);
  }));

  it('should show the required message when trying to login with empty username /password field', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);

    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    // compiled.query(By.css('button')).click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent).toContain('User Name is required');
  }));

  it('should show the invalid credential message when trying to login with wrong credential', async(() => {

    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let component = fixture.debugElement.componentInstance;
    component.loginForm.controls.username.patchValue("wrongUserName");
    component.loginForm.controls.password.patchValue("wrongPassword");
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    // compiled.query(By.css('button')).click();
    fixture.detectChanges();
    expect(component.loginForm.valid).toBe(true);
    expect(component.objResponse.success).toBe(false);
    expect(component.slide).toBe("expand");
  }));
  it('should show the TFA TOKEN entry filed when credential verified', async(()=> {

    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let component = fixture.debugElement.componentInstance;
    component.loginForm.controls.username.patchValue("rightUserName");
    component.loginForm.controls.password.patchValue("rightPassword");
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    // compiled.query(By.css('button')).click();
    fixture.detectChanges();
    expect(component.tfaEnabled).toBe(true);
    expect(component.slide).toBe("collapse");
    expect(component.userId).toBe("loginUserId");
    expect(compiled.textContent).toContain("Nodebeats 2FA Login");
  }));
  it('should show the required message when submit with empty TFA TOKEN entry filed', async(() => {
    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let component = fixture.debugElement.componentInstance;
    component.tfaEnabled = true;
    fixture.detectChanges();
    expect(compiled.textContent).toContain("Nodebeats 2FA Login");
    expect(fixture.debugElement.query(By.css('button')).nativeElement).not.toBeNull();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    // compiled.queryAll(By.css('button'))[1].click();
    fixture.detectChanges();
    expect(component.tfaForm.valid).toBe(false);
    // expect(compiled.querySelector('.error-msg').textContent).toContain('*');
  }));
  it('should show the error message when submit with wrong TFA TOKEN entry filed', async(() => {
    let fixture = TestBed.createComponent(LoginComponent);

    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let component = fixture.debugElement.componentInstance;
    component.tfaEnabled = true;
    fixture.detectChanges();
    component.tfaForm.controls.token.patchValue("123456"); //wrong token
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    // compiled.queryAll(By.css('button'))[1].click();
    fixture.detectChanges();
    expect(component.tfaForm.valid).toBe(true);
    expect(component.slide).toBe("expand");
  }));
});
class MockAlreadyLoggedInService extends LoginService {
  constructor() {
    super(null);
  }

  isValidLogin = (): Observable<boolean>=> {
    return Observable.of(true);
  }
}

describe("Verify Already Login", () => {
  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [LoginComponent],
      providers: [
        {provide: LoginService, useClass: MockAlreadyLoggedInService}
      ]
    });
  });
  beforeEach(async(()=> {
    TestBed.compileComponents();
  }));

  it('should verify the already Valid Login', async(()=> {
    let fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let component = fixture.debugElement.componentInstance;
    Config.getAuthToken = createSpy('getAuthToken() spy').and.returnValue("token");
    component.ngOnInit();
    //    fixture.detectChanges();
    expect(component.isValidLogin).toBe(true);
  }));
});
