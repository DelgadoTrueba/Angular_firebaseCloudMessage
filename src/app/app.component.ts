import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MessagingService } from './messaging.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notification: MessagingService) {

  }

  ngOnInit() {
    this.notification.enabledNotification();
  }

}
