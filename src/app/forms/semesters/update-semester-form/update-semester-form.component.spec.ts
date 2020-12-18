import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterFormComponent } from './update-semester-form.component';

describe('UpdateSemesterFormComponent', () => {
  let component: UpdateSemesterFormComponent;
  let fixture: ComponentFixture<UpdateSemesterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSemesterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSemesterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
