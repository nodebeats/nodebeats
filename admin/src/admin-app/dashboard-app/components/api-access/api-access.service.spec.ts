// import { ApiAccessService } from './api-access.service';

// describe('ApiAccessService', () => {
//     let httpClientSpy: { get: jasmine.Spy};
//     let apiAccessService: ApiAccessService;

//     beforeEach(() => {
//         httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//         apiAccessService = new ApiAccessService(<any> httpClientSpy);
//     });

//     it('should return expected api access list', () => {
//         const expectedApiList: any[] = [
//             {_id: '1234', roleName: 'admin', routeApi: '/api/news', active: true},
//             {_id: '5678', roleName: 'superadmin', routeApi: '/api/blog', active: true},
//             {_id: '9101', roleName: 'admin', routeApi: '/api/gallery', active: true}
//         ];

//         httpClientSpy.get.and.returnValue(asyncData(expectedApiList));

//         apiAccessService.getAccessList().subscribe(
//             list => expect(list).toEqual(expectedApiList, 'expected Api Access List')
//         );

//         expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
//     });

// });
