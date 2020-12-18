import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeeCategoryComponent } from './update-fee-category.component';

describe('UpdateFeeCategoryComponent', () => {
  let component: UpdateFeeCategoryComponent;
  let fixture: ComponentFixture<UpdateFeeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
