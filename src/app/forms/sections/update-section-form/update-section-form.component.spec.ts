import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionFormComponent } from './update-section-form.component';

describe('UpdateSectionFormComponent', () => {
  let component: UpdateSectionFormComponent;
  let fixture: ComponentFixture<UpdateSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
