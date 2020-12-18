import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMajorFormComponent } from './update-major-form.component';

describe('UpdateMajorFormComponent', () => {
  let component: UpdateMajorFormComponent;
  let fixture: ComponentFixture<UpdateMajorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMajorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMajorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
