import { Observable } from 'rxjs/Observable';
import {CloudinaryService} from  './cloudinary.service'
import {CloudinaryModel} from './cloudinary.model';
import {
  inject,
  async,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing'
import {SharedModule} from "../../../shared/shared.module";
import {CloudinarySettingComponent} from "./cloudinary.component";
import {RouterTestingModule} from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

class MockService extends CloudinaryService {
  objModel: CloudinaryModel = new CloudinaryModel();

  constructor() {
    super(null);
    this.objModel._id = "123456abcdef";
    this.objModel.cloudinaryApiKey = "12345";
    this.objModel.cloudinaryApiSecret = "secret";
    this.objModel.cloudinaryCloudName = "cloudinay";
  }

  saveCloudinarySettings(objSave: CloudinaryModel): Observable<any> {
    return Observable.of({
      success: true,
      message: 'data saved successfully'
    });
  };

  updateCloudinarySettings(objUpdate: CloudinaryModel, id: string): Observable<any> {
    return Observable.of({
        success: true,
        message: 'data updated successfully'
      });
  }

  getCloudinarySettings(): Observable < CloudinaryModel > {
    return Observable.of(this.objModel);
  }
}

describe('Cloudinary settings', ()=> {

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [CloudinarySettingComponent],
      providers: [
        {provide: CloudinaryService, useClass: MockService}
      ]
    });
  });
  beforeEach(async(()=> {
    TestBed.compileComponents();
  }));

  it('should call the getCloudinary function after the component initiation', fakeAsync(() => {
    let fixture = TestBed.createComponent(CloudinarySettingComponent);
    let app = fixture.debugElement.componentInstance;
    spyOn(app, 'getCloudinarySetting');
    fixture.detectChanges();
    expect(app.getCloudinarySetting).toHaveBeenCalledTimes(1);
  }));

  it("should save the cloudinary setting if id isn't available", fakeAsync(()=> {
    const fixture = TestBed.createComponent(CloudinarySettingComponent);
    const app = fixture.debugElement.componentInstance;
    app.cloudinaryForm.controls.cloudinaryApiKey.patchValue("123");
    app.cloudinaryForm.controls.cloudinaryCloudName.patchValue("abc");
    app.cloudinaryForm.controls.cloudinaryApiSecret.patchValue("123");
    fixture.detectChanges();
    expect(app.cloudinaryForm.valid).toBeTruthy();
  }));

  it('should get the cloudinary setting if already saved', async(() => {
    let fixture = TestBed.createComponent(CloudinarySettingComponent);
    let component = fixture.debugElement.componentInstance;
    component.id = "123456abcdef";
    fixture.detectChanges();
    expect(component.id).toBeDefined();
    expect(component.cloudinaryForm.valid).toBe(true);
  }));

  it('should get swal message according to response', fakeAsync(() => {
    let fixture = TestBed.createComponent(CloudinarySettingComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component.swalMessage).toBeUndefined();
    // spyOn(component, 'saveCloudinarySetting');
    // fixture.detectChanges();
    // fixture.detectChanges();
    // expect(component.saveCloudinarySetting).toHaveBeenCalledTimes(1);
  }));
});
