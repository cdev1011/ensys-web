import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSheetReportComponent } from './grade-sheet-report.component';

describe('GradeSheetReportComponent', () => {
  let component: GradeSheetReportComponent;
  let fixture: ComponentFixture<GradeSheetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeSheetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
