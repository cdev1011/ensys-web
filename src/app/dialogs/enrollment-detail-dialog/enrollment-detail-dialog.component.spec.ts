import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDetailDialogComponent } from './enrollment-detail-dialog.component';

describe('EnrollmentDetailDialogComponent', () => {
  let component: EnrollmentDetailDialogComponent;
  let fixture: ComponentFixture<EnrollmentDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
