import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleSubjectComponent } from './update-schedule-subject.component';

describe('UpdateScheduleSubjectComponent', () => {
  let component: UpdateScheduleSubjectComponent;
  let fixture: ComponentFixture<UpdateScheduleSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScheduleSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
