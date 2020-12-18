import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleFormComponent } from './update-schedule-form.component';

describe('UpdateScheduleFormComponent', () => {
  let component: UpdateScheduleFormComponent;
  let fixture: ComponentFixture<UpdateScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScheduleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
