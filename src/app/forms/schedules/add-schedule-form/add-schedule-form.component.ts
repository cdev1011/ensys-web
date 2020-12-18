import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-schedule-form',
  templateUrl: './add-schedule-form.component.html',
  styleUrls: ['./add-schedule-form.component.css']
})
export class AddScheduleFormComponent implements OnInit {

  
  schoolYears = [];
  curriculums = [];

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddScheduleFormComponent>) {}

  ngOnInit() {
    this.fetchData();
  }

  addSchedule(form : NgForm) {
    console.log(form.value);
    this._requestService.newSchedule(form.value)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
  }

  fetchData(){
    this._requestService.getSchoolYears()
    .subscribe
    (
      data => {
       this.schoolYears = data.data;
      }
    )

    this._requestService.getCurriculums()
    .subscribe
    (
      data => {
       this.curriculums = data.data;
      }
    )
  }

}
