import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeeCategoryComponent } from './new-fee-category.component';

describe('NewFeeCategoryComponent', () => {
  let component: NewFeeCategoryComponent;
  let fixture: ComponentFixture<NewFeeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
