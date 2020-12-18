import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentBreakdownComponent } from './assesment-breakdown.component';

describe('AssesmentBreakdownComponent', () => {
  let component: AssesmentBreakdownComponent;
  let fixture: ComponentFixture<AssesmentBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
