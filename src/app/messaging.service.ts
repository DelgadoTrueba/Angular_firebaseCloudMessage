import { Injectable, ɵConsole } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { environment } from '../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messaging;
  _currentMessage = new Subject();

  get currentMessage() {
    return this._currentMessage.asObservable();
  }

  constructor() {

    const app = firebase.initializeApp(environment.firebaseConfig);
    this.messaging = app.messaging();

    /*
    navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
    */
  }

  getPermission() {

    Notification.requestPermission()
      .then((permission) => {

        return new Promise((resolve, reject) => {
          if (permission === 'granted') {
            resolve(permission);
          } else {
            reject(permission);
          }
        });

      })
      .then( () => {
        console.log('Notification permission granted.');
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });

  }

  getToken() {

    this.messaging.getToken()
      .then((currentToken) => {
        if (currentToken) {
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
          console.log(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ');
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });

  }


  updateToken(token) {
    console.log('UpdateToken');
    /*
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
    */
  }

  receiveMessage(){
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this._currentMessage.next(payload);
    });
  }


}
