import { Injectable, ɵConsole } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { environment } from '../environments/environment';

import { from, throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private messaging;
  private _state: BehaviorSubject<string>;

  // getToken return null
  private token: string = null;
  public token$: Subject<string>;

  public get state() {
    return this._state.asObservable();
  }

  constructor() {
    try {
      const app = firebase.initializeApp(environment.firebaseConfig);
      this.messaging = app.messaging();
      this._state = new BehaviorSubject(Notification.permission);
      this.token$ = new Subject();

      this.messaging.onTokenRefresh(() => {
        this.getToken().subscribe( tokenRefresh => {
          if (this.token !== null){
            //eliminar token
          }
          //añadir token;
          this.token = tokenRefresh;
        });
      });

    } catch (err) {
      this._state = new BehaviorSubject('not-supported');
    }
  }

  public async enabledNotification() {
    let permission = await this.askForPermissionToReceiveNotifications();

    if (this.isGranted(permission)) {
      this.getToken().subscribe( (tokenRefresh) => {
        if (this.token !== null){
          //eliminar token
        }
        //añadir token;
        this.token = tokenRefresh;
        this.token$.next(tokenRefresh);
        this.listenNotification();
      });
    }
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

  public isNotSupported(permission: string): boolean {
    return permission === 'not-supported';
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

    const tokenPromise = this.messaging.getToken()
      .then((currentToken) => {
        return new Promise((resolve, reject) => {
          if (currentToken) {
            console.log('TOKEN: ' + currentToken);
            resolve(currentToken);
          } else {
            console.log('TOKEN: ' + currentToken);
            reject(
              new Error('No Instance ID token available. Request permission to generate one.')
            );
          }
      });
    });

    return from<string>(tokenPromise)
      .pipe(
        catchError( err => {
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
