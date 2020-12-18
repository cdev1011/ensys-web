import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentGradesComponent } from './edit-student-grades.component';

describe('EditStudentGradesComponent', () => {
  let component: EditStudentGradesComponent;
  let fixture: ComponentFixture<EditStudentGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
