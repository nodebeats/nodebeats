import {CloudinaryService} from  './cloudinary.service'
import {CloudinaryModel} from './cloudinary.model';
import {Observable} from "rxjs/Rx";
import {
  inject,
  async,
  TestBed
} from '@angular/core/testing'
import {SharedModule} from "../../../shared/shared.module";
import {CloudinarySettingComponent} from "./cloudinary.component";
import {RouterTestingModule} from "@angular/router/testing";
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

  getCloudinarySettings(): Observable < CloudinaryModel > {
    return Observable.of(this.objModel);
  }
}

describe('Cloudinary settings', ()=> {

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CloudinarySettingComponent],
      providers: [
        {provide: CloudinaryService, useClass: MockService}
      ]
    });
  });
  beforeEach(async(()=> {
    TestBed.compileComponents();
  }));

  it('should save/update the cloudinary setting if valid ', async(()=> {
    var fixture = TestBed.createComponent(CloudinarySettingComponent);

    fixture.detectChanges();
    var component = fixture.debugElement.componentInstance;
    var compiled = fixture.debugElement.nativeElement;
    component.cloudinaryForm.controls.cloudinaryApiKey.patchValue("123");
    component.cloudinaryForm.controls.cloudinaryCloudName.patchValue("abc");
    component.cloudinaryForm.controls.cloudinaryApiSecret.patchValue("123");
    expect(compiled.querySelector('button.btn')).not.toBeNull();
    expect(component.cloudinaryForm.valid).toBe(true);
    //fixture.detectChanges();
    expect(component.isPost).toBeUndefined();
  }));

  it('should get the cloudinary setting if already saved', async(() => {
    var fixture = TestBed.createComponent(CloudinarySettingComponent);
    fixture.detectChanges();
    var component = fixture.debugElement.componentInstance;
    expect(component.objCloudinary._id).toBeDefined();
    expect(component.cloudinaryForm.valid).toBe(true);
  }));
});
