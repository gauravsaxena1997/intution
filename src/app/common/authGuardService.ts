import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private sharedService: SharedService) {

    }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const accessToken = window.localStorage.getItem('x-access-token');
        console.log(accessToken);
        if (accessToken) {
            this.sharedService.checkAccessToken(accessToken).subscribe((x) => {
                console.log(x);
            });
        // active all routes
            return true;
    }
        this.router.navigate(['sign-in']);
        return false;
    }
}
