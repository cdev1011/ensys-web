import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubjectViewComponent } from './select-subject-view.component';

describe('SelectSubjectViewComponent', () => {
  let component: SelectSubjectViewComponent;
  let fixture: ComponentFixture<SelectSubjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
