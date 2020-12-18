import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentsListComponent } from './assesments-list.component';

describe('AssesmentsListComponent', () => {
  let component: AssesmentsListComponent;
  let fixture: ComponentFixture<AssesmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
