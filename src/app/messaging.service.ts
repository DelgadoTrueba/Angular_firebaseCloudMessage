import { Injectable, ɵConsole } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { environment } from '../environments/environment';

import { from, throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private messaging;
  private _state: BehaviorSubject<string>;

  public get state() {
    return this._state.asObservable();
  }

  constructor() {
    const app = firebase.initializeApp(environment.firebaseConfig);
    this.messaging = app.messaging();

    this._state = new BehaviorSubject( Notification.permission );
  }

  public isDefault(permission: string): boolean {
    return permission === 'default';
  }

  public isDenied(permission: string): boolean {
    return permission === 'denied';
  }

  public isGranted(permission: string): boolean {
    return permission === 'granted';
  }

  public async enabledNotification() {
    let permission = await this.askForPermissionToReceiveNotifications();

    if (this.isGranted(permission)) {
      this.getToken().subscribe( (token) => {
        console.log(token);
        this.listenNotification();
      });
    }
  }

  private askForPermissionToReceiveNotifications() {
    return Notification.requestPermission()
      .then( permission => {
        console.log(`Notification Permission: ${permission}`);
        this._state.next(permission);
        return Promise.resolve(permission);
      });
  }

  private getToken(): Observable<string> {
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);

    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);

    const tokenPromise = this.messaging.getToken()
      .then((currentToken) => {
        return new Promise((resolve, reject) => {
          if (currentToken) {
            resolve(currentToken);
          } else {
            reject(
              new Error('No Instance ID token available. Request permission to generate one.')
            );
          }
      });
    });

    return from<string>(tokenPromise)
      .pipe(
        catchError( err => {
          console.log('An error occurred while retrieving token. ');
          return throwError(err);
        })
      );
  }

  private listenNotification() {
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker.
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });

  }

}
