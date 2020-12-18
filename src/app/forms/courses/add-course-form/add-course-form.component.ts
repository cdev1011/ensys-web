import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})
export class AddCourseFormComponent implements OnInit {

  majors = [];
  departments = [];
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddCourseFormComponent>) {}

  ngOnInit() {
    this.fetchMajors();
    this.fetchDepartments();
  }

  fetchDepartments(){
    this._requestService.getDepartments()
    .subscribe
    (
      data => {
       this.departments = data.data;
      }
    )
  }

  newCourse(form : NgForm) {
    console.log(form.value);
    this._requestService.newCourse(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Course");
        this.dialogRef.close();
      }
    )
  }

  fetchMajors(){
    this._requestService.getMajors()
    .subscribe
    (
      data => {
       this.majors = data.data;
      }
    )
  }

}
