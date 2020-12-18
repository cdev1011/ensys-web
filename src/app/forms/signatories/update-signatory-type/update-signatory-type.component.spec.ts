import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSignatoryTypeComponent } from './update-signatory-type.component';

describe('UpdateSignatoryTypeComponent', () => {
  let component: UpdateSignatoryTypeComponent;
  let fixture: ComponentFixture<UpdateSignatoryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSignatoryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSignatoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
