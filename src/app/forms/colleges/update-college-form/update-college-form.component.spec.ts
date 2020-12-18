import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollegeFormComponent } from './update-college-form.component';

describe('UpdateCollegeFormComponent', () => {
  let component: UpdateCollegeFormComponent;
  let fixture: ComponentFixture<UpdateCollegeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCollegeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCollegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
