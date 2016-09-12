import {HTTP_PROVIDERS} from "@angular/http";
import {CloudinaryService} from  './cloudinary.service'
import {CloudinaryModel} from './cloudinary.model';
import {CloudinarySettingComponent}from "./cloudinary.component";
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
class MockService extends CloudinaryService {

    objModel:CloudinaryModel = new CloudinaryModel();

    constructor() {
        super(null);
        this.objModel._id = "123456abcdef";
        this.objModel.cloudinaryApiKey = "12345";
        this.objModel.cloudinaryApiSecret = "secret";
        this.objModel.cloudinaryCloudName = "cloudinay";
    }

    saveCloudinarySettings(objSave:CloudinaryModel):Observable<any> {
        return Observable.of({
            success: true,
            message: 'data saved successfully'
        });
    };

    getCloudinarySettings():Observable < CloudinaryModel > {
        return Observable.of(this.objModel);
    }
}

describe('Cloudinary settings', ()=> {
    var builder;


    beforeEach(() => {

        addProviders([
            FormBuilder,
            disableDeprecatedForms(),
            provideForms(),
            HTTP_PROVIDERS,
            DIRECTIVES
        ]);

    });

    it('should get the cloudinary setting if already saved', async(inject([TestComponentBuilder], (tcb)=> {
        return tcb.overrideProviders(CloudinarySettingComponent, [
            {provide: CloudinaryService, useClass: MockService}
        ])
            .createAsync(CloudinarySettingComponent).then((fixture:ComponentFixture<CloudinarySettingComponent>) => {
                fixture.detectChanges();
                var component = fixture.debugElement.componentInstance;
                expect(component.objCloudinary._id).toBeDefined();
                expect(component.cloudinaryForm.valid).toBe(true);
            });
    })));

    it('should save/update the cloudinary setting if valid ', async(inject([TestComponentBuilder], (tcb)=> {
        return tcb.overrideProviders(CloudinarySettingComponent, [
            {provide: CloudinaryService, useClass: MockService}
        ])
            .createAsync(CloudinarySettingComponent).then((fixture:ComponentFixture<CloudinarySettingComponent>) => {
                fixture.detectChanges();
                var component = fixture.debugElement.componentInstance;
                var compiled = fixture.debugElement.nativeElement;
                component.cloudinaryForm.controls.cloudinaryApiKey.updateValue("123");
                component.cloudinaryForm.controls.cloudinaryCloudName.updateValue("abc");
                component.cloudinaryForm.controls.cloudinaryApiSecret.updateValue("123");
                expect(compiled.querySelector('button.btn')).not.toBeNull();
                expect(component.cloudinaryForm.valid).toBe(true);
                //fixture.detectChanges();
                expect(component.isPost).toBeUndefined();
            });
    })));

});