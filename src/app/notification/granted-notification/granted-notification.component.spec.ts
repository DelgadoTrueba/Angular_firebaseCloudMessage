import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantedNotificationComponent } from './granted-notification.component';

describe('GrantedNotificationComponent', () => {
  let component: GrantedNotificationComponent;
  let fixture: ComponentFixture<GrantedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantedNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
