import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeeTypesComponent } from './new-fee-types.component';

describe('NewFeeTypesComponent', () => {
  let component: NewFeeTypesComponent;
  let fixture: ComponentFixture<NewFeeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
