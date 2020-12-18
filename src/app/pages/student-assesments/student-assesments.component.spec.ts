import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssesmentsComponent } from './student-assesments.component';

describe('StudentAssesmentsComponent', () => {
  let component: StudentAssesmentsComponent;
  let fixture: ComponentFixture<StudentAssesmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssesmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssesmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
