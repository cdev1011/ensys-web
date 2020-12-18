import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentSetupComponent } from './assesment-setup.component';

describe('AssesmentSetupComponent', () => {
  let component: AssesmentSetupComponent;
  let fixture: ComponentFixture<AssesmentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
