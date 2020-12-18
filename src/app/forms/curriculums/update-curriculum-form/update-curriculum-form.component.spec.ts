import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCurriculumFormComponent } from './update-curriculum-form.component';

describe('UpdateCurriculumFormComponent', () => {
  let component: UpdateCurriculumFormComponent;
  let fixture: ComponentFixture<UpdateCurriculumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCurriculumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCurriculumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
