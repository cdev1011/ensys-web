import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchoolYearComponent } from './update-school-year.component';

describe('UpdateSchoolYearComponent', () => {
  let component: UpdateSchoolYearComponent;
  let fixture: ComponentFixture<UpdateSchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
