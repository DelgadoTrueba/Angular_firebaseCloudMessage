import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedNotificationComponent } from './denied-notification.component';

describe('DeniedNotificationComponent', () => {
  let component: DeniedNotificationComponent;
  let fixture: ComponentFixture<DeniedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
