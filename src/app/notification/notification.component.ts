import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { map, filter } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  ui;
  notification: boolean;

  constructor(
    private pushNotification: MessagingService,
    private Notification: NotificationService
    ) { }

  ngOnInit() {

    this.Notification.permission.subscribe( notification => {
      console.log(notification);
      if (this.Notification.NOT_SUPPORTED === notification.permission) {
        this.ui = {
            notificationNotSupported: true,
            notificationDefault: false,
            notificationDenied: false,
            notificationGranted: false
          };
      }
      if (this.Notification.PERMISSION_DEFAULT === notification.permission) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: true,
            notificationDenied: false,
            notificationGranted: false
          };
      }
      if (this.Notification.PERMISSION_GRANTED === notification.permission) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: false,
            notificationDenied: false,
            notificationGranted: true
          };
        if (notification.notifiable) {
          this.notification = true;
          this.pushNotification.enabledNotification().subscribe();
        } else {
          this.notification = false;
          this.pushNotification.disabledNotification().subscribe();
        }
      }
      if (this.Notification.PERMISSION_DENIED === notification.permission) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: false,
            notificationDenied: true,
            notificationGranted: false
          };
      }
    });
  }

  toggleNotification() {
    if(this.ui.notificationGranted) {
      if (this.notification) {
        this.disabledNotification();
      } else {
        this.enabledNotification();
      }
    }
  }

  enabledNotification() {
    this.Notification.setNotificationPermission(true);
  }

  disabledNotification() {
    this.Notification.setNotificationPermission(false);
  }

}
