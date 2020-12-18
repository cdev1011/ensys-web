import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeTypesComponent } from './manage-fee-types.component';

describe('ManageFeeTypesComponent', () => {
  let component: ManageFeeTypesComponent;
  let fixture: ComponentFixture<ManageFeeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
