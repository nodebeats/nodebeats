import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CloudinaryService } from './cloudinary.service';
import { API_URL } from "../../../shared/configs/env.config";
 
describe('CloudinaryService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: API_URL, useValue: 'http://example.com' },
        CloudinaryService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getCloudinarySettings()', () => {

    it('should return an Observable<CloudinarySettings>',
        inject([CloudinaryService, XHRBackend], (cloudinaryService, mockBackend) => {

        const mockResponse = {
            cloudinaryApiKey: "489173838156623",
            cloudinaryApiSecret: "ohCavTbeZTr86AErRqHu5tazeTc",
            cloudinaryCloudName: "dav-business-school",
            _id: "57a18237407fcbac203bef59"
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        cloudinaryService.getCloudinarySettings().subscribe((cloudinaryData) => {
          expect(cloudinaryData.cloudinaryApiKey).toEqual('489173838156623');
          expect(cloudinaryData.cloudinaryApiSecret).toEqual('ohCavTbeZTr86AErRqHu5tazeTc');
          expect(cloudinaryData.cloudinaryCloudName).toEqual('dav-business-school');
          expect(cloudinaryData._id).toEqual('57a18237407fcbac203bef59');
        });

    }));
  });
});