import { Injectable, ɵConsole } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { environment } from '../environments/environment';

import { from, throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private messaging;

  // getToken return null
  private token: string = null;

  constructor() {
    if (this.isSupported()) {

      const app = firebase.initializeApp(environment.firebaseConfig);
      this.messaging = app.messaging();

      this.messaging.onTokenRefresh(() => {
        this.enabledNotification().subscribe( tokenRefresh => console.log('tokenRefresh: ' + tokenRefresh));
      });
    }
  }

  public disabledNotification(): Observable<string> {

    let deleteTokenPromise;

    if (this.token !== null) {
      deleteTokenPromise = this.messaging.deleteToken(this.token)
        .then( isDeleted =>{
          console.log('deleteTokenPromise: ' + this.token);
          Promise.resolve(this.token);
        })
        .catch( err => Promise.reject(err) );
    } else {
      deleteTokenPromise = Promise.resolve(null);
    }

    return from<string>(deleteTokenPromise)
      .pipe(
        filter(token => token !== null),
        tap(deletedToken => {
          this.token = null;
          console.log('Delete token del server');
          console.log('Dejar de escuchar');
        })
      );
  }

  public enabledNotification(): Observable<string> {

    const getTokenPromise = this.messaging.getToken()
      .then((currentToken) => {
        return new Promise((resolve, reject) => {
          if (currentToken) {
            console.log('getTokenPromise: ' + currentToken);
            resolve(currentToken);
          } else {
            console.log('getTokenPromise: ' + currentToken);
            reject(
              new Error('No Instance ID token available. Request permission to generate one.')
            );
          }
      })
      .catch( err => Promise.reject(err) );
    });

    return from<string>(getTokenPromise)
      .pipe(
        tap(newToken => {
          if (this.token === null) {
            this.token = newToken;
            console.log('Enviar token a server');
            this.listenNotification();
          }
        })
      );
  }

  public listenNotification() {
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker.
    console.log('listenNotification');
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });

  }

  public isSupported() {
    return firebase.messaging.isSupported();
  }

}
