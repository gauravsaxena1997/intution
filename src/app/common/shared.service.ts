import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseApiService } from './baseApi.service';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public accessToken: string;
  constructor(public afAuth: AngularFireAuth, private router: Router, private baseService: BaseApiService) { }

  public checkAccessToken(token: string) {
    return this.baseService.getReq(Constants.API_URL + 'debug_token', {input_token: token});
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('result', result);
        const cred: any = result.credential;
        this.accessToken = cred.accessToken;
        localStorage.setItem('x-access-token', this.accessToken);
        console.log('You have been successfully logged in!');
        this.router.navigate(['/dashboard']);
    }).catch((error) => {
        console.log(error);
    });
  }
}
