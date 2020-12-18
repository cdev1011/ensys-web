import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacultyFormComponent } from './add-faculty-form.component';

describe('AddFacultyFormComponent', () => {
  let component: AddFacultyFormComponent;
  let fixture: ComponentFixture<AddFacultyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFacultyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFacultyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
