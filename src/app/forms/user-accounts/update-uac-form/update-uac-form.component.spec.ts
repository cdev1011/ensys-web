import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUacFormComponent } from './update-uac-form.component';

describe('UpdateUacFormComponent', () => {
  let component: UpdateUacFormComponent;
  let fixture: ComponentFixture<UpdateUacFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUacFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUacFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
