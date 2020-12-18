import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateOfEnrollmentReportComponent } from './certificate-of-enrollment-report.component';

describe('CertificateOfEnrollmentReportComponent', () => {
  let component: CertificateOfEnrollmentReportComponent;
  let fixture: ComponentFixture<CertificateOfEnrollmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateOfEnrollmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateOfEnrollmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
