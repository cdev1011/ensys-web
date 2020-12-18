import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurriculumFormComponent } from './add-curriculum-form.component';

describe('AddCurriculumFormComponent', () => {
  let component: AddCurriculumFormComponent;
  let fixture: ComponentFixture<AddCurriculumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCurriculumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurriculumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
