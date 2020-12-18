import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLevelFormComponent } from './update-level-form.component';

describe('UpdateLevelFormComponent', () => {
  let component: UpdateLevelFormComponent;
  let fixture: ComponentFixture<UpdateLevelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
