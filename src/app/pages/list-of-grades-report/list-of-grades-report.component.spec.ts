import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGradesReportComponent } from './list-of-grades-report.component';

describe('ListOfGradesReportComponent', () => {
  let component: ListOfGradesReportComponent;
  let fixture: ComponentFixture<ListOfGradesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfGradesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfGradesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
