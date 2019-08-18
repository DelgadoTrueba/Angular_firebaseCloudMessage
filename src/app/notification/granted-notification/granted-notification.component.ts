import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessagingService } from 'src/app/messaging.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'granted-notification',
  templateUrl: './granted-notification.component.html',
  styleUrls: ['./granted-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrantedNotificationComponent implements OnInit {

 @Input() notifiable;

  constructor(
    private pushNotification: MessagingService,
    private Notification: NotificationService
  ) { }

  ngOnInit() {
    if (this.notifiable) {
      this.pushNotification.enabledNotification().subscribe();
    } else {
      this.pushNotification.disabledNotification().subscribe();
    }
  }

  toggleNotification() {
      if (this.notifiable) {
        this.disabledNotification();
      } else {
        this.enabledNotification();
      }
  }

  enabledNotification() {
    this.Notification.setNotificationPermission(true);
  }

  disabledNotification() {
    this.Notification.setNotificationPermission(false);
  }

}
