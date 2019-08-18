import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'default-notification',
  templateUrl: './default-notification.component.html',
  styleUrls: ['./default-notification.component.scss']
})
export class DefaultNotificationComponent implements OnInit {

  constructor(
    private Notification: NotificationService
  ) { }

  ngOnInit() {
  }

  enabledNotification() {
    this.Notification.setNotificationPermission(true);
  }

}
