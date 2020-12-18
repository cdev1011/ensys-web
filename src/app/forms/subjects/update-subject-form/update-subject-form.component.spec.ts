import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubjectFormComponent } from './update-subject-form.component';

describe('UpdateSubjectFormComponent', () => {
  let component: UpdateSubjectFormComponent;
  let fixture: ComponentFixture<UpdateSubjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSubjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
