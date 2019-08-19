import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { map, filter } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  permission$;

  constructor(
    private Notification: NotificationService
    ) { }

  ngOnInit() {
    this.permission$ = this.Notification.permission;
  }

  defaultNotification() {
    return this.Notification.PERMISSION_DEFAULT;
  }

  notSupportedNotification() {
    return this.Notification.NOT_SUPPORTED;
  }

  grantedNotification() {
    return this.Notification.PERMISSION_GRANTED;
  }

  deniedNotification() {
    return this.Notification.PERMISSION_DENIED;
  }

}
