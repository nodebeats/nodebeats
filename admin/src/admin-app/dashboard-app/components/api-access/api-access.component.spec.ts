import { Observable } from 'rxjs/Observable';
import { ApiAccessService } from './api-access.service';
import { ApiAccessComponent } from './api-access.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { SharedModule } from '../../../shared/shared.module';

class MockApiAccessService extends ApiAccessService { 
    getAccessList(): Observable<any[]> {
        return Observable.of([
            {_id: '1234', roleName: 'admin', routeApi: '/api/news', active: true},
            {_id: '1234', roleName: 'superadmin', routeApi: '/api/blog', active: true}
        ])
    }
}

describe('ApiAccessComponent', (() => {
    let comp: ApiAccessComponent;
    let fixture: ComponentFixture<ApiAccessComponent>;
    let service: ApiAccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule, RouterTestingModule
            ],
            declarations: [ApiAccessComponent],
            providers: [
                {provide: ApiAccessService, useClass: MockApiAccessService}
            ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ApiAccessComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should have two api access data', async(() => {
        service = TestBed.get(ApiAccessService);
        service.getAccessList().subscribe(res => {
            expect(res.length).toEqual(2);
        });    
    }))
}))