import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUacFormComponent } from './add-uac-form.component';

describe('AddUacFormComponent', () => {
  let component: AddUacFormComponent;
  let fixture: ComponentFixture<AddUacFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUacFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUacFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
