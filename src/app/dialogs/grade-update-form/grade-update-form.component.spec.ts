import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeUpdateFormComponent } from './grade-update-form.component';

describe('GradeUpdateFormComponent', () => {
  let component: GradeUpdateFormComponent;
  let fixture: ComponentFixture<GradeUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
