import {UserListComponent} from "./user-list.component";
import {UserService} from "./user.service";
import {HTTP_PROVIDERS, RequestOptions} from "@angular/http";
import {provide} from "@angular/core";
import {HeaderIntercept} from '../../../shared/services/header-intercept';
import {UserResponse}  from "./user.model";
import 'rxjs/Rx';
import {
    it,
    describe,
    expect,
    beforeEach,
    beforeEachProviders,
    inject,
    fakeAsync,
    tick,
    async

} from '@angular/core/testing';
import {UserViewComponent} from "./user-view.component";



describe('User Management', () => {
    beforeEachProviders(() => [UserService, HTTP_PROVIDERS, provide(RequestOptions, {useClass: HeaderIntercept})]);

    it('Should get Userlist', inject([UserService], (service)=> {
        let perPage:number = 5;
        let current:number = 1;
        service.getUserList(perPage, current).subscribe((res)=> {
            expect(res.dataList.length).toBeGreaterThan(0);
        });
    }));
});
