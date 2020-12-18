import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeCategoriesComponent } from './manage-fee-categories.component';

describe('ManageFeeCategoriesComponent', () => {
  let component: ManageFeeCategoriesComponent;
  let fixture: ComponentFixture<ManageFeeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
