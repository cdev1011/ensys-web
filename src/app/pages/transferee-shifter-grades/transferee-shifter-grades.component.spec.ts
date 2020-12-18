import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereeShifterGradesComponent } from './transferee-shifter-grades.component';

describe('TransfereeShifterGradesComponent', () => {
  let component: TransfereeShifterGradesComponent;
  let fixture: ComponentFixture<TransfereeShifterGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfereeShifterGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfereeShifterGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
