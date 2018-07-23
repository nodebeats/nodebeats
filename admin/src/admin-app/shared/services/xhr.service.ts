import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../configs/env.config';
import { Config } from '../configs/general.config';

@Injectable()

export class XhrService {
  constructor() {
  }

  xhrRequest<Tbody, T>(method: string, apiRoute: string, fileName: string, objBody: Tbody, file: File, updateId?: string, imageDeleted?: boolean) : Observable<T> {
    return Observable.create((observer: any) => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      formData.append(fileName, file);
      formData.append('data', JSON.stringify(objBody));
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(JSON.parse(xhr.response));
          }
        }
      };
      xhr.upload.onprogress = (event) => {
      //   //this.progress = Math.round(event.loaded / event.total * 100);
      //   //this.progressObserver.next(this.progress);
      };
      if (method == 'PUT')
        xhr.open('PUT', API_URL + apiRoute + '/' + updateId + '?imagedeleted=' + imageDeleted, true);
      else
        xhr.open(method, API_URL + apiRoute, true);
      xhr.setRequestHeader('Authorization', Config.AuthToken);
      xhr.send(formData);
    });
  }
}