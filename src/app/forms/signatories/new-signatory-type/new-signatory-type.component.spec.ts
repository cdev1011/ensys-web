import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignatoryTypeComponent } from './new-signatory-type.component';

describe('NewSignatoryTypeComponent', () => {
  let component: NewSignatoryTypeComponent;
  let fixture: ComponentFixture<NewSignatoryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSignatoryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSignatoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
