import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolYearComponent } from './add-school-year.component';

describe('AddSchoolYearComponent', () => {
  let component: AddSchoolYearComponent;
  let fixture: ComponentFixture<AddSchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
