import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGradesComponent } from './list-of-grades.component';

describe('ListOfGradesComponent', () => {
  let component: ListOfGradesComponent;
  let fixture: ComponentFixture<ListOfGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
