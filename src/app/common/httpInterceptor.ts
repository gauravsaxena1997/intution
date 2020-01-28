import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseApiService } from './baseApi.service';

@Injectable()
export class HttpService {

}

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor (private baseService: BaseApiService) {
  }

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

    const headersObj = {
      'x-access-token' :  window.localStorage.getItem('x-access-token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Origin, Content-Type, X-Auth-Token, x-access-token',
      'Access-Control-Allow-Origin': '*'
    };

    // special case handling added to upload file
    if (req.responseType === 'json') {
      delete headersObj['Content-Type'];
    }
    // Clone the request to add the new header.
    const headers: any = new HttpHeaders(headersObj);

    let authReq = req;

    console.log('Sending request with new header now ...', authReq);

    // send the newly created request
    return next.handle(authReq).pipe(
      catchError((err) => {
        switch (err.status) {
          case 400:
            this.baseService.showError(err.msg);
            break;
          case 401:
            this.baseService.showError('Unauthorized');
            break;
          case 403:
            this.baseService.showError('Forbidden');
            break;
          case 404:
            this.baseService.showError('No such resource found');
            break;
          case 422:
            this.baseService.showError(err.error.error.message || err.message);
            break;
          case 500:
            this.baseService.showError('An unknown server error has occurred');
            break;
          default:
            break;
        }
        // intercept the response error and displace it to the console
        console.log('Error Occurred', err);

        // return the error to the method that called it
        return throwError(err);
      })
    );
  }
}
