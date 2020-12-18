import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSheetComponent } from './grade-sheet.component';

describe('GradeSheetComponent', () => {
  let component: GradeSheetComponent;
  let fixture: ComponentFixture<GradeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
