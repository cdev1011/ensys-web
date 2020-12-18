import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomFormComponent } from './update-room-form.component';

describe('UpdateRoomFormComponent', () => {
  let component: UpdateRoomFormComponent;
  let fixture: ComponentFixture<UpdateRoomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
