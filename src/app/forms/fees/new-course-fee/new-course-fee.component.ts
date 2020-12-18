import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-course-fee',
  templateUrl: './new-course-fee.component.html',
  styleUrls: ['./new-course-fee.component.css']
})
export class NewCourseFeeComponent implements OnInit {

 
  courses = [];
  school_years = [];
  types = [];
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<NewCourseFeeComponent>) {}

  ngOnInit() {
    this.fetchCourses();
    this.fetchFeeTypes();
    this.fetchSchoolYears();
  }

  newType(form : NgForm) {
    this._requestService.AddCourseFees(form.value)
    .subscribe
    (
      success => {
        console.log(success);
        this.dialogRef.close();
      }
    )
  }

  fetchCourses(){
    this._requestService.getCourses()
    .subscribe
    (
      data => {
       this.courses = data.data;
      }
    )
  }

  fetchFeeTypes(){
    this._requestService.getFeeTypes()
    .subscribe
    (
      data => {
       this.types = data.data;
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
