import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCourseSelectionComponent } from './chart-course-selection.component';

describe('ChartCourseSelectionComponent', () => {
  let component: ChartCourseSelectionComponent;
  let fixture: ComponentFixture<ChartCourseSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCourseSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCourseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
