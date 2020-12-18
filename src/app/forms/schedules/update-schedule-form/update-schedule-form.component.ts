import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm, FormBuilder } from '@angular/forms';
import { UpdateRoomFormComponent } from '../../rooms/update-room-form/update-room-form.component';


@Component({
  selector: 'app-update-schedule-form',
  templateUrl: './update-schedule-form.component.html',
  styleUrls: ['./update-schedule-form.component.css']
})
export class UpdateScheduleFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm
  
  curriculums = [];
  school_years = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateScheduleFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchCurriculums();
    this.fetchSchoolyears();
  }

  
  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['sy_id'].setValue(this.data.element.sy_id);
      this.form.controls['curriculum_id'].setValue(this.data.element.curriculumn_id);
    })
  }


  updateSchedule(form : NgForm) {

    var data = 
    {
        "schedule_id": this.data.element.schedule_id,
        "sy_id": form.value.sy_id,
        "curriculum_id": form.value.curriculum_id
    };

    console.log(form.value);
    this._requestService.updateSchedule(data)
    .subscribe
    (
      success => {
        console.log(success);
        this.dialogRef.close();
      }
    )
  }

  fetchCurriculums(){
    this._requestService.getCurriculums()
    .subscribe
    (
      data => {
       this.curriculums = data.data;
      }
    )
  }

  fetchSchoolyears(){
    this._requestService.getSchoolYears()
    .subscribe
    (
      data => {
       this.school_years = data.data;
       console.log(data.data);
      }
    )
  }

  fetchSchoolYears(){
    this._requestService.getSy()
    .subscribe
    (
      data => {
       this.school_years = data.data;
      }
    )
  }

}
