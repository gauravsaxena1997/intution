import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  'providedIn': 'root'
})

export class BaseApiService {

  constructor (private http: HttpClient, private toasterService: ToastrService) {}

  public isLoading = false;

  public showSuccess (msg) {
    this.toasterService.success(msg, null);
  }

  public showError (msg) {
    this.toasterService.error(msg, null);
  }

  public showWarning (msg) {
    this.toasterService.warning(msg, 'warning');
  }

  public postReq (url, data, params) {
    return this.http.post(url, data, params);
  }

  public putReq (url, data) {
    return this.http.put(url, data);
  }

  public deleteReq (url, data) {
    return this.http.delete(url, data);
  }

  public getReq (url, data) {
      console.log('data', data);
      
    return this.http.get(url, data);
  }
}
