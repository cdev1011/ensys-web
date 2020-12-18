import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-of-grades',
  templateUrl: './list-of-grades.component.html',
  styleUrls: ['./list-of-grades.component.css']
})
export class ListOfGradesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
    private router: Router, private _requestService: requestService, private httpClient: HttpClient, public datepipe: DatePipe) { }

  GradeList: any;
  courses = [];
  semesters = [];
  schoolYears = [];
  FilterForm: FormGroup;

  ngOnInit() {

    this.FilterForm = this.formBuilder.group({
      EnrollmentCourse: "",
      SchoolYear: "",
      EnrollmentSemester: "",
    });

    this.fetchCourses();
    this.FetchSemesters();
    this.FetchSchoolYears();
  }



  fetchCourses() {
    this._requestService.getCourses()
      .subscribe
      (
        data => {
          this.courses = data.data;
        }
      )
  }

  FetchSchoolYears() {
    this._requestService.getSchoolYears()
      .subscribe
      (
        data => {
          this.schoolYears = data.data;
        }
      )
  }

  FetchSemesters() {
    this._requestService.getSemesters()
      .subscribe
      (
        data => {
          console.log(data);
          this.semesters = data.data;
        }
      )
  }


  showList() {
    var course = this.FilterForm.get('EnrollmentCourse').value;
    var semester = this.FilterForm.get('EnrollmentSemester').value;
    var SchoolYear = this.FilterForm.get('SchoolYear').value;

    this.router.navigate(['/list-of-grades-report'], { queryParams: { course_id: course.course_id,semester_id: semester.semester_id,
       school_year: SchoolYear.sy_id,course_full_desc: course.full_course_desc, semester: semester.semester_desc, school_year_desc: SchoolYear.sy_full_desc,course_code: course.course_code } });

    return;
  }

}
