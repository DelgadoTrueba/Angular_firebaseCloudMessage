import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationIsChecked;
  notificationSupported = true;

  constructor(private notification: MessagingService) {

  }

  ngOnInit() {

    this.notification.state.subscribe( permission => {

      if (this.notification.isNotSupported(permission)) {
        this.notificationSupported = false;
        return;
      }

      if (this.notification.isDefault(permission) || this.notification.isDenied(permission)) {
        this.notificationIsChecked = false;
      }

      if (this.notification.isGranted(permission)) {
        this.notificationIsChecked = true;
      }
    });

  }

}
