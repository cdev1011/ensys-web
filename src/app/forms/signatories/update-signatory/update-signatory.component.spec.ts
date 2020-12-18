import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSignatoryComponent } from './update-signatory.component';

describe('UpdateSignatoryComponent', () => {
  let component: UpdateSignatoryComponent;
  let fixture: ComponentFixture<UpdateSignatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSignatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSignatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
