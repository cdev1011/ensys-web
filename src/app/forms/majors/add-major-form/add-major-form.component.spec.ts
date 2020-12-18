import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMajorFormComponent } from './add-major-form.component';

describe('AddMajorFormComponent', () => {
  let component: AddMajorFormComponent;
  let fixture: ComponentFixture<AddMajorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMajorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMajorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
