import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseFeeComponent } from './update-course-fee.component';

describe('UpdateCourseFeeComponent', () => {
  let component: UpdateCourseFeeComponent;
  let fixture: ComponentFixture<UpdateCourseFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCourseFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
