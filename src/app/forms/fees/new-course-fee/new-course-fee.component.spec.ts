import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseFeeComponent } from './new-course-fee.component';

describe('NewCourseFeeComponent', () => {
  let component: NewCourseFeeComponent;
  let fixture: ComponentFixture<NewCourseFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
