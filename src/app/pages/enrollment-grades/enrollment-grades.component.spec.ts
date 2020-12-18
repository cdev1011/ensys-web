import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentGradesComponent } from './enrollment-grades.component';

describe('EnrollmentGradesComponent', () => {
  let component: EnrollmentGradesComponent;
  let fixture: ComponentFixture<EnrollmentGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
