import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppMdModule } from './app-md.module';

import { AppComponent } from './app.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from "angularfire2";
// for AngularFireDatabase
import { AngularFireDatabaseModule } from "angularfire2/database";
// for AngularFireAuth
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    AppMdModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCN00joMzTLb2evRaDI3pf3Dbbh1Fp36_U",
      authDomain: "angularfirebasecloudmessaging.firebaseapp.com",
      databaseURL: "https://angularfirebasecloudmessaging.firebaseio.com",
      projectId: "angularfirebasecloudmessaging",
      storageBucket: "angularfirebasecloudmessaging.appspot.com",
      messagingSenderId: "255011948038",
      appId: "1:255011948038:web:c3543eb35134b633"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
