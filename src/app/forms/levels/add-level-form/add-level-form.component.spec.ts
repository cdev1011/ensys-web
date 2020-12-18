import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelFormComponent } from './add-level-form.component';

describe('AddLevelFormComponent', () => {
  let component: AddLevelFormComponent;
  let fixture: ComponentFixture<AddLevelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
