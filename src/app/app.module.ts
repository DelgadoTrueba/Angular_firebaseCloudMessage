import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppMdModule } from './app-md.module';

import { AppComponent } from './app.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotificationComponent } from './notification/notification.component';
import { DefaultNotificationComponent } from './notification/default-notification/default-notification.component';
import { NotSupportedNotificationComponent } from './notification/not-supported-notification/not-supported-notification.component';
import { DeniedNotificationComponent } from './notification/denied-notification/denied-notification.component';
import { GrantedNotificationComponent } from './notification/granted-notification/granted-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    NotificationComponent,
    DefaultNotificationComponent,
    NotSupportedNotificationComponent,
    DeniedNotificationComponent,
    GrantedNotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    AppMdModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
