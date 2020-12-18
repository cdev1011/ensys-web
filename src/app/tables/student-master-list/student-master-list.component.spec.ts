import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMasterListComponent } from './student-master-list.component';

describe('StudentMasterListComponent', () => {
  let component: StudentMasterListComponent;
  let fixture: ComponentFixture<StudentMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
