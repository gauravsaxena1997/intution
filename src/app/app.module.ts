import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { MaterialModule } from './material-ui/material-ui.module';
import {HttpService, MyHttpInterceptor} from './common/httpInterceptor';


import { AuthGuardService } from './common/authGuardService';
import { BaseApiService } from './common/baseApi.service';
import { SharedService } from './common/shared.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule
  ],
  providers: [
    HttpService,
    {
      'provide': HTTP_INTERCEPTORS,
      'useClass': MyHttpInterceptor,
      'multi': true
    },
    AuthGuardService,
    BaseApiService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
