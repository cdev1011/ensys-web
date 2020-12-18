import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-semester-form',
  templateUrl: './add-semester-form.component.html',
  styleUrls: ['./add-semester-form.component.css']
})
export class AddSemesterFormComponent implements OnInit {

  SchoolYears = [];

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddSemesterFormComponent>) {}

  ngOnInit() {
    this.fetchSy();
  }

  newSemester(form : NgForm) {
    this._requestService.newSemester(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Semester");
        this.dialogRef.close();
      }
    )
  }

  fetchSy(){
    this._requestService.getSchoolYears()
    .subscribe
    (
      data => {
       this.SchoolYears = data.data;
      }
    )
  }

}
