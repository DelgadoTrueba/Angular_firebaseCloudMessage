import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  ui;


  constructor(private notification: MessagingService) {

  }

  ngOnInit() {

    this.notification.state.subscribe(permission => {
      if (this.notification.isNotSupported(permission)) {
        this.ui = {
            notificationNotSupported: true,
            notificationDefault: false,
            notificationDenied: false,
            notificationGranted: false
          };
      }
      if (this.notification.isDefault(permission)) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: true,
            notificationDenied: false,
            notificationGranted: false
          };
      }
      if (this.notification.isGranted(permission)) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: false,
            notificationDenied: false,
            notificationGranted: true
          };
      }
      if (this.notification.isDenied(permission)) {
        this.ui = {
            notificationNotSupported: false,
            notificationDefault: false,
            notificationDenied: true,
            notificationGranted: false
          };
      }
    });
  }

  enabledNotification() {
    this.notification.enabledNotification();
  }

}
