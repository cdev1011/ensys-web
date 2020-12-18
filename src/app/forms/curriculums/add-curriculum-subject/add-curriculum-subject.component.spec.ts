import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurriculumSubjectComponent } from './add-curriculum-subject.component';

describe('AddCurriculumSubjectComponent', () => {
  let component: AddCurriculumSubjectComponent;
  let fixture: ComponentFixture<AddCurriculumSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCurriculumSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurriculumSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
