import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateOfEnrollmentComponent } from './certificate-of-enrollment.component';

describe('CertificateOfEnrollmentComponent', () => {
  let component: CertificateOfEnrollmentComponent;
  let fixture: ComponentFixture<CertificateOfEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateOfEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateOfEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
