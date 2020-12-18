import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatoryTypesComponent } from './signatory-types.component';

describe('SignatoryTypesComponent', () => {
  let component: SignatoryTypesComponent;
  let fixture: ComponentFixture<SignatoryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatoryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatoryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
