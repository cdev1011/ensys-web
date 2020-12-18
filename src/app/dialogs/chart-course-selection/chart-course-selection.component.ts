import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chart-course-selection',
  templateUrl: './chart-course-selection.component.html',
  styleUrls: ['./chart-course-selection.component.css']
})
export class ChartCourseSelectionComponent implements OnInit {

 
  courses = [];
  selectedCourseId: any;
  selectedCourseDesc: any;

  constructor(private _requestService: requestService, @Inject(MAT_DIALOG_DATA) public data: any,public datepipe: DatePipe,
    public dialogRef: MatDialogRef<ChartCourseSelectionComponent>) {}

  ngOnInit() {
    this.fetchCourses();
  }

  courseSelected(){
    this.dialogRef.close({course_id:this.selectedCourseId,course_desc:this.selectedCourseDesc});
  }

  courseSelectionChanged(event) {
    console.log(event.value.course_id);
    console.log(event.value.full_course_desc);

    this.selectedCourseId = event.value.course_id;
    this.selectedCourseDesc = event.value.full_course_desc;
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

}
