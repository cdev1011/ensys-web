import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeeTypesComponent } from './update-fee-types.component';

describe('UpdateFeeTypesComponent', () => {
  let component: UpdateFeeTypesComponent;
  let fixture: ComponentFixture<UpdateFeeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
