import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintScheduleReportComponent } from './print-schedule-report.component';

describe('PrintScheduleReportComponent', () => {
  let component: PrintScheduleReportComponent;
  let fixture: ComponentFixture<PrintScheduleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintScheduleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintScheduleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
