import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignatoryComponent } from './new-signatory.component';

describe('NewSignatoryComponent', () => {
  let component: NewSignatoryComponent;
  let fixture: ComponentFixture<NewSignatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSignatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSignatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
