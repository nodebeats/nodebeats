import { ApiAccessComponent } from './api-access.component';
import { SharedModule } from './../../../shared/shared.module';
import { ApiAccessHomeComponent } from './api-access-home.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ApiAccessHomeComponent', ()=> {
    let component: ApiAccessHomeComponent;
    let fixture: ComponentFixture<ApiAccessHomeComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule, RouterTestingModule
            ],
            declarations: [ApiAccessHomeComponent]
        })
    });

    beforeEach(() => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ApiAccessHomeComponent);
        component = fixture.componentInstance;
    });

    it(`should have as title 'Api Access Management'`, () => {
        expect(component.title).toEqual('Api Access Management');
    });

    it(`should render title in h1`, () => {
        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('h1'));
        htmlElement = debugElement.nativeElement;
        fixture.whenStable().then(() => {
            expect(htmlElement.textContent).toContain('Api Access Management');
        });
    });
})