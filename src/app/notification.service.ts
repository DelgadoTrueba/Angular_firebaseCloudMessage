import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface Permission {
  permission: string;
  notifiable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public readonly PERMISSION_DEFAULT: string = 'default';
  public readonly PERMISSION_GRANTED: string = 'granted';
  public readonly PERMISSION_DENIED: string = 'denied';
  public readonly NOT_SUPPORTED: string = 'not-supported';

  private _permission: BehaviorSubject<Permission>;

  public get permission() {
    return this._permission.asObservable();
  }

  constructor() {
    this._permission = new BehaviorSubject(null);
    this.initialize();
  }

  private initialize() {
    if (!('Notification' in window)) {
      this._permission.next({permission: 'not-supported'});
    } else {
      if (Notification.permission === this.PERMISSION_GRANTED) {
        this._permission.next(
          JSON.parse(localStorage.getItem('notification-permissions'))
        );
      } else {
        this._permission.next({permission: Notification.permission});
      }
    }
  }

  public setNotificationPermission(isAllowed: boolean) {
      let object;

      if (Notification.permission === this.PERMISSION_GRANTED) {
        object = {permission: 'granted', notifiable: isAllowed};
        localStorage.setItem('notification-permissions', JSON.stringify(object));
        this._permission.next(object);
      }

      else if (Notification.permission === this.PERMISSION_DENIED) {
        object = {permission: 'denied'};
        localStorage.setItem('notification-permissions', JSON.stringify(object));
        this._permission.next(object);
      }

      else if (Notification.permission === this.PERMISSION_DEFAULT) {
          Notification.requestPermission( choice => {
              if (choice === this.PERMISSION_GRANTED) {
                object = {permission: 'granted', notifiable: true};
                localStorage.setItem('notification-permissions', JSON.stringify(object));
                this._permission.next(object);
              } else {
                object = {permission: 'denied'};
                localStorage.setItem('notification-permissions', JSON.stringify(object));
                this._permission.next(object);
              }
          });
      }
  }

}
