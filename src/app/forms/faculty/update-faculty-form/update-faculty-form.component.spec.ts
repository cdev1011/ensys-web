import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFacultyFormComponent } from './update-faculty-form.component';

describe('UpdateFacultyFormComponent', () => {
  let component: UpdateFacultyFormComponent;
  let fixture: ComponentFixture<UpdateFacultyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFacultyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFacultyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
