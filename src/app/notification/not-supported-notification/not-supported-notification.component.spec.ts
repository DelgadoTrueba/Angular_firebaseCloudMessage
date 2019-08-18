import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedNotificationComponent } from './not-supported-notification.component';

describe('NotSupportedNotificationComponent', () => {
  let component: NotSupportedNotificationComponent;
  let fixture: ComponentFixture<NotSupportedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSupportedNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSupportedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
