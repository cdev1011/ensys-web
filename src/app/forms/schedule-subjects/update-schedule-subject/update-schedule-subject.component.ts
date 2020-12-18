import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatStepper } from '@angular/material';
import { CreateNewScheduleComponent } from 'src/app/pages/create-new-schedule/create-new-schedule.component';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectFacultyComponent } from 'src/app/dialogs/select-faculty/select-faculty.component';
import { SelectRoomComponent } from 'src/app/dialogs/select-room/select-room.component';
import { SelectSubjectViewComponent } from '../select-subject-view/select-subject-view.component';

@Component({
  selector: 'app-update-schedule-subject',
  templateUrl: './update-schedule-subject.component.html',
  styleUrls: ['./update-schedule-subject.component.css']
})
export class UpdateScheduleSubjectComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<CreateNewScheduleComponent>, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    private _requestService: requestService, public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  secondFormGroup: FormGroup;

  //Data to pass to API
  selectedSubject: number;
  selectedRoom: number;
  selectedFaculty: number;
  scheduleId: number;
  schedSubId: number;
  currSubId: number;
  currId: number;

  //For display
  selectedRoomDesc: string;
  selectedFacultyName: string;
  selectedSubjectDesc: string;
  selectedDays: string;

  ngOnInit() {

    this.secondFormGroup = this._formBuilder.group({
      start: '',
      end: '',
      days: '',
    });

    this.route.queryParams.subscribe(params => {

      this.currId =this.data.curr_id;
      this.data = this.data.schedule_info;
      //Raw Data
      this.scheduleId = this.data.schedule_id;
      this.schedSubId = this.data.sched_sub_id;
      this.selectedFaculty = this.data.faculty_id;
      this.selectedRoom = this.data.room_id;
      this.selectedDays = this.data.days;
      this.currSubId = this.data.curr_sub_id;
      //Display Purposes
      this.selectedSubjectDesc = this.data.descriptive_title;
      this.selectedRoomDesc = this.data.room_desc;
      this.selectedFacultyName = this.data.faculty_fname + " " + this.data.faculty_mname + " " + this.data.faculty_lname

      this.secondFormGroup.controls['start'].setValue(this.data.start_time);
      this.secondFormGroup.controls['end'].setValue(this.data.end_time);
      var tempArray = [];
      var selectedDaysArray = this.selectedDays.split(',');

      for (var i = 0; i < selectedDaysArray.length; i++) {
        if (selectedDaysArray[i] == "M") {
          tempArray.push('M', 'Monday');
        }
        else if (selectedDaysArray[i] == "T") {
          tempArray.push('T', 'Tuesday');
        }
        else if (selectedDaysArray[i] == "W") {
          tempArray.push('W', 'Wednesday');
        }
        else if (selectedDaysArray[i] == "TH") {
          tempArray.push('T', 'Thursday');
        }
        else if (selectedDaysArray[i] == "F") {
          tempArray.push('F', 'Friday');
        }
        else if (selectedDaysArray[i] == "SA") {
          tempArray.push('SA', 'Saturday');
        }
        else if (selectedDaysArray[i] == "SUN") {
          tempArray.push('SUN', 'Sunday');
        }
      }

      this.secondFormGroup.controls['days'].setValue(selectedDaysArray);
    });
  }

  selectSubject() {
    this.dialog.open(SelectSubjectViewComponent, {
      data: {
        "curr_id": this.currId
      }
    }).afterClosed().subscribe(result => {
      this.currSubId = result;
    });
  }

  objectKeys(obj) {
    return Object.keys(obj);
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
      "sched_sub_id": this.schedSubId,
      "schedule_id": this.scheduleId,
      "curr_sub_id": this.currSubId,
      "faculty_id": this.selectedFaculty,
      "room_id": this.selectedRoom,
      "start_time": this.secondFormGroup.get('start').value,
      "end_time": this.secondFormGroup.get('end').value,
      "days": this.secondFormGroup.get('days').value.join()
    }

    console.log(data);
    this._requestService.updateScheduleSubject(data)
      .subscribe
      (
        result => {
          this.matDialogRef.close();
        }
      )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
