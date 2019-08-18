import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/messaging.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'granted-notification',
  templateUrl: './granted-notification.component.html',
  styleUrls: ['./granted-notification.component.scss']
})
export class GrantedNotificationComponent implements OnInit {

  permission;

  constructor(
    private pushNotification: MessagingService,
    private Notification: NotificationService
  ) { }

  ngOnInit() {
    this.Notification.permission.subscribe( permission => {
      this.permission = permission;
      if (permission.notifiable) {
        this.pushNotification.enabledNotification().subscribe();
      } else {
        this.pushNotification.disabledNotification().subscribe();
      }
    });
  }

  toggleNotification() {
    if(this.permission.notificationGranted) {
      if (this.permission.notifiable) {
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
