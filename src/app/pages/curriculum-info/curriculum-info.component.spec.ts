import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumInfoComponent } from './curriculum-info.component';

describe('CurriculumInfoComponent', () => {
  let component: CurriculumInfoComponent;
  let fixture: ComponentFixture<CurriculumInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
