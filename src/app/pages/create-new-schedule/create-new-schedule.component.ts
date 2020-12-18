import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';
import { AddCurriculumSubjectComponent } from '../../forms/curriculums/add-curriculum-subject/add-curriculum-subject.component';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SelectFacultyComponent } from 'src/app/dialogs/select-faculty/select-faculty.component';
import { SelectRoomComponent } from 'src/app/dialogs/select-room/select-room.component';

@Component({
  selector: 'app-create-new-schedule',
  templateUrl: './create-new-schedule.component.html',
  styleUrls: ['./create-new-schedule.component.css']
})
export class CreateNewScheduleComponent implements OnInit {



  constructor(public matDialogRef: MatDialogRef<CreateNewScheduleComponent>, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    private _requestService: requestService, public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private snackBar: MatSnackBar) { }


  curr_id: any;
  year: string;
  college: string;
  major: string;
  course: string;
  curriculumData: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //Data to pass to API
  selectedSubject: number;
  selectedRoom: number;
  selectedFaculty: number;
  scheduleId: number;

  //For display
  selectedRoomDesc: string;
  selectedFacultyName: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(this.data);
      this.curr_id = this.data.curriculum_id;
      this.scheduleId = this.data.schedule_id;
      this.fetchCurriculum();
    });

    this.firstFormGroup = this._formBuilder.group({
    });

    this.secondFormGroup = this._formBuilder.group({
      start: '',
      end: '',
      days: ''
    });
  }

  selectSubject(id, stepper: MatStepper) {
    this.selectedSubject = id;
    stepper.next();
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fetchCurriculum() {
    this._requestService.getCurriculumView(this.curr_id)
      .subscribe
      (
        data => {
          this.year = data.curriculum_info.curriculum_year;
          this.college = data.course_info.course_title;
          this.course = data.course_info.course_desc;
          this.curriculumData = data.list;
          console.log(data);
        }
      )
  }

  getYear() {
    return this.year;
  }

  getCollege() {
    return this.college;
  }

  getCourse() {
    return this.course;
  }

  getMajor() {
    if (this.major != null) return "Major in " + this.major;
    else return null;

  }

  selectFaculty() {
    this.dialog.open(SelectFacultyComponent).afterClosed().subscribe(result => {
      this.selectedFaculty = result.faculty_id;
      this.selectedFacultyName = result.faculty_fullname;
    });
  }

  selectRoom() {
    this.dialog.open(SelectRoomComponent).afterClosed().subscribe(result => {
      this.selectedRoom = result.room_id;
      this.selectedRoomDesc = result.room_desc;
    });
  }

  public submitData() {

    var data = {
      "schedule_id": this.scheduleId,
      "curr_sub_id": this.selectedSubject,
      "faculty_id": this.selectedFaculty,
      "room_id": this.selectedRoom,
      "start_time": this.secondFormGroup.get('start').value,
      "end_time": this.secondFormGroup.get('end').value,
      "days": this.secondFormGroup.get('days').value.join()
    }

    this._requestService.newScheduleSubject(data)
      .subscribe
      (
        result => {
          this.matDialogRef.close();
          console.log("You submitted " + result);
          this.openSnackBar("New Schedule Added");
          this.ngOnInit();
        }
      )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
