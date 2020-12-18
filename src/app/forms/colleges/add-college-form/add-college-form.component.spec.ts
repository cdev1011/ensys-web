import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeFormComponent } from './add-college-form.component';

describe('AddCollegeFormComponent', () => {
  let component: AddCollegeFormComponent;
  let fixture: ComponentFixture<AddCollegeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
