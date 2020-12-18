import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnrollmentFeesComponent } from './select-enrollment-fees.component';

describe('SelectEnrollmentFeesComponent', () => {
  let component: SelectEnrollmentFeesComponent;
  let fixture: ComponentFixture<SelectEnrollmentFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEnrollmentFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEnrollmentFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
