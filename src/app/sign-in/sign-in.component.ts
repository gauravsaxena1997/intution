import { Component, OnInit } from '@angular/core';

import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  public signInWithFB(): void {
    this.sharedService.FacebookAuth();
  }

  ngOnInit() {
  }

}
